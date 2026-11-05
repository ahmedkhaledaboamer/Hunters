import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { services } from './src/data/services'
import { industries } from './src/data/industries'
import { partners } from './src/data/directory'
import { news } from './src/data/news'
import { heroSlides } from './src/data/company'
import { arLabels } from './src/i18n/labelMap'
import { en } from './src/i18n/en'
import { ar } from './src/i18n/ar'
import { buttonClass } from './src/shared/ui/buttonClass'

const staticRoutes = [
  '/', '/about', '/history', '/services', '/solutions', '/industries', '/how-we-work',
  '/partners', '/locations', '/news', '/book-consultation', '/contact', '/careers', '/governance',
]

/** Emits sitemap.xml and robots.txt into the build output from the site's data. */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      if (!siteUrl) {
        // No fixed domain yet: a sitemap needs absolute URLs, so emit only robots.txt.
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: 'User-agent: *\nAllow: /\n' })
        return
      }
      const routes = [
        ...staticRoutes.map((path) => ({ path, lastmod: undefined as string | undefined })),
        ...services.map((s) => ({ path: `/services/${s.slug}`, lastmod: undefined })),
        ...industries.map((i) => ({ path: `/industries/${i.slug}`, lastmod: undefined })),
        ...partners.map((p) => ({ path: `/partners/${p.slug}`, lastmod: undefined })),
        ...news.map((a) => ({ path: `/news/${a.slug}`, lastmod: a.date })),
      ]
      const urls = routes
        .map(({ path, lastmod }) =>
          `  <url><loc>${siteUrl}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

/**
 * Inlines the small (~16 KB gzipped) stylesheet into index.html so the first paint doesn't wait on an extra
 * request. The site is a single-page app, so the HTML is fetched once and nothing is lost to caching.
 */
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = bundle['index.html']
      if (!html || html.type !== 'asset') return
      let source = String(html.source)
      for (const [file, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'asset' || !file.endsWith('.css')) continue
        const link = source.match(new RegExp(`<link rel="stylesheet"[^>]*href="/${file.replace(/\./g, '\\.')}"[^>]*>`))
        if (!link) continue
        source = source.replace(link[0], () => `<style>${String(chunk.source)}</style>`)
        delete bundle[file]
      }
      html.source = source
    },
  }
}

/**
 * Starts the app's scripts once the HTML has painted (static hero in its final fonts) instead of during parsing,
 * so the first meaningful paint doesn't wait on — or compete for bandwidth with — the JavaScript. Visitors see
 * the real hero (with working links) meanwhile; the app takes over a moment later.
 */
function bootAfterPaint(): Plugin {
  return {
    name: 'boot-after-paint',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = bundle['index.html']
      if (!html || html.type !== 'asset') return
      let source = String(html.source)
      const entry = source.match(/<script type="module" crossorigin src="([^"]+)"><\/script>\s*/)
      if (!entry) return
      const preloads = [...source.matchAll(/<link rel="modulepreload" crossorigin href="([^"]+)">\s*/g)]
      for (const tag of [entry[0], ...preloads.map((p) => p[0])]) source = source.replace(tag, '')
      // Point the font preload list (index.html) at the fingerprinted files, so the preload is reused and cached.
      source = source.replace(/\/fonts\/([\w-]+)\.woff2/g, (match, name: string) => {
        const asset = Object.keys(bundle).find((file) => new RegExp(`^assets/${name}-[\\w-]+\\.woff2$`).test(file))
        return asset ? `/${asset}` : match
      })
      const loader = `<script>
      (function () {
        function boot() {
          ${JSON.stringify(preloads.map((p) => p[1]))}.forEach(function (href) { var l = document.createElement('link'); l.rel = 'modulepreload'; l.crossOrigin = ''; l.href = href; document.head.appendChild(l); });
          var s = document.createElement('script'); s.type = 'module'; s.crossOrigin = ''; s.src = ${JSON.stringify(entry[1])}; document.head.appendChild(s);
        }
        // Wait until the static hero has painted in its final fonts (max 1.5 s), then start the app after the next frame.
        // Explicitly load the faces the static hero uses (document.fonts.ready alone can resolve before they are requested).
        var ar = document.documentElement.lang === 'ar';
        var faces = ar ? ['300 1em "IBM Plex Sans Arabic"', '400 1em "IBM Plex Sans Arabic"'] : ['200 1em Jost', '400 1em Jost'];
        var fontsReady = document.fonts && document.fonts.load ? Promise.all(faces.map(function (f) { return document.fonts.load(f, ar ? 'ع' : 'a'); })) : Promise.resolve();
        // Then wait for the browser to report that the static hero has actually painted (where it can report it),
        // so the app never replaces it before it is on screen.
        var heroPainted = new Promise(function (resolve) {
          var types = window.PerformanceObserver && PerformanceObserver.supportedEntryTypes;
          if (!types || types.indexOf('largest-contentful-paint') < 0) return resolve();
          var po = new PerformanceObserver(function (list) { if (list.getEntries().length) { po.disconnect(); resolve(); } });
          po.observe({ type: 'largest-contentful-paint', buffered: true });
        });
        Promise.race([Promise.all([fontsReady, heroPainted]), new Promise(function (r) { setTimeout(r, 1500); })]).then(function () {
          requestAnimationFrame(function () { setTimeout(boot, 0); });
        });
      })();
    </script>
  </body>`
      source = source.replace('</body>', () => loader)
      html.source = source
    },
  }
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Static copy of the first hero slide inside #root, built from the same data and classes as HeroSlider.
 * It paints with the HTML (before any JavaScript), and React replaces it on mount with an identical-looking
 * hero. Both languages are emitted; CSS in index.html shows the one matching <html lang>.
 */
function heroShell(): Plugin {
  const slide = heroSlides[0]
  const arrow = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 rtl:-scale-x-100"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>'
  const icon = (body: string, cls = 'size-[18px]') =>
    `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="${cls}">${body}</svg>`
  const chevron = icon('<path d="m6 9 6 6 6-6"/>', 'size-3.5')
  const ctrl = 'inline-flex size-10 items-center justify-center rounded-full border border-line text-fg'
  // Static twin of Header.tsx (same classes) so the first paint already shows the full top bar.
  const header = (lang: 'ar' | 'en') => {
    const t = lang === 'ar' ? ar : en
    const nav = (['services', 'solutions', 'industries', 'howWeWork', 'company', 'news', 'contact'] as const).map((key) => {
      const mega = ['services', 'solutions', 'industries', 'company'].includes(key)
      return `<li><span class="relative whitespace-nowrap rounded-full px-3.5 py-2 text-sm text-muted ${mega ? 'flex items-center gap-1' : 'block'}">${escapeHtml(t.nav[key])}${mega ? chevron : ''}</span></li>`
    }).join('')
    return `<header class="fixed inset-x-0 top-0 z-50"><div class="relative border-b border-transparent">
          <div class="mx-auto w-full px-5 sm:px-8 lg:px-12 max-w-[1680px] flex h-18 items-center gap-4">
            <a href="/" class="shrink-0 rounded-md"><span class="inline-flex items-center gap-3" dir="ltr">
              <svg viewBox="0 0 112 100" class="h-8 w-auto" aria-hidden="true"><g class="fill-lime-500 stroke-ink-950/70 stroke-[1.5] [paint-order:stroke] dark:stroke-0"><rect x="34" y="4" width="15" height="92" rx="7.5"/><rect x="76" y="6" width="15" height="86" rx="7.5"/><rect x="16" y="43" width="90" height="13" rx="3"/></g><circle cx="13" cy="49.5" r="10" class="fill-lime-500 stroke-ink-950/70 stroke-[1.5] [paint-order:stroke] dark:stroke-0"/></svg>
              <span class="flex flex-col leading-none"><span class="font-latin text-lg font-extralight tracking-[0.28em] text-fg">HUNTERS</span></span></span></a>
            <nav class="ms-6 hidden xl:block"><ul class="flex items-center gap-0.5">${nav}</ul></nav>
            <div class="ms-auto flex items-center gap-2">
              <span class="${ctrl}">${icon('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>')}</span>
              <span class="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-line px-3 text-sm font-medium text-fg ${lang === 'ar' ? 'font-latin tracking-wider' : 'font-arabic'}">${escapeHtml(t.prefs.switchLanguage)}</span>
              <span class="${ctrl} hidden sm:inline-flex"><span class="hidden dark:inline-flex">${icon('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>')}</span><span class="inline-flex dark:hidden">${icon('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>')}</span></span>
              <a href="/book-consultation" class="${buttonClass('primary', 'sm', 'hidden h-10 sm:inline-flex')}"><span>${escapeHtml(t.nav.book)}</span>${arrow}</a>
              <span class="${ctrl} xl:hidden">${icon('<path d="M4 6h16M4 12h16M4 18h16"/>', 'size-5')}</span>
            </div>
          </div></div></header>`
  }
  const render = (lang: 'ar' | 'en') => {
    const t = lang === 'ar' ? ar : en
    const eyebrow = lang === 'ar' ? arLabels[slide.eyebrow] ?? slide.eyebrow : slide.eyebrow
    return `<div class="hero-shell hero-shell-${lang}">${header(lang)}<section class="relative h-[100svh] min-h-[680px] overflow-hidden">
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-[1] bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_70%)]"></div>
        <div aria-hidden="true" class="pointer-events-none absolute -bottom-1/2 start-[10%] z-[1] size-[1000px] rounded-full glow-radial"></div>
        <div class="z-[2] mx-auto w-full px-5 sm:px-8 lg:px-12 max-w-[1680px] relative flex h-full flex-col justify-center-safe pb-44 pt-28">
          <p class="eyebrow flex items-center gap-3"><span dir="ltr" class="text-muted tabular-nums">01</span><span aria-hidden="true" class="h-0.5 w-6 rounded-full bg-lime-500"></span><span>${escapeHtml(eyebrow)}</span></p>
          <h1 class="text-balance mt-7 max-w-6xl text-display font-extralight tracking-[-0.035em] text-fg rtl:font-light rtl:leading-[1.2] rtl:tracking-normal">${escapeHtml(slide.title[lang])}</h1>
          <p class="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">${escapeHtml(slide.subtitle[lang])}</p>
          <div class="mt-10 flex flex-wrap gap-3">
            <a href="/book-consultation" class="${buttonClass('primary', 'lg')}"><span>${escapeHtml(t.nav.book)}</span>${arrow}</a>
            <a href="/solutions" class="${buttonClass('ghost', 'lg')}"><span>${escapeHtml(t.common.exploreSolutions)}</span></a>
          </div>
        </div>
      </section></div>`
  }
  return {
    name: 'hero-shell',
    // Build only: in dev, Vite injects CSS from JavaScript, so a static copy would flash unstyled on refresh.
    apply: 'build',
    transformIndexHtml: (html) => html.replace('<div id="root"></div>', () => `<div id="root">\n      ${render('ar')}\n      ${render('en')}\n    </div>`),
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Optional: set VITE_SITE_URL (e.g. on Vercel) once the domain is final; sitemap.xml needs absolute URLs.
  const siteUrl = (loadEnv(mode, process.cwd(), '').VITE_SITE_URL || '').replace(/\/$/, '')

  return {
    plugins: [react(), tailwindcss(), heroShell(), seoFiles(siteUrl), inlineCss(), bootAfterPaint()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            state: ['@reduxjs/toolkit', '@reduxjs/toolkit/query/react', 'react-redux'],
            forms: ['react-hook-form', 'zod', '@hookform/resolvers/zod'],
            motion: ['framer-motion'],
            i18n: ['i18next', 'react-i18next'],
          },
        },
      },
    },
  }
})

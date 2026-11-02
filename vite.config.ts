import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { services } from './src/data/services'
import { industries } from './src/data/industries'
import { partners } from './src/data/directory'
import { news } from './src/data/news'

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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, process.cwd(), '').VITE_SITE_URL || 'https://hhunters.ae').replace(/\/$/, '')

  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl)],
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

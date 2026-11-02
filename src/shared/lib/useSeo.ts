import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { i18n } from '../../i18n';

const SUFFIX = 'H HUNTERS Technology Solutions';
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://hhunters.ae').replace(/\/$/, '');
const DEFAULT_IMAGE = '/og-image.jpg';

interface SeoOptions {
  /** Absolute or root-relative image for social previews. */
  image?: string;
  type?: 'website' | 'article';
  /** Keep the page out of search results (404, transactional pages). */
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function setLink(rel: string, href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

const absolute = (path: string) => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path}`);

export function useSeo(title: string, description?: string, { image, type = 'website', noindex = false }: SeoOptions = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} · ${SUFFIX}` : SUFFIX;
    const desc = description ?? String(i18n.t('seo.homeDesc'));
    const url = `${SITE_URL}${pathname}`;
    const img = absolute(image ?? DEFAULT_IMAGE);
    const ar = i18n.language === 'ar';

    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setLink('canonical', url);

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:site_name', SUFFIX);
    setMeta('property', 'og:locale', ar ? 'ar_AE' : 'en_AE');
    setMeta('property', 'og:locale:alternate', ar ? 'en_AE' : 'ar_AE');

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', img);
  }, [title, description, image, type, noindex, pathname]);
}

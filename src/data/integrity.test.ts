import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { services } from './services';
import { industries } from './industries';
import { news } from './news';
import { headquarters, partners } from './directory';
import { en } from '../i18n/en';
import { ar } from '../i18n/ar';

const publicFile = (src: string) => resolve(__dirname, '../../public', src.replace(/^\//, ''));

/** Every leaf key path of a nested translation object. */
function keys(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
}

describe('content integrity', () => {
  const serviceSlugs = new Set(services.map((s) => s.slug));
  const industrySlugs = new Set(industries.map((i) => i.slug));

  it('has unique slugs', () => {
    expect(serviceSlugs.size).toBe(services.length);
    expect(industrySlugs.size).toBe(industries.length);
    expect(new Set(news.map((a) => a.slug)).size).toBe(news.length);
  });

  it('only cross-links to things that exist', () => {
    for (const s of services) {
      for (const i of s.industries) expect(industrySlugs, `${s.slug} → industry ${i}`).toContain(i);
      for (const r of s.related) expect(serviceSlugs, `${s.slug} → related ${r}`).toContain(r);
    }
    for (const i of industries) for (const s of i.services) expect(serviceSlugs, `${i.slug} → service ${s}`).toContain(s);
    for (const p of partners) for (const s of p.services) expect(serviceSlugs, `${p.slug} → service ${s}`).toContain(s);
  });

  it('references images that exist, each with its 640px variant', () => {
    const images = [...services, ...industries, ...news, headquarters].map((x) => x.image);
    for (const src of images) {
      expect(existsSync(publicFile(src)), src).toBe(true);
      if (src.endsWith('.webp')) expect(existsSync(publicFile(src.replace(/\.webp$/, '-640.webp'))), `${src} small`).toBe(true);
    }
  });

  it('has every bilingual field filled in both languages', () => {
    for (const item of [...services, ...industries, ...news]) {
      expect(item.title.ar.trim(), `${item.slug} ar title`).not.toBe('');
      expect(item.title.en.trim(), `${item.slug} en title`).not.toBe('');
    }
  });

  it('has the same translation keys in Arabic and English', () => {
    const enKeys = keys(en).sort();
    const arKeys = keys(ar).sort();
    expect(arKeys.filter((k) => !enKeys.includes(k)), 'only in ar').toEqual([]);
    expect(enKeys.filter((k) => !arKeys.includes(k)), 'only in en').toEqual([]);
  });
});

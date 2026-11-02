import { describe, expect, it } from 'vitest';
import { handleMock } from './mockServer';
import { services } from '../../data/services';
import { news } from '../../data/news';
import type { NewsArticle, Paged, TimeSlot } from '../../entities';

describe('handleMock', () => {
  it('lists and fetches services by slug', () => {
    expect(handleMock({ url: 'services' }).data).toEqual(services);
    expect(handleMock({ url: 'services/erp-enterprise' }).data).toMatchObject({ slug: 'erp-enterprise' });
  });

  it('returns 404 for unknown resources and slugs', () => {
    expect(handleMock({ url: 'services/nope' }).error).toEqual({ status: 404, message: 'Not found' });
    expect(handleMock({ url: 'nothing-here' }).error?.status).toBe(404);
  });

  it('serves the healthcare industry', () => {
    expect(handleMock({ url: 'industries/healthcare' }).data).toMatchObject({ slug: 'healthcare', icon: 'heart' });
  });

  it('pages, filters and searches news newest first', () => {
    const page = handleMock({ url: 'news', params: { pageSize: 2 } }).data as Paged<NewsArticle>;
    expect(page.items).toHaveLength(2);
    expect(page.total).toBe(news.length);
    expect(page.hasMore).toBe(news.length > 2);
    expect(page.items[0].date >= page.items[1].date).toBe(true);

    const first = news[0];
    const hit = handleMock({ url: 'news', params: { q: first.title.en.slice(0, 12) } }).data as Paged<NewsArticle>;
    expect(hit.items.some((a) => a.slug === first.slug)).toBe(true);

    const excluded = handleMock({ url: 'news', params: { exclude: first.slug, pageSize: 99 } }).data as Paged<NewsArticle>;
    expect(excluded.items.some((a) => a.slug === first.slug)).toBe(false);
  });

  it('generates stable half-hour slots between 09:00 and 16:30', () => {
    const slots = handleMock({ url: 'slots/2026-11-10' }).data as TimeSlot[];
    expect(slots[0].time).toBe('09:00');
    expect(slots.at(-1)?.time).toBe('16:30');
    expect(slots).toHaveLength(16);
    expect(handleMock({ url: 'slots/2026-11-10' }).data).toEqual(slots);
  });

  it('accepts form posts and issues booking references', () => {
    expect(handleMock({ url: 'contact', method: 'POST', body: {} }).data).toEqual({ ok: true });
    const { reference } = handleMock({ url: 'bookings', method: 'POST', body: {} }).data as {reference: string;};
    expect(reference).toMatch(/^HH-[A-Z0-9]+$/);
  });
});

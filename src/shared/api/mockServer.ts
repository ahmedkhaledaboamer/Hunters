import { customerAiItems, executiveItems, governancePractices, modelLayers, whyPillars } from '../../data/company';
import { consultants, headquarters, markets, milestones, partners, positions } from '../../data/directory';
import { engagementModels, phases, valuePropositions } from '../../data/framework';
import { industries } from '../../data/industries';
import { news } from '../../data/news';
import { services } from '../../data/services';
import type { NewsQuery, Paged, NewsArticle, TimeSlot } from '../../entities';

export interface MockRequest {
  url: string;
  method?: 'GET' | 'POST';
  body?: unknown;
  params?: object;
}

export interface ApiError {
  status: number;
  message: string;
}

export type MockResult = {data: unknown;error?: undefined;} | {error: ApiError;data?: undefined;};

const ok = (data: unknown): MockResult => ({ data });
const notFound = (): MockResult => ({ error: { status: 404, message: 'Not found' } });
const one = <T,>(item: T | undefined): MockResult => item ? ok(item) : notFound();

const pillars = { why: whyPillars, engagement: engagementModels, value: valuePropositions, layers: modelLayers };
const statements = { governance: governancePractices, executive: executiveItems, customerAi: customerAiItems };

function queryNews(params: NewsQuery = {}): Paged<NewsArticle> {
  const { category = 'all', q = '', page = 1, pageSize = 6, featured, exclude } = params;
  const needle = q.trim().toLowerCase();
  const filtered = [...news].
  filter((a) => category === 'all' ? true : a.category === category).
  filter((a) => featured ? a.featured : true).
  filter((a) => exclude ? a.slug !== exclude : true).
  filter((a) =>
  needle ?
  [a.title.ar, a.title.en, a.excerpt.ar, a.excerpt.en].some((s) => s.toLowerCase().includes(needle)) :
  true
  ).
  sort((a, b) => b.date.localeCompare(a.date));
  const items = filtered.slice(0, page * pageSize);
  return { items, total: filtered.length, page, pageSize, hasMore: items.length < filtered.length };
}

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) h = h * 31 + input.charCodeAt(i) | 0;
  return Math.abs(h);
}

function generateSlots(date: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let minutes = 9 * 60; minutes <= 16 * 60 + 30; minutes += 30) {
    const time = `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
    slots.push({ time, available: hash(`${date}-${time}`) % 3 !== 0 });
  }
  return slots;
}

function handlePost(resource: string): MockResult {
  if (resource === 'bookings') {
    const reference = `HH-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
    return ok({ reference });
  }
  if (['contact', 'newsletter', 'partner-applications', 'job-applications'].includes(resource)) return ok({ ok: true });
  return notFound();
}

/** Tiny in-memory router that mimics a REST API. Swap the base query for fetchBaseQuery to go live. */
export function handleMock(req: MockRequest): MockResult {
  const [resource, id] = req.url.split('/').filter(Boolean);
  if (req.method === 'POST') return handlePost(resource);

  switch (resource) {
    case 'services':
      return id ? one(services.find((s) => s.slug === id)) : ok(services);
    case 'industries':
      return id ? one(industries.find((s) => s.slug === id)) : ok(industries);
    case 'partners':
      return id ? one(partners.find((s) => s.slug === id)) : ok(partners);
    case 'news':
      return id ? one(news.find((s) => s.slug === id)) : ok(queryNews(req.params as NewsQuery));
    case 'milestones':
      return ok(milestones);
    case 'consultants':
      return ok(consultants);
    case 'positions':
      return ok(positions);
    case 'phases':
      return ok(phases);
    case 'location':
      return ok({ office: headquarters, markets });
    case 'pillars':
      return one(pillars[id as keyof typeof pillars]);
    case 'statements':
      return one(statements[id as keyof typeof statements]);
    case 'slots':
      return id ? ok(generateSlots(id)) : notFound();
    default:
      return notFound();
  }
}
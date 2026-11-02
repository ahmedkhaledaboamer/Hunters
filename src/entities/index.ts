import type { IconName } from '../shared/lib/icons';

export type Locale = 'ar' | 'en';
/** A bilingual string. */
export type L = Record<Locale, string>;

export type ServiceCategory = 'consulting' | 'ai' | 'engineering' | 'enterprise' | 'growth' | 'design';

export interface Service {
  slug: string;
  index: number;
  category: ServiceCategory;
  icon: IconName;
  image: string;
  title: L;
  short: L;
  summary: L;
  capabilities: L[];
  note?: L;
  industries: string[];
  related: string[];
}

export interface Industry {
  slug: string;
  icon: IconName;
  title: L;
  focus: L[];
  image: string;
  challenges: L[];
  services: string[];
}

export type NewsCategory = 'company' | 'ai' | 'partnerships' | 'events' | 'projects';

export interface NewsArticle {
  slug: string;
  category: NewsCategory;
  title: L;
  excerpt: L;
  body: L[];
  date: string;
  readMinutes: number;
  author: L;
  image: string;
  featured?: boolean;
}

export interface NewsQuery {
  category?: NewsCategory | 'all';
  q?: string;
  page?: number;
  pageSize?: number;
  featured?: boolean;
  exclude?: string;
}

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export type PartnerCategory = 'technology' | 'cloud' | 'ai' | 'channel';

export interface Partner {
  slug: string;
  name: string;
  monogram: string;
  category: PartnerCategory;
  type: L;
  description: L;
  about: L;
  capabilities: L[];
  services: string[];
}

export interface Milestone {
  id: string;
  year: string;
  title: L;
  description: L;
  placeholder: boolean;
  image?: string;
}

export interface Market {
  id: string;
  name: L;
  lon: number;
  lat: number;
}

export interface Location {
  id: string;
  city: L;
  country: L;
  address: L;
  hours: L;
  lon: number;
  lat: number;
  mapsUrl: string;
  image: string;
}

export interface Consultant {
  id: string;
  name: L;
  role: L;
  initials: string;
  specializations: string[];
  languages: Locale[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Pillar {
  id: string;
  icon: IconName;
  title: L;
  description: L;
}

export interface Phase {
  id: string;
  index: number;
  icon: IconName;
  name: string;
  title: L;
  description: L;
  outputs: L[];
}

export interface Position {
  id: string;
  title: L;
  department: 'engineering' | 'ai' | 'consulting' | 'design';
  type: L;
  location: L;
  summary: L;
  responsibilities: L[];
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: L;
  subtitle: L;
  scene: 'network' | 'flow' | 'mesh' | 'orbit';
}

export interface FaqItem {
  id: string;
  question: L;
  answer: L;
}

export interface BookingRequest {
  serviceSlug: string;
  consultantId: string;
  mode: 'online' | 'in-person';
  platform: 'teams' | 'zoom' | 'meet' | null;
  duration: 30 | 60;
  date: string;
  time: string;
  details: BookingDetails;
}

export interface BookingDetails {
  fullName: string;
  company: string;
  jobTitle: string;
  email: string;
  countryCode: string;
  phone: string;
  companySize: string;
  challenge: string;
  language: Locale;
}

export interface BookingConfirmation {
  reference: string;
}
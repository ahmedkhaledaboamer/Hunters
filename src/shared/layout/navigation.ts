import type { IconName } from '../lib/icons';

export type NavKey = 'services' | 'solutions' | 'industries' | 'howWeWork' | 'company' | 'news' | 'contact';

export interface NavItem {
  key: NavKey;
  to?: string;
  mega?: 'services' | 'company';
}

export const primaryNav: NavItem[] = [
{ key: 'services', to: '/services', mega: 'services' },
{ key: 'solutions', to: '/solutions' },
{ key: 'industries', to: '/industries' },
{ key: 'howWeWork', to: '/how-we-work' },
{ key: 'company', mega: 'company' },
{ key: 'news', to: '/news' },
{ key: 'contact', to: '/contact' }];


export interface CompanyLink {
  key: 'about' | 'history' | 'partners' | 'locations' | 'governance' | 'careers';
  to: string;
  icon: IconName;
}

export const companyLinks: CompanyLink[] = [
{ key: 'about', to: '/about', icon: 'building' },
{ key: 'history', to: '/history', icon: 'clock' },
{ key: 'partners', to: '/partners', icon: 'handshake' },
{ key: 'locations', to: '/locations', icon: 'globe' },
{ key: 'governance', to: '/governance', icon: 'shield' },
{ key: 'careers', to: '/careers', icon: 'users' }];
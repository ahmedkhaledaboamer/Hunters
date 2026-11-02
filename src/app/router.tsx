import { createBrowserRouter } from 'react-router-dom';
import { BootScreen, RootLayout } from '../shared/layout/RootLayout';
import { HomePage } from '../pages/home/HomePage';

export const router = createBrowserRouter([
{
  path: '/',
  element: <RootLayout />,
  HydrateFallback: BootScreen,
  children: [
  { index: true, Component: HomePage },
  { path: 'about', lazy: () => import('../pages/about/AboutPage').then((m) => ({ Component: m.AboutPage })) },
  { path: 'history', lazy: () => import('../pages/history/HistoryPage').then((m) => ({ Component: m.HistoryPage })) },
  { path: 'services', lazy: () => import('../pages/services/ServicesPage').then((m) => ({ Component: m.ServicesPage })) },
  { path: 'services/:slug', lazy: () => import('../pages/services/ServiceDetailPage').then((m) => ({ Component: m.ServiceDetailPage })) },
  { path: 'solutions', lazy: () => import('../pages/solutions/SolutionsPage').then((m) => ({ Component: m.SolutionsPage })) },
  { path: 'industries', lazy: () => import('../pages/industries/IndustriesPage').then((m) => ({ Component: m.IndustriesPage })) },
  { path: 'industries/:slug', lazy: () => import('../pages/industries/IndustryDetailPage').then((m) => ({ Component: m.IndustryDetailPage })) },
  { path: 'how-we-work', lazy: () => import('../pages/how-we-work/HowWeWorkPage').then((m) => ({ Component: m.HowWeWorkPage })) },
  { path: 'partners', lazy: () => import('../pages/partners/PartnersPage').then((m) => ({ Component: m.PartnersPage })) },
  { path: 'partners/:slug', lazy: () => import('../pages/partners/PartnerDetailPage').then((m) => ({ Component: m.PartnerDetailPage })) },
  { path: 'locations', lazy: () => import('../pages/locations/LocationsPage').then((m) => ({ Component: m.LocationsPage })) },
  { path: 'news', lazy: () => import('../pages/news/NewsPage').then((m) => ({ Component: m.NewsPage })) },
  { path: 'news/:slug', lazy: () => import('../pages/news/NewsDetailPage').then((m) => ({ Component: m.NewsDetailPage })) },
  { path: 'book-consultation', lazy: () => import('../pages/booking/BookConsultationPage').then((m) => ({ Component: m.BookConsultationPage })) },
  { path: 'contact', lazy: () => import('../pages/contact/ContactPage').then((m) => ({ Component: m.ContactPage })) },
  { path: 'careers', lazy: () => import('../pages/careers/CareersPage').then((m) => ({ Component: m.CareersPage })) },
  { path: 'governance', lazy: () => import('../pages/governance/GovernancePage').then((m) => ({ Component: m.GovernancePage })) },
  { path: '*', lazy: () => import('../pages/not-found/NotFoundPage').then((m) => ({ Component: m.NotFoundPage })) }]

}]
);
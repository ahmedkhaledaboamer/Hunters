import { forwardRef, useState, type ReactNode } from 'react';
import { ScrollRestoration, useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePreferencesSync } from '../../features/preferences/usePreferences';
import { EASE_OUT } from '../motion/variants';
import { Header } from './Header';
import { Footer } from './Footer';
import { CustomCursor } from './CustomCursor';
import { RouteProgress } from './RouteProgress';
import { FloatingCta } from './FloatingCta';
import { LogoMark } from '../ui/Logo';
import { BackToTop, ScrollProgress, SmoothScroll } from './SmoothScroll';
import { WhatsAppButton } from './WhatsAppButton';

/** Keeps the outgoing page's element stable while it animates out. */
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

const PageFrame = forwardRef<HTMLDivElement, {children: ReactNode;}>(function PageFrame({ children }, ref) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_OUT } }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.16, ease: EASE_OUT } }}
      className="w-full">
      
      {children}
    </motion.div>);

});

export function RootLayout() {
  usePreferencesSync();
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-lime-500 px-4 py-2 text-sm text-ink-950 focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
        
        {t('nav.skip')}
      </a>
      <SmoothScroll />
      <ScrollProgress />
      <RouteProgress />
      <Header />
      <LayoutGroup>
        <main id="main" tabIndex={-1} className="relative min-h-screen outline-none">
          <AnimatePresence mode="popLayout" initial={false}>
            <PageFrame key={location.pathname}>
              <FrozenOutlet />
            </PageFrame>
          </AnimatePresence>
        </main>
      </LayoutGroup>
      <Footer />
      <FloatingCta />
      <BackToTop />
      <WhatsAppButton />
      <CustomCursor />
      <ScrollRestoration />
    </MotionConfig>);

}

export function BootScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg" role="status" aria-label="Loading">
      <LogoMark className="h-12 animate-pulse" />
    </div>);

}
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CalendarDays } from 'lucide-react';

/** Mobile-only floating "Book a Consultation" button. */
export function FloatingCta() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 480));
  const hidden = pathname.startsWith('/book-consultation');

  return (
    <AnimatePresence>
      {show && !hidden &&
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        className="fixed bottom-5 end-5 z-40 lg:hidden">
        
          <Link
          to="/book-consultation"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-lime-500 px-5 text-sm font-medium text-ink-950 shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)] active:scale-[0.97]">
          
            <CalendarDays className="size-4" aria-hidden />
            {t('nav.book')}
          </Link>
        </motion.div>
      }
    </AnimatePresence>);

}
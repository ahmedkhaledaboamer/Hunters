import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { registerLenis, scrollToTarget } from '../lib/scroll';
import { cn } from '../lib/cn';

/**
 * Inertial wheel scrolling (Lenis). Touch keeps native scrolling, and it is off for reduced motion.
 * Lenis drives the real window scroll, so framer's useScroll, sticky elements and ScrollRestoration keep working;
 * it also re-measures by itself when the page height changes (route changes, deferred sections).
 */
export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
      anchors: true
    });
    registerLenis(lenis);
    return () => {
      registerLenis(null);
      lenis.destroy();
    };
  }, [reduce]);

  return null;
}

/** Thin lime bar along the top edge that tracks how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[69] h-0.5 origin-left bg-lime-500 rtl:origin-right" />;
}

const R = 20;
const C = 2 * Math.PI * R;

/** Appears after the first screen; its ring fills with scroll progress. */
export function BackToTop() {
  const { t } = useTranslation();
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 600));
  const ring = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const dashOffset = useTransform(ring, (v) => C * (1 - v));

  return (
    <motion.button
      type="button"
      onClick={() => scrollToTarget(0)}
      aria-label={t('common.backToTop')}
      initial={false}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.8, y: show ? 0 : 12 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      tabIndex={show ? 0 : -1}
      className={cn(
        'fixed bottom-20 end-5 z-40 inline-flex size-12 items-center justify-center rounded-full border border-line bg-bg/80 text-fg shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)] backdrop-blur-md transition-colors duration-150 hover:text-accent-ink lg:bottom-6 lg:end-6',
        !show && 'pointer-events-none'
      )}>

      <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r={R} className="fill-none stroke-line" strokeWidth="2" />
        <motion.circle
          cx="24"
          cy="24"
          r={R}
          className="fill-none stroke-lime-500"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={C}
          style={{ strokeDashoffset: dashOffset }} />

      </svg>
      <ArrowUp className="relative size-4" aria-hidden />
    </motion.button>);

}

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { philosophyShifts } from '../../data/company';
import { useL } from '../../features/preferences/usePreferences';
import { cn } from '../../shared/lib/cn';
import { EASE_OUT } from '../../shared/motion/variants';

const FLIP_EVERY = 1500;

/** "From → To" transformations that flip one line at a time, like a departures board. */
export function PhilosophyFlip() {
  const l = useL();
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState<boolean[]>(() => philosophyShifts.map(() => false));

  useEffect(() => {
    if (!inView || reduce) return;
    let i = 0;
    const id = window.setInterval(() => {
      setFlipped((prev) => prev.map((v, idx) => idx === i % prev.length ? !v : v));
      i += 1;
    }, FLIP_EVERY);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <ul ref={ref} className="divide-y divide-line border-y border-line">
      {philosophyShifts.map((shift, i) => {
        const isTo = flipped[i];
        return (
          <li key={i} className="flex items-center gap-4 py-5 [perspective:600px]">
            <span
              aria-hidden
              className={cn(
                'size-2 shrink-0 rounded-full transition-colors duration-200',
                isTo ? 'bg-accent dark:shadow-[0_0_10px_rgb(215_247_30/0.7)]' : 'bg-line-strong'
              )} />
            
            {reduce ?
            <span className="flex flex-wrap items-center gap-2 text-lg font-light">
                <span className="text-muted">{l(shift.from)}</span>
                <ArrowRight className="size-4 text-accent-ink rtl:-scale-x-100" aria-hidden />
                <span className="text-fg">{l(shift.to)}</span>
              </span> :

            <span className="relative block h-8 flex-1 overflow-hidden">
                <span className="sr-only">
                  {l(shift.from)} — {l(shift.to)}
                </span>
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                  key={isTo ? 'to' : 'from'}
                  aria-hidden
                  initial={{ rotateX: -90, opacity: 0, y: 14 }}
                  animate={{ rotateX: 0, opacity: 1, y: 0 }}
                  exit={{ rotateX: 90, opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className={cn(
                    'absolute inset-0 flex origin-center items-center truncate text-lg font-light md:text-xl',
                    isTo ? 'text-fg' : 'text-muted'
                  )}>
                  
                    {isTo ? l(shift.to) : l(shift.from)}
                  </motion.span>
                </AnimatePresence>
              </span>
            }
          </li>);

      })}
    </ul>);

}
import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { formatNumber } from '../lib/format';
import { useLocale } from '../../features/preferences/usePreferences';
import { EASE_OUT } from '../motion/variants';

export function AnimatedCounter({ value, className }: {value: number;className?: string;}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const locale = useLocale();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, { duration: 1.1, ease: EASE_OUT, onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {formatNumber(display, locale)}
    </span>);

}
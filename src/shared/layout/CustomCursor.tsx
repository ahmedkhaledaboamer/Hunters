import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], input, textarea, select, label, summary';

/** Lime dot + trailing ring. Only on fine pointers without reduced-motion preference. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(fine && !reduce);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHovering(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <motion.div
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
        className="absolute left-0 top-0 -ml-1 -mt-1 size-2 rounded-full bg-lime-500 ring-1 ring-ink-950/40 dark:ring-0" />
      
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 1.9 : 1 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="absolute left-0 top-0 -ml-4 -mt-4 size-8 rounded-full border border-lime-500/80 dark:border-lime-500/60" />
      
    </div>);

}
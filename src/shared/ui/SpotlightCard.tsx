import React, { createContext, useContext, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/cn';
import { NodeCorner } from './NodeLine';

const MAX_TILT = 6;

const PointerContext = createContext<{px: MotionValue<number>;py: MotionValue<number>;} | null>(null);

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  to?: string;
  label?: string;
  index?: number;
  tilt?: boolean;
  onNavigate?: () => void;
}

/**
 * Premium interactive card: cursor-following spotlight, subtle 3D tilt,
 * animated border beam, node connector and an oversized background index.
 */
export function SpotlightCard({ children, className, to, label, index, tilt = true, onNavigate }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), spring);
  const allowTilt = tilt && !reduce;

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    px.set(x / rect.width - 0.5);
    py.set(y / rect.height - 0.5);
  }

  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <PointerContext.Provider value={{ px, py }}>
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={allowTilt ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
        className={cn('group glass relative isolate overflow-hidden rounded-2xl', className)}>
        
        <span className="spotlight" aria-hidden />
        <span className="border-beam" aria-hidden />
        <NodeCorner />
        {index !== undefined &&
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-8 end-3 select-none font-latin text-[9rem] font-extralight leading-none text-fg/[0.045] tabular-nums transition-colors duration-200 group-hover:text-fg/[0.08]">
          
            {String(index).padStart(2, '0')}
          </span>
        }
        <div className="relative h-full">{children}</div>
        {to &&
        <Link to={to} onClick={onNavigate} aria-label={label} className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-offset-[-2px]" />
        }
      </motion.div>
    </PointerContext.Provider>);

}

/** Inner layer that drifts with the pointer for a parallax "floating forward" effect. */
export function TiltLayer({ children, depth = 10, className }: {children: ReactNode;depth?: number;className?: string;}) {
  const ctx = useContext(PointerContext);
  const fallback = useMotionValue(0);
  const x = useSpring(useTransform(ctx?.px ?? fallback, [-0.5, 0.5], [-depth, depth]), { stiffness: 200, damping: 20 });
  const y = useSpring(useTransform(ctx?.py ?? fallback, [-0.5, 0.5], [-depth, depth]), { stiffness: 200, damping: 20 });
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>);

}

export function CardArrow({ className }: {className?: string;}) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-fg',
        'transition-[background-color,border-color,color] duration-200 group-hover:border-lime-500 group-hover:bg-lime-500 group-hover:text-ink-950',
        className
      )}>
      
      <ArrowUpRight className="size-4 transition-transform duration-200 ease-out group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45" />
    </span>);

}
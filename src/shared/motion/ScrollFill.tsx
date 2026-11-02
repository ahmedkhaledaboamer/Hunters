import { type RefObject } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

type ScrollOffset = NonNullable<NonNullable<Parameters<typeof useScroll>[0]>['offset']>;

interface ScrollFillProps {
  /** Element whose scroll progress drives the fill. Must be rendered in the same commit as this component. */
  target: RefObject<HTMLElement>;
  offset: ScrollOffset;
  axis?: 'x' | 'y';
  stiffness?: number;
  damping?: number;
  className?: string;
}

/**
 * A line that fills as `target` scrolls through the viewport.
 * Render it next to the target (not above a loading state) so the ref is attached when tracking starts.
 */
export function ScrollFill({ target, offset, axis = 'y', stiffness = 120, damping = 24, className }: ScrollFillProps) {
  // layoutEffect: false — the target is usually an ancestor, whose ref attaches after this child's layout effects.
  const { scrollYProgress } = useScroll({ target, offset, layoutEffect: false });
  const fill = useSpring(scrollYProgress, { stiffness, damping });
  return <motion.div style={axis === 'x' ? { scaleX: fill } : { scaleY: fill }} className={className} />;
}

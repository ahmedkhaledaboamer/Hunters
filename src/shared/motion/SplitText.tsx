import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../lib/cn';
import { EASE_OUT } from './variants';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

interface SplitTextProps {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  /** "view": reveal when scrolled into view. "mount": reveal immediately. */
  trigger?: 'view' | 'mount';
  /** When provided, the reveal is controlled externally (e.g. slider slides). */
  active?: boolean;
}

/**
 * Word-by-word reveal. Splits on whitespace only — never by letter —
 * so Arabic letter joining is always preserved.
 */
export function SplitText({ text, as = 'h2', className, delay = 0, trigger = 'view', active }: SplitTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);
  const MotionTag = motion[as] as typeof motion.h2;
  const triggerProps =
  active !== undefined ?
  { initial: 'hidden', animate: active ? 'visible' : 'hidden' } :
  trigger === 'view' ?
  { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.5 } } :
  { initial: 'hidden', animate: 'visible' };

  return (
    <MotionTag
      className={cn('text-balance', className)}
      aria-label={text}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
      {...triggerProps}>
      
      {words.map((word, i) =>
      <Fragment key={`${word}-${i}`}>
          <span aria-hidden className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
            <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: '110%', transition: { duration: 0.15 } },
              visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: EASE_OUT } }
            }}>
            
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      )}
    </MotionTag>);

}
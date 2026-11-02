import { motion } from 'framer-motion';
import { cn } from '../lib/cn';
import { EASE_OUT } from '../motion/variants';

/** The signature motif: a glowing node with a line extending toward the end side. Mirrors in RTL. */
export function NodeLine({ className, draw = true }: {className?: string;draw?: boolean;}) {
  return (
    <div className={cn('flex items-center', className)} aria-hidden>
      <NodeDot />
      <motion.span
        className="h-px flex-1 origin-left bg-line-strong rtl:origin-right"
        initial={draw ? { scaleX: 0 } : false}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.3, ease: EASE_OUT }} />
      
    </div>);

}

export function NodeDot({ className, pulse = true }: {className?: string;pulse?: boolean;}) {
  return (
    <span className={cn('relative inline-flex size-2.5 shrink-0 rounded-full bg-accent dark:shadow-[0_0_14px_2px_rgb(215_247_30/0.55)]', className)} aria-hidden>
      {pulse && <span className="absolute inset-0 rounded-full bg-accent animate-node-pulse" />}
    </span>);

}

/** Small connector in a card's top-end corner. */
export function NodeCorner({ className }: {className?: string;}) {
  return (
    <span aria-hidden className={cn('pointer-events-none absolute top-5 end-5 flex items-center', className)}>
      <span className="h-px w-7 bg-line-strong transition-colors duration-200 group-hover:bg-accent" />
      <span className="size-1.5 rounded-full bg-line-strong transition-colors duration-200 group-hover:bg-accent" />
    </span>);

}
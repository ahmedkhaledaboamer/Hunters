import type { Transition, Variants } from 'framer-motion';

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const quick: Transition = { duration: 0.18, ease: EASE_OUT };
export const base: Transition = { duration: 0.3, ease: EASE_OUT };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { ...base, delay } })
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({ opacity: 1, transition: { ...base, delay } })
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay = 0) => ({ opacity: 1, scale: 1, transition: { ...base, delay } })
};

export const stagger = (step = 0.05, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: step, delayChildren } }
});

export const viewportOnce = { once: true, amount: 0.2 } as const;
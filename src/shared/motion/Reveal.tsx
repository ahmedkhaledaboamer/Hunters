import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from './variants';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div className={className} variants={fadeUp} custom={delay} initial="hidden" whileInView="visible" viewport={viewportOnce}>
      {children}
    </motion.div>);

}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  step?: number;
  as?: 'div' | 'ul' | 'ol';
}

export function RevealGroup({ children, className, step = 0.05, as = 'div' }: RevealGroupProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag className={className} variants={stagger(step)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
      {children}
    </Tag>);

}

export function RevealItem({ children, className, as = 'div' }: {children: ReactNode;className?: string;as?: 'div' | 'li';}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>);

}
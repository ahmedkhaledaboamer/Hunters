import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT } from './variants';

export function PageTransition({ children }: {children: ReactNode;}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_OUT } }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.16, ease: EASE_OUT } }}>
      
      {children}
    </motion.div>);

}
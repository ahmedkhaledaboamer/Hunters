import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '../lib/cn';
import { EASE_OUT } from '../motion/variants';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export function Accordion({ items, className }: {items: AccordionItem[];className?: string;}) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className={cn('divide-y divide-line border-y border-line', className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`acc-${item.id}`}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 py-6 text-start text-lg font-light text-fg transition-colors duration-150 hover:text-accent-ink">
                
                {item.title}
                <Plus
                  aria-hidden
                  className={cn('size-5 shrink-0 text-muted transition-transform duration-200 ease-out', isOpen && 'rotate-45 text-accent-ink')} />
                
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen &&
              <motion.div
                id={`acc-${item.id}`}
                role="region"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.24, ease: EASE_OUT }}
                className="overflow-hidden">
                
                  <div className="max-w-3xl pb-6 leading-relaxed text-muted">{item.content}</div>
                </motion.div>
              }
            </AnimatePresence>
          </div>);

      })}
    </div>);

}
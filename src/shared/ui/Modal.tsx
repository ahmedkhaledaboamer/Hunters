import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/cn';
import { EASE_OUT } from '../motion/variants';
import { lockScroll, unlockScroll } from '../lib/scroll';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: 'dialog' | 'drawer';
}

export function Modal({ open, onClose, title, children, variant = 'dialog' }: ModalProps) {
  const { t } = useTranslation();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      unlockScroll();
      window.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  const drawer = variant === 'drawer';
  const from = typeof document !== 'undefined' && document.documentElement.dir === 'rtl' ? -40 : 40;

  return createPortal(
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[80]">
          <motion.div
          className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }} />
        
          <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          initial={drawer ? { opacity: 0, x: from } : { opacity: 0, scale: 0.96 }}
          animate={drawer ? { opacity: 1, x: 0 } : { opacity: 1, scale: 1 }}
          exit={drawer ? { opacity: 0, x: from } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.26, ease: EASE_OUT }}
          className={cn(
            'absolute flex flex-col overflow-hidden border border-line bg-bg text-fg shadow-2xl outline-none',
            drawer ?
            'inset-y-0 end-0 w-full max-w-xl sm:rounded-s-2xl' :
            'inset-x-4 inset-y-[6vh] mx-auto my-auto h-fit max-h-[88vh] max-w-2xl rounded-2xl'
          )}>
          
            <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
              <h2 className="text-lg font-light">{title}</h2>
              <button
              type="button"
              onClick={onClose}
              aria-label={t('common.close')}
              className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-fg/5 hover:text-fg">
              
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <div data-lenis-prevent className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </div>
      }
    </AnimatePresence>,
    document.body
  );
}
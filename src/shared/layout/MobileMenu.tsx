import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { cn } from '../lib/cn';
import { EASE_OUT } from '../motion/variants';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { companyLinks, primaryNav } from './navigation';
import { lockScroll, unlockScroll } from '../lib/scroll';

export function MobileMenu({ open, onClose }: {open: boolean;onClose: () => void;}) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      unlockScroll();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const links = [
  { to: '/', label: t('nav.home') },
  ...primaryNav.filter((n) => n.to).map((n) => ({ to: n.to as string, label: t(`nav.${n.key}`) })),
  ...companyLinks.map((c) => ({ to: c.to, label: t(`nav.${c.key}`) }))];


  return (
    <AnimatePresence>
      {open &&
      <motion.div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.primary')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        data-lenis-prevent
        className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg">
        
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
          <Container className="relative flex h-18 items-center justify-between">
            <Logo />
            <button
            type="button"
            onClick={onClose}
            aria-label={t('nav.closeMenu')}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg">
            
              <X className="size-5" aria-hidden />
            </button>
          </Container>
          <Container className="relative flex flex-1 flex-col py-8">
            <motion.ul
            className="flex flex-col"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } } }}>
            
              {links.map((link) =>
            <motion.li
              key={link.to}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.26, ease: EASE_OUT } } }}>
              
                  <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 border-b border-line py-3.5 text-2xl font-extralight transition-colors duration-150',
                  isActive ? 'text-accent-ink' : 'text-fg hover:text-accent-ink'
                )
                }>
                
                    {link.label}
                  </NavLink>
                </motion.li>
            )}
            </motion.ul>
            <div className="mt-auto flex items-center gap-3 pt-10">
              <LanguageToggle />
              <ThemeToggle />
              <Button to="/book-consultation" onClick={onClose} className="flex-1" arrow>
                {t('nav.book')}
              </Button>
            </div>
          </Container>
        </motion.div>
      }
    </AnimatePresence>);

}
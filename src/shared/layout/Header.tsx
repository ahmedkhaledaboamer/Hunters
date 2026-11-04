import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Menu } from 'lucide-react';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { cn } from '../lib/cn';
import { EASE_OUT } from '../motion/variants';
import { LanguageToggle } from './LanguageToggle';
import { SiteSearch } from './SiteSearch';
import { ThemeToggle } from './ThemeToggle';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { primaryNav, type MegaKind } from './navigation';

type Mega = MegaKind;

const linkBase = 'relative whitespace-nowrap rounded-full px-3.5 py-2 text-sm transition-colors duration-150';

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mega, setMega] = useState<Mega | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 280 && mega === null);
  });

  useEffect(() => {
    setMega(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMega(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mega]);

  const companyActive = ['/about', '/history', '/partners', '/locations', '/governance', '/careers'].some((p) => location.pathname.startsWith(p));
  const solid = scrolled || mega !== null;

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={() => setMega(null)}>
        
        <div
          className={cn(
            'relative border-b transition-[background-color,border-color] duration-300',
            solid ? 'border-line bg-bg/75 backdrop-blur-xl' : 'border-transparent bg-transparent'
          )}>
          
          <Container wide className="flex h-18 items-center gap-4">
            <Link to="/" aria-label={t('brand.name')} className="shrink-0 rounded-md">
              <Logo />
            </Link>

            <nav aria-label={t('nav.primary')} className="ms-6 hidden xl:block">
              <ul className="flex items-center gap-0.5">
                {primaryNav.map((item) => {
                  const label = t(`nav.${item.key}`);
                  if (item.mega) {
                    const open = mega === item.mega;
                    const active = item.mega === 'company' ? companyActive : location.pathname.startsWith(item.to as string);
                    return (
                      <li key={item.key} onMouseEnter={() => setMega(item.mega ?? null)}>
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={`mega-${item.mega}`}
                          onClick={() => setMega(open ? null : item.mega ?? null)}
                          className={cn(linkBase, 'flex items-center gap-1', open || active ? 'text-fg' : 'text-muted hover:text-fg')}>
                          
                          {label}
                          <ChevronDown aria-hidden className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')} />
                          {active && <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent" />}
                        </button>
                      </li>);

                  }
                  return (
                    <li key={item.key} onMouseEnter={() => setMega(null)}>
                      <NavLink
                        to={item.to as string}
                        className={({ isActive }) => cn(linkBase, 'block', isActive ? 'text-fg' : 'text-muted hover:text-fg')}>
                        
                        {({ isActive }) =>
                        <>
                            {label}
                            {isActive && <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent" />}
                          </>
                        }
                      </NavLink>
                    </li>);

                })}
              </ul>
            </nav>

            <div className="ms-auto flex items-center gap-2">
              <SiteSearch />
              <LanguageToggle />
              <ThemeToggle className="hidden sm:inline-flex" />
              <Button to="/book-consultation" size="sm" className="hidden h-10 sm:inline-flex" arrow>
                {t('nav.book')}
              </Button>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label={t('nav.menu')}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg xl:hidden">
                
                <Menu className="size-5" aria-hidden />
              </button>
            </div>
          </Container>
          <AnimatePresence>{mega && <MegaMenu key={mega} kind={mega} id={`mega-${mega}`} />}</AnimatePresence>
        </div>
      </motion.header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>);

}
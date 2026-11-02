import React from 'react';
import { flushSync } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useAppDispatch } from '../../app/hooks';
import { setTheme } from '../../features/preferences/preferencesSlice';
import { useResolvedTheme } from '../../features/preferences/usePreferences';
import { cn } from '../lib/cn';

const iconFor = { dark: Moon, light: Sun };

type ViewTransitionDoc = Document & {startViewTransition?: (cb: () => void) => {ready: Promise<void>;};};

export function ThemeToggle({ className }: {className?: string;}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  // Toggle what is actually on screen, so every click flips the theme (a 'system' step could look identical).
  const theme = useResolvedTheme();
  const reduce = useReducedMotion();
  const next = theme === 'dark' ? 'light' : 'dark';
  const Icon = iconFor[theme];

  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    const apply = () => flushSync(() => dispatch(setTheme(next)));
    const doc = document as ViewTransitionDoc;
    // Keyboard activation (detail === 0) and reduced motion skip the reveal.
    if (!doc.startViewTransition || reduce || e.detail === 0) {
      apply();
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = doc.startViewTransition(apply);
    void transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 300, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${t('prefs.theme')}: ${t(`prefs.${theme}`)} → ${t(`prefs.${next}`)}`}
      title={`${t('prefs.theme')}: ${t(`prefs.${theme}`)}`}
      className={cn(
        'relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full border border-line text-fg transition-colors duration-150 hover:border-line-strong hover:bg-fg/5',
        className
      )}>
      
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex">
          
          <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden />
        </motion.span>
      </AnimatePresence>
    </button>);

}
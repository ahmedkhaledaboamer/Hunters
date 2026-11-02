import type Lenis from 'lenis';

/** The active smooth-scroll instance (null when smooth scrolling is off, e.g. reduced motion). */
let lenis: Lenis | null = null;
let locks = 0;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Freezes page scrolling (menus, dialogs). Calls nest: the page unlocks when the last one releases. */
export function lockScroll() {
  if (locks++ > 0) return;
  document.body.style.overflow = 'hidden';
  lenis?.stop();
}

export function unlockScroll() {
  if (locks === 0) return;
  if (--locks > 0) return;
  document.body.style.overflow = '';
  lenis?.start();
}

/** Smoothly scrolls to a position or element, through Lenis when it is running. */
export function scrollToTarget(target: number | HTMLElement, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset });
    return;
  }
  const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

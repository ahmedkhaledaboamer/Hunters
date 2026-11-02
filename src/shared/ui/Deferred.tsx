import { useEffect, useRef, useState, type ReactNode } from 'react';

interface DeferredProps {
  children: ReactNode;
  /** Space reserved before the content mounts, so the page height (and scrollbar) is stable. */
  placeholderHeight?: string;
}

/**
 * Mounts below-the-fold content after the first paint: as soon as the browser is idle, or earlier
 * when the visitor scrolls near it. Keeps the initial render small so the hero paints fast on phones.
 */
export function Deferred({ children, placeholderHeight = '200vh' }: DeferredProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const reveal = () => setShow(true);
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && reveal(), { rootMargin: '600px 0px' });
    if (ref.current) io.observe(ref.current);
    const idle = window.requestIdleCallback ?
    window.requestIdleCallback(reveal, { timeout: 1500 }) :
    window.setTimeout(reveal, 300);
    return () => {
      io.disconnect();
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);else
      window.clearTimeout(idle);
    };
  }, [show]);

  return show ? <>{children}</> : <div ref={ref} aria-hidden style={{ minHeight: placeholderHeight }} />;
}

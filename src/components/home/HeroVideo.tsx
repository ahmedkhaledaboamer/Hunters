import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '../../shared/lib/cn';

type NetworkInfo = {saveData?: boolean;effectiveType?: string;};

/**
 * Fixed background video behind the hero slides (only the slide content moves).
 * Costs nothing up front: it mounts after the page has loaded and the browser is idle. Phones, reduced motion,
 * Data Saver and 2G get the still poster (50 KB) instead of the video.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<'none' | 'poster' | 'video'>('none');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & {connection?: NetworkInfo;}).connection;
    // Phones get the still frame: decoding video on a phone CPU competes with the page and costs mobile data.
    const small = !window.matchMedia('(min-width: 768px)').matches;
    const still = reduce || small || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '');
    let idle = 0;
    const show = () => setMode(still ? 'poster' : 'video');
    const start = () => {
      idle = window.requestIdleCallback ? window.requestIdleCallback(show, { timeout: 2500 }) : window.setTimeout(show, 1000);
    };
    if (document.readyState === 'complete') start();else
    window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);else
      window.clearTimeout(idle);
    };
  }, [reduce]);

  // Only play while the hero is on screen.
  useEffect(() => {
    const video = ref.current;
    if (mode !== 'video' || !video) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => undefined);else
      video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, [mode]);

  if (mode === 'none') return null;

  const layer = cn('pointer-events-none absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-out', ready ? 'opacity-100' : 'opacity-0');

  if (mode === 'poster') {
    return <img src="/video/hero-poster.webp" alt="" aria-hidden decoding="async" onLoad={() => setReady(true)} className={layer} />;
  }

  return (
    <video
      ref={ref}
      src="/video/hero-720.mp4"
      poster="/video/hero-poster.webp"
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-hidden
      tabIndex={-1}
      onCanPlay={() => setReady(true)}
      className={layer} />);

}

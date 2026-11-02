import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, useMotionValue, useReducedMotion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Phase } from '../../entities';
import { useGetPhasesQuery } from '../../features/content/contentApi';
import { useL } from '../../features/preferences/usePreferences';
import { useLabel } from '../../i18n/labels';
import { icons } from '../../shared/lib/icons';
import { cn } from '../../shared/lib/cn';
import { QueryState } from '../../shared/ui/QueryState';
import { Skeleton } from '../../shared/ui/Skeleton';
import { EASE_OUT } from '../../shared/motion/variants';

const STEP_MS = 6000;
const pad = (n: number) => String(n).padStart(2, '0');

/** Six delivery phases as an auto-advancing stepper with a detail panel. */
export function FrameworkStepper() {
  const query = useGetPhasesQuery();
  return (
    <QueryState isLoading={query.isLoading} isError={query.isError} onRetry={query.refetch} skeleton={<Skeleton className="h-[520px] rounded-3xl" />}>
      {() => <Stepper phases={query.data ?? []} />}
    </QueryState>);

}

function Stepper({ phases }: {phases: Phase[];}) {
  const { t } = useTranslation();
  const l = useL();
  const label = useLabel();
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);
  const count = phases.length;

  const go = (i: number) => {
    setActive((i + count) % count);
    progress.set(0);
  };

  // Auto-advance while visible; pauses on hover / focus and for reduced motion.
  useEffect(() => {
    if (reduce || !inView || paused || count < 2) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const next = progress.get() + (now - last) / STEP_MS;
      last = now;
      if (next >= 1) {
        progress.set(0);
        setActive((a) => (a + 1) % count);
      } else {
        progress.set(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, inView, paused, count, progress]);

  const phase = phases[active];
  if (!phase) return null;
  const Icon = icons[phase.icon];

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}>

      <div role="tablist" aria-label={t('home.frameworkTitle')} className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-6 md:px-0">
        {phases.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`phase-tab-${p.id}`}
              aria-selected={on}
              aria-controls="phase-panel"
              onClick={() => go(i)}
              className="group min-w-[150px] pb-2 text-start md:min-w-0">

              <span className="relative block h-0.5 w-full overflow-hidden rounded-full bg-line-strong">
                <motion.span
                  className="absolute inset-0 origin-left bg-accent rtl:origin-right"
                  style={{ scaleX: on ? reduce ? 1 : progress : i < active ? 1 : 0 }} />

              </span>
              <span className="mt-4 flex items-center gap-2">
                <span dir="ltr" className={cn('font-latin text-xs tabular-nums transition-colors duration-200', on ? 'text-accent-ink' : 'text-muted')}>
                  {pad(p.index)}
                </span>
                <span className={cn('font-latin text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 rtl:font-arabic rtl:text-xs rtl:tracking-normal', on ? 'text-accent-ink' : 'text-muted group-hover:text-fg')}>
                  {label(p.name)}
                </span>
              </span>
              <span className={cn('mt-1.5 block text-sm leading-snug transition-colors duration-200', on ? 'text-fg' : 'text-muted group-hover:text-fg')}>
                {l(p.title)}
              </span>
            </button>);

        })}
      </div>

      <div
        id="phase-panel"
        role="tabpanel"
        aria-labelledby={`phase-tab-${phase.id}`}
        className="glass relative mt-10 overflow-hidden rounded-3xl">

        <div aria-hidden className="pointer-events-none absolute -bottom-40 -end-40 size-[520px] rounded-full glow-radial" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_80%_50%,#000_10%,transparent_65%)]" />

        <div className="relative grid items-center gap-10 p-7 md:p-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}>

            <div className="flex items-center gap-4">
              <span dir="ltr" className="font-latin text-6xl font-extralight leading-none tabular-nums text-accent-ink md:text-7xl">
                {pad(phase.index)}
              </span>
              <span className="h-12 w-px bg-line-strong" aria-hidden />
              <span className="font-latin text-xs uppercase tracking-[0.25em] text-muted rtl:font-arabic rtl:tracking-normal">
                {t('common.phase')} · {label(phase.name)}
              </span>
            </div>
            <h3 className="mt-8 text-3xl font-light leading-tight text-fg md:text-4xl">{l(phase.title)}</h3>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{l(phase.description)}</p>

            <div className="mt-8 border-t border-line pt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{t('common.outputs')}</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {phase.outputs.map((o) =>
                <li key={o.en} className="flex items-start gap-3 text-sm text-fg">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-lime-500/15 text-accent-ink">
                      <Check className="size-3" strokeWidth={2.5} aria-hidden />
                    </span>
                    {l(o)}
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(active - 1)}
                aria-label={t('common.previous')}
                className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg transition-colors duration-150 hover:border-accent hover:text-accent-ink">

                <ChevronLeft className="size-5 rtl:-scale-x-100" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(active + 1)}
                aria-label={t('common.next')}
                className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg transition-colors duration-150 hover:border-accent hover:text-accent-ink">

                <ChevronRight className="size-5 rtl:-scale-x-100" aria-hidden />
              </button>
              <span dir="ltr" className="ms-3 font-latin text-xs tabular-nums text-muted">
                <span className="text-fg">{pad(active + 1)}</span> / {pad(count)}
              </span>
            </div>
          </motion.div>

          <PhaseRing count={count} active={active} icon={<Icon className="size-10 md:size-12" strokeWidth={1.2} aria-hidden />} />
        </div>
      </div>
    </div>);

}

/** Segmented ring: completed phases lit, the active one glowing, the phase icon in the centre. */
function PhaseRing({ count, active, icon }: {count: number;active: number;icon: ReactNode;}) {
  const size = 320;
  const r = 138;
  const c = size / 2;
  const gap = 6; // degrees between segments
  const span = 360 / count;
  const arc = (i: number) => {
    const start = (i * span + gap / 2 - 90) * (Math.PI / 180);
    const end = ((i + 1) * span - gap / 2 - 90) * (Math.PI / 180);
    return `M ${c + r * Math.cos(start)} ${c + r * Math.sin(start)} A ${r} ${r} 0 0 1 ${c + r * Math.cos(end)} ${c + r * Math.sin(end)}`;
  };

  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-[340px] sm:block" aria-hidden>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 size-full rtl:-scale-x-100">
        <circle cx={c} cy={c} r={r - 26} className="fill-none stroke-line" strokeDasharray="2 6" />
        <circle cx={c} cy={c} r={r + 18} className="fill-none stroke-line" />
        {Array.from({ length: count }, (_, i) =>
        <motion.path
          key={i}
          d={arc(i)}
          strokeLinecap="round"
          strokeWidth={i === active ? 6 : 3}
          initial={false}
          animate={{ opacity: i <= active ? 1 : 0.25 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className={cn('fill-none', i <= active ? 'stroke-lime-500' : 'stroke-fg/40')}
          style={i === active ? { filter: 'drop-shadow(0 0 8px rgb(215 247 30 / 0.7))' } : undefined} />
        )}
      </svg>
      <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full border border-line bg-bg/60 text-accent-ink backdrop-blur">
        <motion.span
          key={active}
          initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="inline-flex">

          {icon}
        </motion.span>
        <span dir="ltr" className="mt-3 font-latin text-xs tabular-nums text-muted">
          {pad(active + 1)} — {pad(count)}
        </span>
      </div>
    </div>);

}

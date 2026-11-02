import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Phase } from '../../entities';
import { useGetPhasesQuery } from '../../features/content/contentApi';
import { useL } from '../../features/preferences/usePreferences';
import { useLabel } from '../../i18n/labels';
import { icons } from '../../shared/lib/icons';
import { cn } from '../../shared/lib/cn';
import { QueryState } from '../../shared/ui/QueryState';
import { Skeleton } from '../../shared/ui/Skeleton';
import { Eyebrow } from '../../shared/ui/SectionHeading';
import { Badge } from '../../shared/ui/Badge';
import { ScrollFill } from '../../shared/motion/ScrollFill';

/** Sticky scroll storytelling: sticky title + progress on one side, phases scroll by on the other. */
export function FrameworkStory() {
  const { t } = useTranslation();
  const l = useL();
  const label = useLabel();
  const query = useGetPhasesQuery();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const phases = query.data ?? [];

  return (
    <QueryState isLoading={query.isLoading} isError={query.isError} onRetry={query.refetch} skeleton={<Skeleton className="h-[60vh]" />}>
      {() =>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-9rem)] lg:self-start">
            <Eyebrow>OUR DELIVERY FRAMEWORK</Eyebrow>
            <h2 className="mt-5 text-headline font-light tracking-tight rtl:leading-[1.3] rtl:tracking-normal">{t('howWeWork.title')}</h2>
            <p className="mt-6 max-w-md text-lg text-muted">{t('howWeWork.lead')}</p>

            <div className="mt-12 hidden gap-6 lg:flex" aria-label={t('howWeWork.progress')}>
              <div className="relative w-px bg-line" aria-hidden>
                <ScrollFill target={listRef} offset={['start 60%', 'end 60%']} stiffness={140} damping={26} className="absolute inset-0 origin-top bg-accent" />
              </div>
              <ol className="flex flex-col gap-3">
                {phases.map((p, i) =>
              <li key={p.id} className="flex items-baseline gap-3">
                    <span dir="ltr" className={cn('font-latin text-xs tabular-nums transition-colors duration-200', i === active ? 'text-accent-ink' : 'text-muted')}>
                      {String(p.index).padStart(2, '0')}
                    </span>
                    <span className={cn('text-sm transition-colors duration-200', i === active ? 'text-fg' : 'text-muted')}>
                      {label(p.name)} · {l(p.title)}
                    </span>
                  </li>
              )}
              </ol>
            </div>
          </div>

          <ol ref={listRef} className="flex flex-col">
            {phases.map((phase, i) =>
          <PhaseBlock key={phase.id} phase={phase} onActive={() => setActive(i)} isActive={i === active} />
          )}
          </ol>
        </div>
      }
    </QueryState>);

}

function PhaseBlock({ phase, onActive, isActive }: {phase: Phase;onActive: () => void;isActive: boolean;}) {
  const { t } = useTranslation();
  const l = useL();
  const label = useLabel();
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const Icon = icons[phase.icon];

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <li ref={ref} className="flex min-h-[70vh] items-center py-10 first:pt-0">
      <motion.article
        animate={{ opacity: isActive ? 1 : 0.35 }}
        transition={{ duration: 0.25 }}
        className={cn('glass relative w-full overflow-hidden rounded-3xl p-8 md:p-12', isActive && 'border-lime-500/40')}>
        
        <span aria-hidden className="pointer-events-none absolute -top-10 end-6 select-none font-latin text-[11rem] font-extralight leading-none text-fg/[0.04]">
          {String(phase.index).padStart(2, '0')}
        </span>
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-line text-accent-ink">
              <Icon className="size-5" strokeWidth={1.5} aria-hidden />
            </span>
            <span dir="ltr" className="font-latin text-xs uppercase tracking-[0.25em] text-accent-ink">
              {t('common.phase')} {String(phase.index).padStart(2, '0')} — {label(phase.name)}
            </span>
          </div>
          <h3 className="mt-8 text-3xl font-light md:text-4xl">{l(phase.title)}</h3>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{l(phase.description)}</p>
          <div className="mt-8 border-t border-line pt-6">
            <p className="text-sm text-fg/80">{t('common.outputs')}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {phase.outputs.map((o) =>
              <li key={o.en}>
                  <Badge tone="outline">{l(o)}</Badge>
                </li>
              )}
            </ul>
          </div>
        </div>
      </motion.article>
    </li>);

}
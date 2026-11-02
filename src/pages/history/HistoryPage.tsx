import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { Milestone } from '../../entities';
import { useGetMilestonesQuery } from '../../features/content/contentApi';
import { useL } from '../../features/preferences/usePreferences';
import { useSeo } from '../../shared/lib/useSeo';
import { cn } from '../../shared/lib/cn';
import { PageHero } from '../../shared/ui/PageHero';
import { Container } from '../../shared/ui/Container';
import { Badge } from '../../shared/ui/Badge';
import { QueryState } from '../../shared/ui/QueryState';
import { Skeleton } from '../../shared/ui/Skeleton';
import { EASE_OUT } from '../../shared/motion/variants';
import { ScrollFill } from '../../shared/motion/ScrollFill';
import { scrollToTarget } from '../../shared/lib/scroll';

export function HistoryPage() {
  const { t } = useTranslation();
  const l = useL();
  useSeo(t('nav.history'), t('history.lead'));
  const query = useGetMilestonesQuery();
  const milestones = query.data ?? [];
  const lineRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!milestones.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    document.querySelectorAll('[data-milestone]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [milestones.length]);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (el) scrollToTarget(el, -(window.innerHeight / 2 - el.offsetHeight / 2));
  };

  return (
    <>
      <PageHero eyebrow="COMPANY HISTORY" title={t('history.title')} lead={t('history.lead')}>
        <Badge tone="accent">{t('history.note')}</Badge>
      </PageHero>

      <QueryState isLoading={query.isLoading} isError={query.isError} onRetry={query.refetch} skeleton={<Container><Skeleton className="h-[60vh]" /></Container>}>
        {() =>
        <>
            <nav aria-label={t('history.scrubber')} className="sticky top-0 z-30 border-y border-line bg-bg/80 backdrop-blur-xl">
              <Container>
                <ol className="no-scrollbar flex gap-1 overflow-x-auto py-3">
                  {milestones.map((m, i) =>
                <li key={m.id} className="flex items-center">
                      <button
                    type="button"
                    onClick={() => jump(m.id)}
                    aria-current={active === i ? 'step' : undefined}
                    className={cn(
                      'flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors duration-150',
                      active === i ? 'bg-lime-500 text-ink-950' : 'text-muted hover:text-fg'
                    )}>
                    
                        <span dir="ltr" className="font-latin tabular-nums">{m.year}</span>
                        <span className="hidden sm:inline">· {l(m.title)}</span>
                      </button>
                      {i < milestones.length - 1 && <span aria-hidden className="mx-1 h-px w-6 bg-line-strong" />}
                    </li>
                )}
                </ol>
              </Container>
            </nav>

            <Container className="py-24">
              <ol ref={lineRef} className="relative">
                <div aria-hidden className="absolute bottom-0 start-[7px] top-0 w-px bg-line md:start-1/2 md:-ms-px">
                  <ScrollFill target={lineRef} offset={['start 70%', 'end 60%']} className="h-full w-full origin-top bg-accent" />
                </div>
                {milestones.map((m, i) =>
              <MilestoneItem key={m.id} milestone={m} index={i} active={active === i} />
              )}
              </ol>
            </Container>
          </>
        }
      </QueryState>
    </>);

}

function MilestoneItem({ milestone, index, active }: {milestone: Milestone;index: number;active: boolean;}) {
  const { t } = useTranslation();
  const l = useL();
  const even = index % 2 === 0;
  return (
    <li id={milestone.id} data-milestone data-index={index} className="relative grid scroll-mt-40 pb-20 ps-12 last:pb-0 md:grid-cols-2 md:ps-0">
      <span
        aria-hidden
        className={cn(
          'absolute start-0 top-2 flex size-[15px] items-center justify-center rounded-full border bg-bg transition-colors duration-200 md:start-1/2 md:-ms-[7.5px]',
          active ? 'border-accent' : 'border-line-strong'
        )}>
        
        <span className={cn('size-[5px] rounded-full transition-colors duration-200', active ? 'bg-accent' : 'bg-line-strong')} />
      </span>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className={cn('glass rounded-2xl p-7 md:p-9', even ? 'md:col-start-1 md:me-14' : 'md:col-start-2 md:ms-14')}>
        
        <p dir="ltr" className="font-latin text-5xl font-extralight tabular-nums text-accent-ink rtl:text-right">
          {milestone.year}
        </p>
        <h2 className="mt-4 text-2xl font-light">{l(milestone.title)}</h2>
        <p className="mt-3 leading-relaxed text-muted">{l(milestone.description)}</p>
        {milestone.placeholder &&
        <Badge tone="outline" className="mt-5">
            {t('common.placeholder')}
          </Badge>
        }
      </motion.article>
    </li>);

}
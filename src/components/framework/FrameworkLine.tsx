import { useRef } from 'react';
import { useGetPhasesQuery } from '../../features/content/contentApi';
import { useL } from '../../features/preferences/usePreferences';
import { useLabel } from '../../i18n/labels';
import { cn } from '../../shared/lib/cn';
import { QueryState } from '../../shared/ui/QueryState';
import { Skeleton } from '../../shared/ui/Skeleton';
import { RevealGroup, RevealItem } from '../../shared/motion/Reveal';
import { ScrollFill } from '../../shared/motion/ScrollFill';

/** Six delivery phases on a node line that draws as you scroll. Horizontal on desktop unless `vertical`. */
export function FrameworkLine({ vertical = false }: {vertical?: boolean;}) {
  const l = useL();
  const label = useLabel();
  const query = useGetPhasesQuery();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <QueryState isLoading={query.isLoading} isError={query.isError} onRetry={query.refetch} skeleton={<Skeleton className="h-64" />}>
      {() =>
      <div ref={ref} className="relative">
          {!vertical &&
        <div aria-hidden className="absolute inset-x-0 top-[7px] hidden h-px bg-line lg:block">
              <ScrollFill target={ref} offset={['start 85%', 'end 55%']} axis="x" className="h-full origin-left bg-accent rtl:origin-right" />
            </div>
        }
          <div aria-hidden className={cn('absolute bottom-0 start-[7px] top-0 w-px bg-line', !vertical && 'lg:hidden')}>
            <ScrollFill target={ref} offset={['start 85%', 'end 55%']} className="h-full w-full origin-top bg-accent" />
          </div>
          <RevealGroup as="ol" className={cn('grid gap-10', !vertical && 'lg:grid-cols-6 lg:gap-6')} step={0.06}>
            {(query.data ?? []).map((phase) =>
          <RevealItem as="li" key={phase.id} className={cn('relative ps-10', !vertical && 'lg:ps-0')}>
                <span
              aria-hidden
              className={cn(
                'absolute start-0 top-0 flex size-[15px] items-center justify-center rounded-full border border-accent bg-bg',
                !vertical && 'lg:relative'
              )}>
              
                  <span className="size-[5px] rounded-full bg-accent" />
                </span>
                <p className={cn('font-latin text-xs tabular-nums text-muted', !vertical && 'lg:mt-6')}>
                  <span dir="ltr">{String(phase.index).padStart(2, '0')}</span> ·{' '}
                  <span className="uppercase tracking-[0.2em] text-accent-ink rtl:font-arabic rtl:tracking-normal">{label(phase.name)}</span>
                </p>
                <h3 className="mt-2 text-lg font-light text-fg">{l(phase.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{l(phase.description)}</p>
              </RevealItem>
          )}
          </RevealGroup>
        </div>
      }
    </QueryState>);

}
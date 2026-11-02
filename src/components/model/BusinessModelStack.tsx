import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGetPillarsQuery } from '../../features/content/contentApi';
import { useL } from '../../features/preferences/usePreferences';
import { icons } from '../../shared/lib/icons';
import { cn } from '../../shared/lib/cn';
import { QueryState } from '../../shared/ui/QueryState';
import { Skeleton } from '../../shared/ui/Skeleton';
import { EASE_OUT } from '../../shared/motion/variants';

const GAP = 52;

/** Interactive isometric stack of the six layers of the Intelligent Business Model. */
export function BusinessModelStack({ detailed = false }: {detailed?: boolean;}) {
  const { t } = useTranslation();
  const l = useL();
  const query = useGetPillarsQuery('layers');
  const [active, setActive] = useState(3);

  return (
    <QueryState
      isLoading={query.isLoading}
      isError={query.isError}
      onRetry={query.refetch}
      skeleton={
      <div className="grid gap-10 lg:grid-cols-2">
          <Skeleton className="h-[460px]" />
          <Skeleton className="h-[460px]" />
        </div>
      }>
      
      {() => {
        const layers = query.data ?? [];
        const current = layers[active];
        const CurrentIcon = current ? icons[current.icon] : null;
        return (
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            {/* Isometric visual */}
            <div className="relative mx-auto h-[420px] w-full max-w-[520px] md:h-[480px]" aria-hidden>
              <div className="absolute inset-y-6 start-1/2 w-px bg-line-strong rtl:translate-x-1/2" />
              {layers.map((layer, i) => {
                const isActive = i === active;
                const bottom = 40 + i * GAP;
                return (
                  <motion.div
                    key={layer.id}
                    onMouseEnter={() => setActive(i)}
                    className="absolute start-1/2 -ms-[110px] size-[220px] md:-ms-[130px] md:size-[260px]"
                    style={{ bottom, zIndex: i + 1 }}
                    animate={{ y: isActive ? -16 : 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}>
                    
                    <div
                      className={cn(
                        'size-full rounded-2xl border transition-[background-color,border-color,box-shadow] duration-200 [transform:rotateX(60deg)_rotateZ(-45deg)]',
                        isActive ?
                        'border-lime-500 bg-lime-500 shadow-[0_0_60px_-10px_rgb(170_200_0/0.8)] dark:border-lime-500 dark:bg-lime-500/15 dark:shadow-[0_0_60px_-10px_rgb(215_247_30/0.6)]' :
                        'border-black/25 bg-white shadow-[0_10px_30px_-14px_rgb(0_0_0/0.35)] dark:border-line-strong dark:bg-surface-2/80 dark:shadow-none dark:backdrop-blur-sm'
                      )}>
                      
                      <div className="grid size-full grid-cols-4 grid-rows-4 gap-px p-4 opacity-60 dark:opacity-40">
                        {Array.from({ length: 16 }, (_, k) =>
                        <span key={k} className={cn('rounded-sm', isActive ? 'bg-ink-950/15 dark:bg-lime-500/40' : 'bg-black/[0.08] dark:bg-fg/[0.06]')} />
                        )}
                      </div>
                    </div>
                  </motion.div>);

              })}
            </div>

            {/* Layer list */}
            <div>
              <p className="mb-4 text-sm text-muted">{t('home.modelHint')}</p>
              <ol className="flex flex-col-reverse">
                {layers.map((layer, i) => {
                  const Icon = icons[layer.icon];
                  const isActive = i === active;
                  return (
                    <li key={layer.id} className="border-t border-line first:border-b">
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => setActive(i)}
                        aria-pressed={isActive}
                        className="group flex w-full items-center gap-4 py-4 text-start">
                        
                        <span dir="ltr" className={cn('w-6 font-latin text-xs tabular-nums', isActive ? 'text-accent-ink' : 'text-muted')}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <Icon className={cn('size-5 shrink-0 transition-colors duration-150', isActive ? 'text-accent-ink' : 'text-muted')} strokeWidth={1.5} aria-hidden />
                        <span className={cn('flex-1 text-lg font-light transition-colors duration-150', isActive ? 'text-fg' : 'text-muted group-hover:text-fg')}>
                          {l(layer.title)}
                          {detailed && <span className="mt-1 block text-sm leading-relaxed text-muted">{l(layer.description)}</span>}
                        </span>
                        <span className={cn('h-px w-8 transition-[background-color,transform] duration-200 origin-left rtl:origin-right', isActive ? 'scale-x-100 bg-accent' : 'scale-x-50 bg-line-strong')} />
                      </button>
                    </li>);

                })}
              </ol>
              {!detailed && current && CurrentIcon &&
              <div className="glass mt-8 min-h-[132px] rounded-2xl p-6" aria-live="polite">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}>
                    
                      <p className="flex items-center gap-2 text-sm text-accent-ink">
                        <CurrentIcon className="size-4" aria-hidden />
                        {l(current.title)}
                      </p>
                      <p className="mt-3 text-lg font-light leading-relaxed text-fg">{l(current.description)}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              }
            </div>
          </div>);

      }}
    </QueryState>);

}
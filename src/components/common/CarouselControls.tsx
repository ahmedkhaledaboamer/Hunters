import { useCallback, useEffect, useState } from 'react';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../shared/lib/cn';

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>;

/** Prev/next arrows + scroll progress line for Embla sliders. */
export function CarouselControls({ api, className }: {api: EmblaCarouselType | undefined;className?: string;}) {
  const { t } = useTranslation();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [progress, setProgress] = useState(0);

  const update = useCallback((emb: EmblaCarouselType) => {
    setCanPrev(emb.canScrollPrev());
    setCanNext(emb.canScrollNext());
    setProgress(Math.max(0, Math.min(1, emb.scrollProgress())));
  }, []);

  useEffect(() => {
    if (!api) return;
    update(api);
    api.on('select', update).on('reInit', update).on('scroll', update);
    return () => {
      api.off('select', update).off('reInit', update).off('scroll', update);
    };
  }, [api, update]);

  const btn =
  'inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg transition-[color,border-color,opacity] duration-150 hover:border-accent hover:text-accent-ink disabled:pointer-events-none disabled:opacity-30';

  return (
    <div className={cn('flex items-center gap-6', className)}>
      <div className="relative h-px flex-1 bg-line" aria-hidden>
        <motion.div className="absolute inset-y-0 start-0 w-full origin-left bg-accent rtl:origin-right" style={{ scaleX: Math.max(progress, 0.08) }} />
      </div>
      <div className="flex gap-2">
        <button type="button" className={btn} onClick={() => api?.scrollPrev()} disabled={!canPrev} aria-label={t('common.previous')}>
          <ChevronLeft className="size-5 rtl:-scale-x-100" aria-hidden />
        </button>
        <button type="button" className={btn} onClick={() => api?.scrollNext()} disabled={!canNext} aria-label={t('common.next')}>
          <ChevronRight className="size-5 rtl:-scale-x-100" aria-hidden />
        </button>
      </div>
    </div>);

}
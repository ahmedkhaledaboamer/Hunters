import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslation } from 'react-i18next';
import { useGetNewsQuery } from '../../features/news/newsApi';
import { useIsRtl, useL } from '../../features/preferences/usePreferences';
import { QueryState } from '../../shared/ui/QueryState';
import { Skeleton } from '../../shared/ui/Skeleton';
import { Badge } from '../../shared/ui/Badge';
import { buttonClass } from '../../shared/ui/buttonClass';
import { CarouselControls } from '../common/CarouselControls';
import { NewsMeta } from './NewsCard';
import { photoSrcSet } from '../../shared/lib/image';

export function FeaturedNewsSlider() {
  const { t } = useTranslation();
  const l = useL();
  const rtl = useIsRtl();
  const query = useGetNewsQuery({ featured: true, pageSize: 6 });
  const [ref, api] = useEmblaCarousel({ align: 'start', direction: rtl ? 'rtl' : 'ltr' });
  const items = query.data?.items ?? [];

  return (
    <QueryState
      isLoading={query.isLoading}
      isError={query.isError}
      onRetry={query.refetch}
      isEmpty={!items.length}
      skeleton={<Skeleton className="aspect-[21/9] min-h-[360px]" />}>
      
      {() =>
      <div>
          <div ref={ref} className="overflow-hidden rounded-3xl" dir={rtl ? 'rtl' : 'ltr'}>
            <div className="flex touch-pan-y">
              {items.map((a, i) =>
            <article key={a.slug} className="relative min-w-0 flex-[0_0_100%]" aria-roledescription="slide" aria-label={`${i + 1} / ${items.length}`}>
                  <div className="relative min-h-[460px] overflow-hidden rounded-3xl border border-line bg-ink-900 md:aspect-[21/9] md:min-h-0">
                    <img src={a.image} srcSet={photoSrcSet(a.image)} sizes="(min-width: 1024px) 60vw, 100vw" alt="" loading={i === 0 ? 'eager' : 'lazy'} className="absolute inset-0 size-full object-cover" />
                    <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/60 to-ink-950/10 md:bg-linear-to-r md:rtl:bg-linear-to-l" />
                    <div className="relative flex h-full min-h-[460px] max-w-2xl flex-col justify-end p-8 text-white md:min-h-0 md:p-14">
                      <div className="flex items-center gap-3">
                        <Badge tone="solid">{t('news.featured')}</Badge>
                        <span className="text-xs text-white/70">{t(`news.categories.${a.category}`)}</span>
                      </div>
                      <h2 className="mt-5 text-3xl font-light leading-tight md:text-5xl">{l(a.title)}</h2>
                      <p className="mt-4 text-white/75 md:text-lg">{l(a.excerpt)}</p>
                      <NewsMeta article={a} className="mt-5 text-white/60" />
                      <Link to={`/news/${a.slug}`} className={buttonClass('primary', 'md', 'mt-8 self-start')}>
                        {t('common.readMore')}
                      </Link>
                    </div>
                  </div>
                </article>
            )}
            </div>
          </div>
          <CarouselControls api={api} className="mt-8" />
        </div>
      }
    </QueryState>);

}
import useEmblaCarousel from 'embla-carousel-react';
import { useGetIndustriesQuery } from '../../features/services/servicesApi';
import { useIsRtl } from '../../features/preferences/usePreferences';
import { QueryState } from '../../shared/ui/QueryState';
import { CardSkeletonGrid } from '../../shared/ui/Skeleton';
import { CarouselControls } from '../common/CarouselControls';
import { IndustryCard } from './IndustryCard';

/** Horizontal drag slider with snap points. */
export function IndustriesSlider() {
  const rtl = useIsRtl();
  const query = useGetIndustriesQuery();
  const [ref, api] = useEmblaCarousel({ align: 'start', direction: rtl ? 'rtl' : 'ltr', containScroll: 'trimSnaps', dragFree: false });

  return (
    <QueryState
      isLoading={query.isLoading}
      isError={query.isError}
      onRetry={query.refetch}
      skeleton={<CardSkeletonGrid count={4} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" itemClassName="aspect-[4/5] h-auto" />}>
      
      {() =>
      <div>
          <div ref={ref} className="overflow-hidden" dir={rtl ? 'rtl' : 'ltr'}>
            <ul className="-ms-5 flex touch-pan-y">
              {(query.data ?? []).map((industry) =>
            <li key={industry.slug} className="min-w-0 flex-[0_0_82%] ps-5 sm:flex-[0_0_48%] lg:flex-[0_0_32%] xl:flex-[0_0_25%]">
                  <IndustryCard industry={industry} />
                </li>
            )}
            </ul>
          </div>
          <CarouselControls api={api} className="mt-10" />
        </div>
      }
    </QueryState>);

}
import { useTranslation } from 'react-i18next';
import { IndustryCard } from '../../components/industries/IndustryCard';
import { useGetIndustriesQuery } from '../../features/services/servicesApi';
import { useSeo } from '../../shared/lib/useSeo';
import { PageHero } from '../../shared/ui/PageHero';
import { Section } from '../../shared/ui/Section';
import { QueryState } from '../../shared/ui/QueryState';
import { CardSkeletonGrid } from '../../shared/ui/Skeleton';
import { RevealGroup, RevealItem } from '../../shared/motion/Reveal';
import { cn } from '../../shared/lib/cn';

/** Positions of the wide (two-column) cards on desktop. */
const WIDE = new Set([0, 5, 7]);

export function IndustriesPage() {
  const { t } = useTranslation();
  useSeo(t('nav.industries'), t('industries.lead'));
  const query = useGetIndustriesQuery();

  return (
    <>
      <PageHero eyebrow="INDUSTRIES WE SERVE" title={t('industries.title')} lead={t('industries.lead')} />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <QueryState
          isLoading={query.isLoading}
          isError={query.isError}
          onRetry={query.refetch}
          skeleton={<CardSkeletonGrid count={8} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" itemClassName="h-[440px]" />}>
          
          {() =>
          // Every card is the same height. One wide card per desktop row (start, end, middle) makes 9 cards fill
          // three rows of four exactly; on two columns the odd last card spans the full width.
          <RevealGroup className="grid auto-rows-[440px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {(query.data ?? []).map((industry, i, all) =>
            <RevealItem
              key={industry.slug}
              className={cn('h-full', WIDE.has(i) && 'lg:col-span-2', i === all.length - 1 && all.length % 2 === 1 && 'sm:col-span-2 lg:col-span-1')}>
                  <IndustryCard industry={industry} className="aspect-auto h-full" />
                </RevealItem>
            )}
            </RevealGroup>
          }
        </QueryState>
      </Section>
    </>);

}
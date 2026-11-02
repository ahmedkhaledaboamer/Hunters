import { useTranslation } from 'react-i18next';
import { IndustryCard } from '../../components/industries/IndustryCard';
import { useGetIndustriesQuery } from '../../features/services/servicesApi';
import { useSeo } from '../../shared/lib/useSeo';
import { PageHero } from '../../shared/ui/PageHero';
import { Section } from '../../shared/ui/Section';
import { QueryState } from '../../shared/ui/QueryState';
import { CardSkeletonGrid } from '../../shared/ui/Skeleton';
import { RevealGroup, RevealItem } from '../../shared/motion/Reveal';

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
          skeleton={<CardSkeletonGrid count={8} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" itemClassName="aspect-[4/5] h-auto" />}>
          
          {() =>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {(query.data ?? []).map((industry, i) =>
            <RevealItem key={industry.slug} className={i === 0 || i === 5 ? 'lg:col-span-2' : ''}>
                  <IndustryCard industry={industry} className={i === 0 || i === 5 ? 'lg:aspect-auto lg:h-full lg:min-h-[420px]' : ''} />
                </RevealItem>
            )}
            </RevealGroup>
          }
        </QueryState>
      </Section>
    </>);

}
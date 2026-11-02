import { useTranslation } from 'react-i18next';
import { FrameworkStory } from '../../components/framework/FrameworkStory';
import { PillarGrid } from '../../components/common/PillarGrid';
import { useGetPillarsQuery } from '../../features/content/contentApi';
import { useSeo } from '../../shared/lib/useSeo';
import { PageHero } from '../../shared/ui/PageHero';
import { Section } from '../../shared/ui/Section';
import { SectionHeading } from '../../shared/ui/SectionHeading';
import { QueryState } from '../../shared/ui/QueryState';
import { CardSkeletonGrid } from '../../shared/ui/Skeleton';
import { Reveal } from '../../shared/motion/Reveal';

export function HowWeWorkPage() {
  const { t } = useTranslation();
  useSeo(t('nav.howWeWork'), t('howWeWork.lead'));
  const engagement = useGetPillarsQuery('engagement');
  const values = useGetPillarsQuery('value');

  return (
    <>
      <PageHero eyebrow="HOW WE WORK" title={t('howWeWork.title')} lead={t('howWeWork.lead')} />

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <FrameworkStory />
      </Section>

      <Section glow="start" className="border-t border-line" aria-labelledby="engagement-title">
        <SectionHeading id="engagement-title" eyebrow="OUR ENGAGEMENT MODELS" index="14" title={t('howWeWork.engagementTitle')} description={t('howWeWork.engagementLead')} />
        <div className="mt-14">
          <QueryState
            isLoading={engagement.isLoading}
            isError={engagement.isError}
            onRetry={engagement.refetch}
            skeleton={<CardSkeletonGrid count={6} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" itemClassName="h-56" />}>
            
            {() => <PillarGrid items={engagement.data ?? []} numbered />}
          </QueryState>
        </div>
        <Reveal>
          <p className="mt-10 max-w-3xl border-s-2 border-accent ps-5 text-sm leading-relaxed text-muted">{t('howWeWork.engagementNote')}</p>
        </Reveal>
      </Section>

      <Section className="border-t border-line" aria-labelledby="value-title">
        <SectionHeading id="value-title" eyebrow="OUR VALUE PROPOSITION" index="08" title={t('howWeWork.valueTitle')} description={t('howWeWork.valueLead')} />
        <div className="mt-14">
          <QueryState
            isLoading={values.isLoading}
            isError={values.isError}
            onRetry={values.refetch}
            skeleton={<CardSkeletonGrid count={8} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" itemClassName="h-56" />}>
            
            {() => <PillarGrid items={values.data ?? []} columns={4} />}
          </QueryState>
        </div>
        <Reveal>
          <p className="mt-10 max-w-3xl border-s-2 border-accent ps-5 text-sm leading-relaxed text-muted">{t('howWeWork.valueNote')}</p>
        </Reveal>
      </Section>
    </>);

}
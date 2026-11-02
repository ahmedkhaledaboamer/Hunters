import { useTranslation } from 'react-i18next';
import { BusinessModelStack } from '../../components/model/BusinessModelStack';
import { DashboardMock } from '../../components/solutions/DashboardMock';
import { ChatMock } from '../../components/solutions/ChatMock';
import { StatementList } from '../../components/common/StatementList';
import { useGetStatementsQuery } from '../../features/content/contentApi';
import { useSeo } from '../../shared/lib/useSeo';
import { PageHero } from '../../shared/ui/PageHero';
import { Section } from '../../shared/ui/Section';
import { SectionHeading } from '../../shared/ui/SectionHeading';
import { QueryState } from '../../shared/ui/QueryState';
import { Skeleton } from '../../shared/ui/Skeleton';
import { Reveal } from '../../shared/motion/Reveal';
import { buttonClass } from '../../shared/ui/buttonClass';

export function SolutionsPage() {
  const { t } = useTranslation();
  useSeo(t('nav.solutions'), t('solutions.lead'));
  const executive = useGetStatementsQuery('executive');
  const customerAi = useGetStatementsQuery('customerAi');

  const anchors = [
  { id: 'model', label: t('solutions.nav.model') },
  { id: 'executive', label: t('solutions.nav.executive') },
  { id: 'customer-ai', label: t('solutions.nav.cx') }];


  return (
    <>
      <PageHero eyebrow="SOLUTIONS" title={t('solutions.title')} lead={t('solutions.lead')}>
        <ul className="flex flex-wrap gap-2">
          {anchors.map((a) =>
          <li key={a.id}>
              <a href={`#${a.id}`} className={buttonClass('ghost', 'sm')}>
                {a.label}
              </a>
            </li>
          )}
        </ul>
      </PageHero>

      <Section id="model" aria-labelledby="model-title">
        <SectionHeading id="model-title" eyebrow="THE INTELLIGENT BUSINESS MODEL" index="09" title={t('home.modelTitle')} description={t('home.modelBody')} />
        <div className="mt-16">
          <BusinessModelStack detailed />
        </div>
        <Reveal>
          <p className="mt-12 max-w-3xl border-s-2 border-accent ps-5 text-sm leading-relaxed text-muted">{t('home.modelNote')}</p>
        </Reveal>
      </Section>

      <Section id="executive" glow="start" className="border-t border-line" aria-labelledby="exec-title">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading id="exec-title" eyebrow="EXECUTIVE INTELLIGENCE" index="10" title={t('solutions.executive.title')} />
            <p className="mt-6 text-lg text-muted">{t('solutions.executive.lead')}</p>
            <QueryState isLoading={executive.isLoading} isError={executive.isError} onRetry={executive.refetch} skeleton={<Skeleton className="mt-8 h-80" />}>
              {() => <StatementList items={executive.data ?? []} className="mt-8" />}
            </QueryState>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <DashboardMock />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-xl font-light leading-relaxed text-fg">{t('solutions.executive.goal')}</p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="customer-ai" glow="end" className="border-t border-line" aria-labelledby="cx-title">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="order-2 lg:order-1 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <ChatMock />
            </Reveal>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading id="cx-title" eyebrow="BEYOND AUTOMATION" index="11" title={t('solutions.cx.title')} />
            <p className="mt-6 text-lg text-muted">{t('solutions.cx.lead')}</p>
            <QueryState isLoading={customerAi.isLoading} isError={customerAi.isError} onRetry={customerAi.refetch} skeleton={<Skeleton className="mt-8 h-80" />}>
              {() => <StatementList items={customerAi.data ?? []} className="mt-8" />}
            </QueryState>
            <Reveal>
              <p className="mt-8 border-s-2 border-accent ps-5 text-sm leading-relaxed text-muted">{t('solutions.cx.note')}</p>
            </Reveal>
          </div>
        </div>
      </Section>
    </>);

}
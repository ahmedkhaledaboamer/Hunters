import { useTranslation } from 'react-i18next';
import { Check, ShieldCheck } from 'lucide-react';
import { useGetStatementsQuery } from '../../features/content/contentApi';
import { useL } from '../../features/preferences/usePreferences';
import { useSeo } from '../../shared/lib/useSeo';
import { PageHero } from '../../shared/ui/PageHero';
import { Section } from '../../shared/ui/Section';
import { QueryState } from '../../shared/ui/QueryState';
import { CardSkeletonGrid } from '../../shared/ui/Skeleton';
import { Reveal, RevealGroup, RevealItem } from '../../shared/motion/Reveal';

export function GovernancePage() {
  const { t } = useTranslation();
  const l = useL();
  useSeo(t('nav.governance'), t('governance.lead'));
  const query = useGetStatementsQuery('governance');

  return (
    <>
      <PageHero eyebrow="SECURITY & TRUST" title={t('governance.title')} lead={t('governance.lead')} />
      <Section className="pt-0 md:pt-0 lg:pt-0" aria-labelledby="practices-title">
        <h2 id="practices-title" className="text-lg text-muted">
          {t('governance.practicesLead')}
        </h2>
        <div className="mt-10">
          <QueryState
            isLoading={query.isLoading}
            isError={query.isError}
            onRetry={query.refetch}
            skeleton={<CardSkeletonGrid count={10} className="grid gap-x-12 gap-y-3 md:grid-cols-2" itemClassName="h-14" />}>
            
            {() =>
            // Modern checklist: two columns of points, each with a lime check badge and a hairline divider.
            <RevealGroup as="ul" className="grid gap-x-12 md:grid-cols-2" step={0.04}>
                {(query.data ?? []).map((item) =>
              <RevealItem as="li" key={item.en} className="group flex items-start gap-4 border-b border-line py-5">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-lime-500/15 text-accent-ink ring-1 ring-lime-500/30 transition-colors duration-200 group-hover:bg-lime-500 group-hover:text-ink-950">
                      <Check className="size-4" strokeWidth={2.5} aria-hidden />
                    </span>
                    <p className="text-lg leading-relaxed text-fg/90">{l(item)}</p>
                  </RevealItem>
              )}
              </RevealGroup>
            }
          </QueryState>
        </div>
        <Reveal>
          <div className="mt-16 grid gap-6 rounded-3xl border border-line p-8 md:grid-cols-[auto_1fr] md:items-center md:p-12">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-lime-500 text-ink-950">
              <ShieldCheck className="size-6" aria-hidden />
            </span>
            <p className="text-xl font-light leading-relaxed text-fg md:text-2xl">{t('governance.closing')}</p>
          </div>
        </Reveal>
      </Section>
    </>);

}
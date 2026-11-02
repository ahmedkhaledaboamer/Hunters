import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
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
      <PageHero eyebrow="GOVERNANCE & TRUST" title={t('governance.title')} lead={t('governance.lead')} />
      <Section className="pt-0 md:pt-0 lg:pt-0" aria-labelledby="practices-title">
        <h2 id="practices-title" className="text-lg text-muted">
          {t('governance.practicesLead')}
        </h2>
        <div className="mt-10">
          <QueryState
            isLoading={query.isLoading}
            isError={query.isError}
            onRetry={query.refetch}
            skeleton={<CardSkeletonGrid count={10} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" itemClassName="h-52" />}>
            
            {() =>
            <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" step={0.04}>
                {(query.data ?? []).map((item, i) =>
              <RevealItem as="li" key={item.en} className="glass relative flex min-h-52 flex-col overflow-hidden rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl border border-line text-accent-ink">
                        <ShieldCheck className="size-5" strokeWidth={1.4} aria-hidden />
                      </span>
                      <span dir="ltr" className="font-latin text-xs tabular-nums text-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="mt-auto pt-8 leading-relaxed text-fg/90">{l(item)}</p>
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
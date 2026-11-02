import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { ServiceCard } from '../../components/services/ServiceCard';
import { PartnerLogo } from '../../components/partners/PartnerLogo';
import { useGetPartnerQuery } from '../../features/partners/partnersApi';
import { useGetServicesQuery } from '../../features/services/servicesApi';
import { useL } from '../../features/preferences/usePreferences';
import { useSeo } from '../../shared/lib/useSeo';
import { Container } from '../../shared/ui/Container';
import { Section } from '../../shared/ui/Section';
import { Badge } from '../../shared/ui/Badge';
import { Button } from '../../shared/ui/Button';
import { Skeleton } from '../../shared/ui/Skeleton';
import { EmptyState } from '../../shared/ui/StateViews';
import { Eyebrow } from '../../shared/ui/SectionHeading';

export function PartnerDetailPage() {
  const { slug = '' } = useParams();
  const { t } = useTranslation();
  const l = useL();
  const { data: p, isLoading, isError } = useGetPartnerQuery(slug);
  const { data: services = [] } = useGetServicesQuery();
  useSeo(p?.name ?? t('nav.partners'), p ? l(p.description) : t('partners.lead'));

  if (isLoading) return <Container className="pt-40"><Skeleton className="h-80" /></Container>;
  if (isError || !p)
  return (
    <Container className="py-40 text-center">
        <EmptyState />
        <Button to="/partners" variant="ghost" className="mt-8" arrow>{t('nav.partners')}</Button>
      </Container>);


  return (
    <>
      <Container className="pb-16 pt-36 md:pt-44">
        <Eyebrow>STRATEGIC PARTNERSHIPS</Eyebrow>
        <h1 className="mt-8 font-normal text-fg [&_svg]:size-14 [&_span]:text-4xl"><PartnerLogo monogram={p.monogram} name={p.name} /></h1>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge tone="accent">{t(`partners.categories.${p.category}`)}</Badge>
          <Badge tone="outline">{l(p.type)}</Badge>
        </div>
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <section>
            <h2 className="text-2xl font-light">{t('partners.about')}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{l(p.about)}</p>
          </section>
          <section>
            <h2 className="text-2xl font-light">{t('partners.joint')}</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {p.capabilities.map((c) =>
              <li key={c.en} className="flex items-center gap-3 py-4"><Check className="size-4 text-accent-ink" aria-hidden />{l(c)}</li>
              )}
            </ul>
          </section>
        </div>
        <p className="mt-10 text-xs text-muted">{t('partners.note')}</p>
      </Container>
      <Section className="border-t border-line">
        <h2 className="text-3xl font-light">{t('partners.related')}</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.filter((s) => p.services.includes(s.slug)).map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </Section>
    </>);

}
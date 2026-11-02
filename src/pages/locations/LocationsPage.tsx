import { useTranslation } from 'react-i18next';
import { Clock, MapPin, Navigation } from 'lucide-react';
import { RegionMap } from '../../components/location/RegionMap';
import { useGetLocationQuery } from '../../features/content/contentApi';
import { useL } from '../../features/preferences/usePreferences';
import { useSeo } from '../../shared/lib/useSeo';
import { PageHero } from '../../shared/ui/PageHero';
import { Section } from '../../shared/ui/Section';
import { SectionHeading } from '../../shared/ui/SectionHeading';
import { QueryState } from '../../shared/ui/QueryState';
import { Skeleton } from '../../shared/ui/Skeleton';
import { buttonClass } from '../../shared/ui/buttonClass';
import { RevealGroup, RevealItem } from '../../shared/motion/Reveal';
import { photoSrcSet } from '../../shared/lib/image';

export function LocationsPage() {
  const { t } = useTranslation();
  const l = useL();
  useSeo(t('nav.locations'), t('locations.lead'));
  const query = useGetLocationQuery();
  const advantages = t('locations.advantages', { returnObjects: true }) as {title: string;body: string;}[];

  return (
    <>
      <PageHero eyebrow="STRATEGIC LOCATION" title={t('locations.title')} lead={t('locations.lead')} />
      <QueryState isLoading={query.isLoading} isError={query.isError} onRetry={query.refetch} skeleton={<Skeleton className="mx-auto h-96 max-w-6xl" />}>
        {() => {
          const data = query.data;
          if (!data) return null;
          return (
            <>
              <Section className="pt-0 md:pt-0 lg:pt-0" glow="end">
                <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.6fr]">
                  <SectionHeading eyebrow="REGIONAL REACH" title={t('locations.mapTitle')} description={t('locations.mapBody')} />
                  <RegionMap hub={{ lon: data.office.lon, lat: data.office.lat, name: l(data.office.city) }} markets={data.markets} />
                </div>
              </Section>
              <Section className="border-t border-line">
                <RevealGroup as="ol" className="grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
                  {advantages.map((a, i) =>
                  <RevealItem as="li" key={a.title} className="border-b border-line py-8">
                      <span dir="ltr" className="font-latin text-xs text-accent-ink">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="mt-4 text-xl font-light">{a.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{a.body}</p>
                    </RevealItem>
                  )}
                </RevealGroup>
              </Section>
              <Section className="border-t border-line">
                <div className="grid overflow-hidden rounded-3xl border border-line lg:grid-cols-2">
                  <div className="p-8 md:p-12">
                    <h2 className="text-3xl font-light">{t('locations.officeTitle')}</h2>
                    <dl className="mt-8 space-y-6">
                      <div className="flex gap-3"><MapPin className="mt-1 size-5 text-accent-ink" aria-hidden /><div><dt className="text-xs text-muted">{t('locations.address')}</dt><dd className="mt-1">{l(data.office.address)}</dd></div></div>
                      <div className="flex gap-3"><Clock className="mt-1 size-5 text-accent-ink" aria-hidden /><div><dt className="text-xs text-muted">{t('locations.hours')}</dt><dd className="mt-1">{l(data.office.hours)}</dd></div></div>
                    </dl>
                    <a href={data.office.mapsUrl} target="_blank" rel="noreferrer" className={buttonClass('primary', 'md', 'mt-10 gap-2')}>
                      <Navigation className="size-4" aria-hidden />{t('common.getDirections')}
                    </a>
                  </div>
                  <div className="relative min-h-72 bg-ink-900">
                    <img src={data.office.image} srcSet={photoSrcSet(data.office.image)} sizes="(min-width: 1024px) 50vw, 100vw" alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-70" />
                    <span className="absolute bottom-4 start-4 rounded-full bg-ink-950/70 px-3 py-1.5 text-xs text-white backdrop-blur">{t('locations.mapPlaceholder')}</span>
                  </div>
                </div>
              </Section>
            </>);

        }}
      </QueryState>
    </>);

}
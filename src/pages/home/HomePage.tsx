import { useTranslation } from 'react-i18next';
import { HeroSlider } from '../../components/home/HeroSlider';
import { ServiceShowcase } from '../../components/services/ServiceShowcase';
import { BusinessModelStack } from '../../components/model/BusinessModelStack';
import { FrameworkStepper } from '../../components/framework/FrameworkStepper';
import { IndustriesSlider } from '../../components/industries/IndustriesSlider';
import { WhyBento } from '../../components/why/WhyBento';
import { PartnersMarquee } from '../../components/partners/PartnersMarquee';
import { NewsCard } from '../../components/news/NewsCard';
import { RegionMap } from '../../components/location/RegionMap';
import { useGetServicesQuery } from '../../features/services/servicesApi';
import { useGetNewsQuery } from '../../features/news/newsApi';
import { useGetLocationQuery } from '../../features/content/contentApi';
import { useL } from '../../features/preferences/usePreferences';
import { useSeo } from '../../shared/lib/useSeo';
import { Section } from '../../shared/ui/Section';
import { Eyebrow, SectionHeading } from '../../shared/ui/SectionHeading';
import { Button } from '../../shared/ui/Button';
import { NodeLine } from '../../shared/ui/NodeLine';
import { QueryState } from '../../shared/ui/QueryState';
import { CardSkeletonGrid, Skeleton } from '../../shared/ui/Skeleton';
import { AnimatedCounter } from '../../shared/ui/AnimatedCounter';
import { Reveal, RevealGroup, RevealItem } from '../../shared/motion/Reveal';
import { SplitText } from '../../shared/motion/SplitText';
import { photoSrcSet } from '../../shared/lib/image';
import { Deferred } from '../../shared/ui/Deferred';

export function HomePage() {
  const { t } = useTranslation();
  useSeo(t('seo.home'), t('seo.homeDesc'));

  return (
    <>
      <HeroSlider />
      {/* Everything below the hero mounts after first paint (see Deferred). */}
      <Deferred>
      <WhoWeAre />
      <Expertise />

      <Section glow="end" aria-labelledby="model-title">
        <SectionHeading id="model-title" eyebrow="THE INTELLIGENT BUSINESS MODEL" index="09" title={t('home.modelTitle')} description={t('home.modelBody')} />
        <div className="mt-16">
          <BusinessModelStack />
        </div>
        <Reveal>
          <p className="mt-12 max-w-3xl border-s-2 border-accent ps-5 text-sm leading-relaxed text-muted">{t('home.modelNote')}</p>
        </Reveal>
      </Section>

      <Section className="border-y border-line bg-surface-2/40" aria-labelledby="framework-title">
        <SectionHeading
          id="framework-title"
          eyebrow="OUR DELIVERY FRAMEWORK"
          index="07"
          title={t('home.frameworkTitle')}
          description={t('home.frameworkBody')}
          action={
          <Button to="/how-we-work" variant="ghost" arrow>
              {t('home.frameworkCta')}
            </Button>
          } />
        
        <div className="mt-16">
          <FrameworkStepper />
        </div>
      </Section>

      <Section aria-labelledby="industries-title">
        <SectionHeading
          id="industries-title"
          eyebrow="INDUSTRIES WE SERVE"
          index="06"
          title={t('home.industriesTitle')}
          description={t('home.industriesBody')}
          action={
          <Button to="/industries" variant="ghost" arrow>
              {t('common.viewAll')}
            </Button>
          } />
        
        <div className="mt-14">
          <IndustriesSlider />
        </div>
      </Section>

      <Section glow="start" aria-labelledby="why-title">
        <SectionHeading id="why-title" eyebrow="WHY H HUNTERS" index="13" title={t('home.whyTitle')} description={t('home.whyBody')} />
        <div className="mt-14">
          <WhyBento />
        </div>
      </Section>

      <Section className="overflow-hidden" aria-labelledby="partners-title">
        <SectionHeading
          id="partners-title"
          eyebrow="STRATEGIC PARTNERSHIPS"
          title={t('home.partnersTitle')}
          action={
          <Button to="/partners" variant="ghost" arrow>
              {t('nav.partners')}
            </Button>
          } />
        
        {/* Always-dark photo panel (the dark class keeps text light in light mode too). */}
        <div className="dark relative mt-14 overflow-hidden rounded-3xl border border-line">
          <img
            src="/ee301a9f-03d5-4c3c-a2e6-ebdd895d3d68.webp" srcSet={photoSrcSet("/ee301a9f-03d5-4c3c-a2e6-ebdd895d3d68.webp")} sizes="100vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover opacity-55" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/90" />
          <div aria-hidden className="absolute -top-1/2 start-1/2 size-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(215_247_30/0.16),transparent)] rtl:translate-x-1/2" />
          <div aria-hidden className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
          <div className="relative py-12 md:py-16">
            <PartnersMarquee />
          </div>
        </div>
        <p className="mt-6 text-xs text-muted">{t('home.partnersNote')}</p>
      </Section>

      <LatestNews />
      <LocationTeaser />
      </Deferred>
    </>);

}

function WhoWeAre() {
  const { t } = useTranslation();
  const counters = [
  { value: 8, label: t('home.counters.expertise') },
  { value: 6, label: t('home.counters.phases') },
  { value: 9, label: t('home.counters.industries') },
  { value: 6, label: t('home.counters.layers') }];

  const body = t('about.who.body', { returnObjects: true }) as string[];

  return (
    <Section aria-labelledby="who-title">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading id="who-title" eyebrow="WHO WE ARE" index="01" title={t('home.whoTitle')} />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-fg/85 md:text-xl">{body[0]}</p>
            <blockquote className="mt-8 border-s-2 border-accent ps-5 text-xl font-extralight leading-snug text-fg md:text-2xl">
              “{t('home.philosophyTitle')}”
            </blockquote>
            <Button to="/about" variant="link" arrow className="mt-8">
              {t('home.whoCta')}
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative pb-16 sm:pe-20">
          <div className="group relative overflow-hidden rounded-3xl border border-line">
            <img
              src="/6e2472fd-9929-4b77-a155-2ecbbbacc28f.webp" srcSet={photoSrcSet("/6e2472fd-9929-4b77-a155-2ecbbbacc28f.webp")} sizes="(min-width: 1024px) 45vw, 100vw"
              alt=""
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-0 end-0 hidden w-[48%] overflow-hidden rounded-2xl border border-line-strong shadow-2xl ring-8 ring-bg sm:block">
            <img
              src="/56f04271-342f-4245-851b-e193276f52bc.webp" srcSet={photoSrcSet("/56f04271-342f-4245-851b-e193276f52bc.webp")} sizes="(min-width: 1024px) 22vw, 48vw"
              alt=""
              width={600}
              height={450}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover" />
          </div>
        </Reveal>
      </div>

      <RevealGroup className="mt-20 grid grid-cols-2 border-t border-line lg:grid-cols-4">
        {counters.map((c) =>
        <RevealItem key={c.label} className="border-b border-line py-8 pe-6 ps-6 odd:border-e odd:ps-0 lg:border-b-0 lg:border-e lg:ps-8 lg:odd:ps-8 lg:first:ps-0 lg:last:border-e-0">
            <AnimatedCounter value={c.value} className="block font-latin text-6xl font-extralight tabular-nums text-accent-ink md:text-7xl" />
            <span className="mt-3 block text-sm text-muted">{c.label}</span>
          </RevealItem>
        )}
      </RevealGroup>
    </Section>);

}

function Expertise() {
  const { t } = useTranslation();
  const query = useGetServicesQuery();
  return (
    <Section grid aria-labelledby="expertise-title">
      <SectionHeading
        id="expertise-title"
        eyebrow="CORE EXPERTISE"
        index="05"
        title={t('home.expertiseTitle')}
        description={t('home.expertiseBody')}
        action={
        <Button to="/services" variant="ghost" arrow>
            {t('nav.allServices')}
          </Button>
        } />
      
      <div className="mt-14">
        <QueryState
          isLoading={query.isLoading}
          isError={query.isError}
          onRetry={query.refetch}
          skeleton={<Skeleton className="h-[640px] rounded-3xl" />}>
          
          {() =>
          <Reveal>
              <ServiceShowcase services={query.data ?? []} />
            </Reveal>
          }
        </QueryState>
      </div>
    </Section>);

}

function LatestNews() {
  const { t } = useTranslation();
  const query = useGetNewsQuery({ page: 1, pageSize: 3 });
  return (
    <Section className="border-t border-line" aria-labelledby="news-title">
      <SectionHeading
        id="news-title"
        eyebrow="NEWS & INSIGHTS"
        title={t('home.newsTitle')}
        action={
        <Button to="/news" variant="ghost" arrow>
            {t('common.viewAll')}
          </Button>
        } />
      
      <div className="mt-14">
        <QueryState
          isLoading={query.isLoading}
          isError={query.isError}
          onRetry={query.refetch}
          isEmpty={!query.data?.items.length}
          skeleton={<CardSkeletonGrid count={3} className="grid gap-8 md:grid-cols-3" itemClassName="h-96" />}>
          
          {() =>
          <RevealGroup className="grid gap-x-8 gap-y-14 md:grid-cols-3">
              {(query.data?.items ?? []).map((a) =>
            <RevealItem key={a.slug}>
                  <NewsCard article={a} />
                </RevealItem>
            )}
            </RevealGroup>
          }
        </QueryState>
      </div>
    </Section>);

}

function LocationTeaser() {
  const { t } = useTranslation();
  const l = useL();
  const query = useGetLocationQuery();
  return (
    <Section glow="end" aria-labelledby="location-title">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Eyebrow>STRATEGIC LOCATION</Eyebrow>
          <div id="location-title">
            <SplitText text={t('home.locationTitle')} className="mt-5 text-headline font-light tracking-tight rtl:leading-[1.3] rtl:tracking-normal" />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{t('home.locationBody')}</p>
            <NodeLine className="mt-8 max-w-xs" />
            <Button to="/locations" variant="ghost" arrow className="mt-8">
              {t('home.locationCta')}
            </Button>
          </Reveal>
        </div>
        {query.isLoading ?
        <Skeleton className="aspect-[680/440]" /> :
        query.data ?
        <Reveal>
            <RegionMap hub={{ lon: query.data.office.lon, lat: query.data.office.lat, name: l(query.data.office.city) }} markets={query.data.markets} />
          </Reveal> :
        null}
      </div>
    </Section>);

}
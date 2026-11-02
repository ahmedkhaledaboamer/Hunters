import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { CalendarDays } from 'lucide-react';
import { serviceFaqs } from '../../data/company';
import { ServiceCard } from '../../components/services/ServiceCard';
import { IndustryCard } from '../../components/industries/IndustryCard';
import { FrameworkLine } from '../../components/framework/FrameworkLine';
import { CarouselControls } from '../../components/common/CarouselControls';
import { useGetIndustriesQuery, useGetServiceQuery, useGetServicesQuery } from '../../features/services/servicesApi';
import { prefillService } from '../../features/booking/bookingSlice';
import { useIsRtl, useL } from '../../features/preferences/usePreferences';
import { useAppDispatch } from '../../app/hooks';
import { icons } from '../../shared/lib/icons';
import { useSeo } from '../../shared/lib/useSeo';
import { Container } from '../../shared/ui/Container';
import { Section } from '../../shared/ui/Section';
import { Eyebrow, SectionHeading } from '../../shared/ui/SectionHeading';
import { Button } from '../../shared/ui/Button';
import { Accordion } from '../../shared/ui/Accordion';
import { NodeLine } from '../../shared/ui/NodeLine';
import { Skeleton } from '../../shared/ui/Skeleton';
import { EmptyState } from '../../shared/ui/StateViews';
import { RevealGroup, RevealItem, Reveal } from '../../shared/motion/Reveal';
import { EASE_OUT } from '../../shared/motion/variants';
import { photoSrcSet } from '../../shared/lib/image';

export function ServiceDetailPage() {
  const { slug = '' } = useParams();
  const { t } = useTranslation();
  const l = useL();
  const rtl = useIsRtl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: service, isLoading, isError } = useGetServiceQuery(slug);
  const { data: allServices = [] } = useGetServicesQuery();
  const { data: industries = [] } = useGetIndustriesQuery();
  const [sliderRef, sliderApi] = useEmblaCarousel({ align: 'start', direction: rtl ? 'rtl' : 'ltr' });
  useSeo(service ? l(service.title) : t('nav.services'), service ? l(service.summary) : t('services.lead'), { image: service?.image });

  if (isLoading) {
    return (
      <Container className="pt-40">
        <Skeleton className="h-14 w-14" />
        <Skeleton className="mt-8 h-20 max-w-3xl" />
        <Skeleton className="mt-6 h-6 max-w-xl" />
        <Skeleton className="mt-16 h-96" />
      </Container>);

  }

  if (isError || !service) {
    return (
      <Container className="py-40">
        <EmptyState title={t('services.notFound')} />
        <div className="mt-8 text-center">
          <Button to="/services" variant="ghost" arrow>
            {t('nav.allServices')}
          </Button>
        </div>
      </Container>);

  }

  const Icon = icons[service.icon];
  const related = [
  ...allServices.filter((s) => service.related.includes(s.slug)),
  ...allServices.filter((s) => !service.related.includes(s.slug) && s.slug !== service.slug)];

  const relatedIndustries = industries.filter((i) => service.industries.includes(i.slug));

  const book = () => {
    dispatch(prefillService(service.slug));
    navigate('/book-consultation');
  };

  return (
    <>
      <header className="relative overflow-hidden pb-16 pt-36 md:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
        <div aria-hidden className="pointer-events-none absolute -top-40 end-0 size-[720px] rounded-full glow-radial" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
          <Eyebrow index={String(service.index).padStart(2, '0')}>CORE EXPERTISE</Eyebrow>
          <motion.div
            layoutId={`service-icon-${service.slug}`}
            className="mt-10 inline-flex size-20 items-center justify-center rounded-3xl border border-line bg-fg/[0.03] text-accent-ink">
            
            <Icon className="size-9" strokeWidth={1.2} aria-hidden />
          </motion.div>
          <motion.h1
            layoutId={`service-title-${service.slug}`}
            className="mt-8 max-w-5xl text-headline font-extralight tracking-tight text-fg rtl:font-light rtl:leading-[1.25] rtl:tracking-normal">
            
            {l(service.title)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15, ease: EASE_OUT }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            
            {l(service.summary)}
          </motion.p>
          </div>

          {/* Same image as the service's preview on the home page. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
            className="dark relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
            
            <img src={service.image} srcSet={photoSrcSet(service.image)} sizes="(min-width: 1024px) 45vw, 100vw" alt="" width={1200} height={900} decoding="async" className="size-full object-cover" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span dir="ltr" className="absolute bottom-5 end-6 font-latin text-xs tabular-nums text-white/70">
              <span className="text-lime-500">{String(service.index).padStart(2, '0')}</span> / {String(allServices.length || 8).padStart(2, '0')}
            </span>
          </motion.div>
          </div>
          <NodeLine className="mt-16" />
        </Container>
      </header>

      <Container className="grid gap-16 pb-24 lg:grid-cols-[1fr_340px] lg:gap-20">
        <div className="min-w-0">
          <section aria-labelledby="capabilities-title">
            <h2 id="capabilities-title" className="text-3xl font-light">
              {t('services.capabilities')}
            </h2>
            <RevealGroup as="ul" className="mt-8 grid gap-3 sm:grid-cols-2" step={0.04}>
              {service.capabilities.map((c) =>
              <RevealItem as="li" key={c.en} className="glass flex items-start gap-4 rounded-2xl p-5">
                  <AnimatedCheck />
                  <span className="text-[15px] leading-relaxed text-fg/90">{l(c)}</span>
                </RevealItem>
              )}
            </RevealGroup>
            {service.note &&
            <Reveal>
                <p className="mt-8 border-s-2 border-accent ps-5 leading-relaxed text-muted">{l(service.note)}</p>
              </Reveal>
            }
          </section>

          <section aria-labelledby="deliver-title" className="mt-24">
            <h2 id="deliver-title" className="text-3xl font-light">
              {t('services.howWeDeliver')}
            </h2>
            <p className="mt-3 max-w-2xl text-muted">{t('services.howWeDeliverBody')}</p>
            <div className="mt-10">
              <FrameworkLine vertical />
            </div>
          </section>

          {relatedIndustries.length > 0 &&
          <section aria-labelledby="industries-title" className="mt-24">
              <h2 id="industries-title" className="text-3xl font-light">
                {t('services.relatedIndustries')}
              </h2>
              <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-3">
                {relatedIndustries.map((i) =>
              <RevealItem key={i.slug}>
                    <IndustryCard industry={i} />
                  </RevealItem>
              )}
              </RevealGroup>
            </section>
          }

          <section aria-labelledby="faq-title" className="mt-24">
            <h2 id="faq-title" className="text-3xl font-light">
              {t('services.faq')}
            </h2>
            <Accordion className="mt-8" items={serviceFaqs.map((f) => ({ id: f.id, title: l(f.question), content: l(f.answer) }))} />
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass relative overflow-hidden rounded-3xl p-7">
            <div aria-hidden className="pointer-events-none absolute -top-24 end-0 size-64 rounded-full glow-radial" />
            <CalendarDays className="relative size-6 text-accent-ink" aria-hidden />
            <h2 className="relative mt-6 text-2xl font-light leading-snug">{t('services.ctaTitle')}</h2>
            <p className="relative mt-3 text-sm leading-relaxed text-muted">{t('services.ctaBody')}</p>
            <p className="relative mt-5 rounded-xl border border-line px-4 py-3 text-sm text-fg">{l(service.title)}</p>
            <Button onClick={book} className="relative mt-6 w-full" size="lg" arrow>
              {t('nav.book')}
            </Button>
          </div>
        </aside>
      </Container>

      <Section className="border-t border-line" aria-labelledby="related-title">
        <SectionHeading id="related-title" eyebrow="RELATED SERVICES" title={t('services.relatedServices')} />
        <div ref={sliderRef} className="mt-12 overflow-hidden" dir={rtl ? 'rtl' : 'ltr'}>
          <ul className="-ms-4 flex touch-pan-y">
            {related.map((s) =>
            <li key={s.slug} className="min-w-0 flex-[0_0_85%] ps-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                <ServiceCard service={s} />
              </li>
            )}
          </ul>
        </div>
        <CarouselControls api={sliderApi} className="mt-8" />
      </Section>
    </>);

}

function AnimatedCheck() {
  return (
    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-lime-500/15 ring-1 ring-lime-500/40">
      <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden>
        <motion.path
          d="M5 12.5l4.5 4.5L19 7.5"
          fill="none"
          className="stroke-accent"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.15, ease: EASE_OUT }} />
        
      </svg>
    </span>);

}
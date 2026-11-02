import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Check, CircleDot } from 'lucide-react';
import { ServiceCard } from '../../components/services/ServiceCard';
import { useGetIndustryQuery, useGetServicesQuery } from '../../features/services/servicesApi';
import { useL } from '../../features/preferences/usePreferences';
import { icons } from '../../shared/lib/icons';
import { useSeo } from '../../shared/lib/useSeo';
import { Container } from '../../shared/ui/Container';
import { Section } from '../../shared/ui/Section';
import { Eyebrow, SectionHeading } from '../../shared/ui/SectionHeading';
import { Button } from '../../shared/ui/Button';
import { Skeleton } from '../../shared/ui/Skeleton';
import { EmptyState } from '../../shared/ui/StateViews';
import { RevealGroup, RevealItem } from '../../shared/motion/Reveal';
import { SplitText } from '../../shared/motion/SplitText';
import { EASE_OUT } from '../../shared/motion/variants';
import { photoSrcSet } from '../../shared/lib/image';

export function IndustryDetailPage() {
  const { slug = '' } = useParams();
  const { t } = useTranslation();
  const l = useL();
  const { data: industry, isLoading, isError } = useGetIndustryQuery(slug);
  const { data: services = [] } = useGetServicesQuery();
  useSeo(industry ? l(industry.title) : t('nav.industries'), industry ? industry.focus.map(l).join(' · ') : t('industries.lead'), { image: industry?.image });

  if (isLoading) {
    return (
      <Container className="pt-32">
        <Skeleton className="h-[60vh] rounded-3xl" />
      </Container>);

  }
  if (isError || !industry) {
    return (
      <Container className="py-40">
        <EmptyState />
        <div className="mt-8 text-center">
          <Button to="/industries" variant="ghost" arrow>
            {t('nav.industries')}
          </Button>
        </div>
      </Container>);

  }

  const Icon = icons[industry.icon];
  const relevant = services.filter((s) => industry.services.includes(s.slug));

  return (
    <>
      <header className="relative flex min-h-[78vh] items-end overflow-hidden bg-ink-950 pb-16 pt-40 text-white">
        <motion.img
          src={industry.image} srcSet={photoSrcSet(industry.image)} sizes="100vw"
          alt=""
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="absolute inset-0 size-full object-cover" />
        
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/60 to-ink-950/20" />
        <Container className="relative">
          <p dir="ltr" className="font-latin text-[11px] font-medium uppercase tracking-[0.3em] text-lime-500 rtl:text-right">
            INDUSTRIES WE SERVE
          </p>
          <span className="mt-6 inline-flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-ink-950/40 backdrop-blur-md">
            <Icon className="size-6 text-lime-500" strokeWidth={1.4} aria-hidden />
          </span>
          <SplitText
            as="h1"
            trigger="mount"
            text={l(industry.title)}
            className="mt-6 max-w-4xl text-headline font-extralight tracking-tight rtl:font-light rtl:leading-[1.25] rtl:tracking-normal" />
          
          <ul className="mt-8 flex flex-wrap gap-2">
            {industry.focus.map((f) =>
            <li key={f.en} className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/85 backdrop-blur">
                {l(f)}
              </li>
            )}
          </ul>
        </Container>
      </header>

      <Section aria-labelledby="flow-title">
        <h2 id="flow-title" className="sr-only">
          {t('industries.challenges')} → {t('industries.solutions')}
        </h2>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <div className="rounded-3xl border border-dashed border-line-strong p-8">
            <Eyebrow>CHALLENGES</Eyebrow>
            <h3 className="mt-4 text-2xl font-light">{t('industries.challenges')}</h3>
            <RevealGroup as="ul" className="mt-6 space-y-4">
              {industry.challenges.map((c) =>
              <RevealItem as="li" key={c.en} className="flex items-start gap-3 text-muted">
                  <CircleDot className="mt-1 size-4 shrink-0" aria-hidden />
                  {l(c)}
                </RevealItem>
              )}
            </RevealGroup>
            <p className="mt-6 text-xs text-muted/80">{t('industries.draftNote')}</p>
          </div>

          <div className="flex items-center justify-center" aria-hidden>
            <div className="flex items-center lg:flex-col">
              <span className="h-px w-16 bg-line-strong lg:h-16 lg:w-px" />
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-lime-500 text-ink-950">
                <ArrowRight className="size-5 rotate-90 lg:rotate-0 rtl:lg:-scale-x-100" />
              </span>
              <span className="h-px w-16 bg-line-strong lg:h-16 lg:w-px" />
            </div>
          </div>

          <div className="glass rounded-3xl border-lime-500/30 p-8">
            <Eyebrow>H HUNTERS SOLUTIONS</Eyebrow>
            <h3 className="mt-4 text-2xl font-light">{t('industries.solutions')}</h3>
            <RevealGroup as="ul" className="mt-6 space-y-4">
              {industry.focus.map((f) =>
              <RevealItem as="li" key={f.en} className="flex items-start gap-3 text-fg">
                  <Check className="mt-1 size-4 shrink-0 text-accent-ink" aria-hidden />
                  {l(f)}
                </RevealItem>
              )}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {relevant.length > 0 &&
      <Section className="border-t border-line" aria-labelledby="industry-services">
          <SectionHeading id="industry-services" eyebrow="CORE EXPERTISE" title={t('industries.services')} />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relevant.map((s) =>
          <RevealItem key={s.slug}>
                <ServiceCard service={s} />
              </RevealItem>
          )}
          </RevealGroup>
        </Section>
      }
    </>);

}
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PhilosophyFlip } from '../../components/home/PhilosophyFlip';
import { useSeo } from '../../shared/lib/useSeo';
import { cn } from '../../shared/lib/cn';
import { PageHero } from '../../shared/ui/PageHero';
import { Container } from '../../shared/ui/Container';
import { Eyebrow } from '../../shared/ui/SectionHeading';
import { NodeLine } from '../../shared/ui/NodeLine';
import { Reveal } from '../../shared/motion/Reveal';
import { SplitText } from '../../shared/motion/SplitText';
import { quick } from '../../shared/motion/variants';
import { brandify } from '../../shared/lib/brand';

const sections = [
{ id: 'who', eyebrow: 'WHO WE ARE', index: '01' },
{ id: 'vision', eyebrow: 'OUR VISION', index: '02' },
{ id: 'mission', eyebrow: 'OUR MISSION', index: '03' },
{ id: 'philosophy', eyebrow: 'OUR PHILOSOPHY', index: '04' },
{ id: 'commitment', eyebrow: 'OUR COMMITMENT', index: '15' },
{ id: 'future', eyebrow: 'OUR FUTURE', index: '16' }] as
const;

type SectionId = (typeof sections)[number]['id'];

export function AboutPage() {
  const { t } = useTranslation();
  useSeo(t('nav.about'), t('about.lead'));
  const [active, setActive] = useState<SectionId>('who');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const para = (key: string) => t(key, { returnObjects: true }) as string[];

  return (
    <>
      <PageHero eyebrow="ABOUT H HUNTERS" title={t('about.title')} lead={t('about.lead')} />

      <nav aria-label={t('nav.about')} className="sticky top-0 z-30 border-y border-line bg-bg/80 backdrop-blur-xl">
        <Container>
          <ul className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto py-2">
            {sections.map((s) =>
            <li key={s.id}>
                <a
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
                className={cn(
                  'relative block whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors duration-150',
                  active === s.id ? 'text-ink-950' : 'text-muted hover:text-fg'
                )}>
                
                  {active === s.id && <motion.span layoutId="about-nav" transition={quick} className="absolute inset-0 rounded-full bg-lime-500" />}
                  <span className="relative">{t(`about.nav.${s.id}`)}</span>
                </a>
              </li>
            )}
          </ul>
        </Container>
      </nav>

      <Container className="py-12">
        <EditorialBlock id="who" eyebrow="WHO WE ARE" index="01" title={t('about.who.title')}>
          {para('about.who.body').map((p, i) =>
          <Reveal key={i} delay={0.05 * i}>
              {i === 0 ? <Lead>{brandify(p)}</Lead> : <p className="text-lg leading-relaxed text-muted">{brandify(p)}</p>}
            </Reveal>
          )}
        </EditorialBlock>

        <EditorialBlock id="vision" eyebrow="OUR VISION" index="02" title={t('about.vision.title')}>
          <Reveal>
            <Lead large>{t('about.vision.body')}</Lead>
          </Reveal>
        </EditorialBlock>

        <EditorialBlock id="mission" eyebrow="OUR MISSION" index="03" title={t('about.mission.title')}>
          {para('about.mission.body').map((p, i) =>
          <Reveal key={i} delay={0.05 * i}>
              {i === 0 ? <Lead>{brandify(p)}</Lead> : <p className="text-lg leading-relaxed text-muted">{brandify(p)}</p>}
            </Reveal>
          )}
        </EditorialBlock>

        <EditorialBlock id="philosophy" eyebrow="OUR PHILOSOPHY" index="04" title={t('about.philosophy.title')}>
          <Reveal>
            <Lead>
              {t('about.philosophy.quote')}
              <span className="mt-3 block">{para('about.philosophy.body')[0]}</span>
            </Lead>
          </Reveal>
          {para('about.philosophy.body').slice(1).map((p, i) =>
          <Reveal key={i}>
              <p className="text-lg leading-relaxed text-muted">{brandify(p)}</p>
            </Reveal>
          )}
          <Reveal>
            <PhilosophyFlip />
          </Reveal>
        </EditorialBlock>

        <EditorialBlock id="commitment" eyebrow="OUR COMMITMENT" index="15" title={t('about.commitment.title')}>
          {leadFirst(para('about.commitment.body'), 1).map((p, i) =>
          <Reveal key={i}>
              {i === 0 ? <Lead>{brandify(p)}</Lead> : <p className="text-lg leading-relaxed text-muted">{brandify(p)}</p>}
            </Reveal>
          )}
        </EditorialBlock>

        <EditorialBlock id="future" eyebrow="OUR FUTURE" index="16" title={t('about.future.title')} last>
          {leadFirst(para('about.future.body'), 1).map((p, i) =>
          <Reveal key={i}>
              {i === 0 ? <Lead>{brandify(p)}</Lead> : <p className="text-lg leading-relaxed text-muted">{brandify(p)}</p>}
            </Reveal>
          )}
        </EditorialBlock>
      </Container>
    </>);

}

interface EditorialBlockProps {
  id: SectionId;
  eyebrow: string;
  index: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}

/** Moves the highlighted paragraph to the top, so every section opens with its statement. */
const leadFirst = (paras: string[], leadIndex: number) => [paras[leadIndex], ...paras.filter((_, i) => i !== leadIndex)];

function EditorialBlock({ id, eyebrow, index, title, children, last }: EditorialBlockProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-32 py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
          <div id={`${id}-title`}>
            <SplitText text={title} className="mt-5 text-headline font-light tracking-tight rtl:leading-[1.2] rtl:tracking-normal" />
          </div>
        </div>
        <div className="flex flex-col gap-8">{children}</div>
      </div>
      {!last && <NodeLine className="mt-20 md:mt-28" />}
    </section>);

}

/** The highlighted statement in each section: lime rule with a node at its top, same in every section. */
function Lead({ children, large }: {children: React.ReactNode;large?: boolean;}) {
  return (
    <blockquote className="relative border-s border-accent ps-8">
      <span aria-hidden className="absolute -start-[5px] top-0 size-2.5 rounded-full bg-accent" />
      <p className={cn('font-light leading-snug text-fg', large ? 'text-3xl font-extralight md:text-4xl md:leading-snug' : 'text-2xl md:text-3xl md:leading-snug')}>
        {children}
      </p>
    </blockquote>);

}

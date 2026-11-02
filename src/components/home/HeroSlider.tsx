import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../../data/company';
import { useIsRtl, useL } from '../../features/preferences/usePreferences';
import { NetworkCanvas } from '../../shared/visual/NetworkCanvas';
import { SplitText } from '../../shared/motion/SplitText';
import { Container } from '../../shared/ui/Container';
import { Button } from '../../shared/ui/Button';
import { Eyebrow } from '../../shared/ui/SectionHeading';
import { cn } from '../../shared/lib/cn';
import { EASE_OUT } from '../../shared/motion/variants';

const SLIDE_MS = 7000;
const PARALLAX = 30;

export function HeroSlider() {
  const { t } = useTranslation();
  const l = useL();
  const rtl = useIsRtl();
  const reduce = useReducedMotion();
  const [emblaRef, api] = useEmblaCarousel({ loop: false, direction: rtl ? 'rtl' : 'ltr', duration: 32 });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setSelected(api.selectedScrollSnap());
      progress.set(0);
    };
    const onParallax = () => {
      const scroll = api.scrollProgress();
      const sign = rtl ? 1 : -1;
      api.scrollSnapList().forEach((snap, i) => {
        const layer = api.slideNodes()[i]?.querySelector<HTMLElement>('[data-parallax]');
        if (layer) layer.style.transform = `translate3d(${(snap - scroll) * sign * PARALLAX}%,0,0)`;
      });
    };
    onSelect();
    onParallax();
    api.on('select', onSelect).on('reInit', onSelect).on('scroll', onParallax).on('reInit', onParallax);
    return () => {
      api.off('select', onSelect).off('reInit', onSelect).off('scroll', onParallax).off('reInit', onParallax);
    };
  }, [api, progress, rtl]);

  // Autoplay with a visible timer, paused on hover / focus / hidden tab.
  useEffect(() => {
    if (!api || reduce) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!paused && document.visibilityState === 'visible') {
        const next = progress.get() + dt / SLIDE_MS;
        if (next >= 1) {
          progress.set(0);
          if (api.canScrollNext()) api.scrollNext();else
          api.scrollTo(0);
        } else {
          progress.set(next);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [api, paused, reduce, progress]);

  const go = useCallback((i: number) => api?.scrollTo(i), [api]);
  const prev = () => api?.canScrollPrev() ? api.scrollPrev() : api?.scrollTo(heroSlides.length - 1);
  const next = () => api?.canScrollNext() ? api.scrollNext() : api?.scrollTo(0);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="H HUNTERS"
      className="relative h-[100svh] min-h-[680px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}>
      
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-1/2 start-[10%] z-[1] size-[1000px] rounded-full glow-radial" />

      <div ref={emblaRef} className="relative z-[2] h-full overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {heroSlides.map((slide, i) => {
            const active = i === selected;
            const Heading = i === 0 ? 'h1' : 'h2';
            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${heroSlides.length}`}
                aria-hidden={!active}
                className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden">
                
                <div data-parallax className="absolute inset-y-0 -inset-x-[20%] will-change-transform">
                  <NetworkCanvas scene={slide.scene} active={Math.abs(i - selected) <= 1} />
                </div>
                {/* Fade the canvas into the page background (under the content) so the hero has no hard bottom edge. */}
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-bg/70 to-bg" />
                <Container wide className="relative flex h-full flex-col justify-center pb-44 pt-28">
                  <motion.div
                    initial={false}
                    animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}>
                    
                    <Eyebrow index={String(i + 1).padStart(2, '0')}>{slide.eyebrow}</Eyebrow>
                  </motion.div>
                  <SplitText
                    as={Heading}
                    active={active}
                    delay={0.1}
                    text={l(slide.title)}
                    className="mt-7 max-w-6xl text-display font-extralight tracking-[-0.035em] text-fg rtl:font-light rtl:leading-[1.2] rtl:tracking-normal" />
                  
                  <motion.p
                    initial={false}
                    animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }}
                    transition={{ duration: 0.3, ease: EASE_OUT, delay: active ? 0.35 : 0 }}
                    className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                    
                    {l(slide.subtitle)}
                  </motion.p>
                  <motion.div
                    initial={false}
                    animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }}
                    transition={{ duration: 0.3, ease: EASE_OUT, delay: active ? 0.45 : 0 }}
                    className="mt-10 flex flex-wrap gap-3">
                    
                    <Button to="/book-consultation" size="lg" arrow tabIndex={active ? 0 : -1}>
                      {t('nav.book')}
                    </Button>
                    <Button to="/solutions" size="lg" variant="ghost" tabIndex={active ? 0 : -1}>
                      {t('common.exploreSolutions')}
                    </Button>
                  </motion.div>
                </Container>
              </div>);

          })}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[3]">
        <Container wide className="flex items-end justify-between gap-6 pb-10">
          <ol className="flex flex-1 gap-3 sm:max-w-2xl" aria-label="Slides">
            {heroSlides.map((slide, i) =>
            <li key={slide.id} className="flex-1">
                <button
                type="button"
                onClick={() => go(i)}
                aria-label={`${i + 1}: ${l(slide.title)}`}
                aria-current={i === selected}
                className="group w-full pt-3 text-start">
                
                  <span
                  dir="ltr"
                  className={cn(
                    'block font-latin text-xs tabular-nums transition-colors duration-150',
                    i === selected ? 'text-fg' : 'text-muted group-hover:text-fg'
                  )}>
                  
                    {String(i + 1).padStart(2, '0')}
                    <span className="text-muted"> — {String(heroSlides.length).padStart(2, '0')}</span>
                  </span>
                  <span className="relative mt-3 block h-px w-full overflow-hidden bg-line-strong">
                    <motion.span
                    className="absolute inset-0 origin-left bg-accent rtl:origin-right"
                    style={{ scaleX: i === selected ? reduce ? 1 : progress : i < selected ? 1 : 0 }} />
                  
                  </span>
                </button>
              </li>
            )}
          </ol>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label={t('common.previous')}
              className="inline-flex size-12 items-center justify-center rounded-full border border-line-strong text-fg transition-colors duration-150 hover:border-accent hover:text-accent-ink">
              
              <ChevronLeft className="size-5 rtl:-scale-x-100" aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={t('common.next')}
              className="inline-flex size-12 items-center justify-center rounded-full border border-line-strong text-fg transition-colors duration-150 hover:border-accent hover:text-accent-ink">
              
              <ChevronRight className="size-5 rtl:-scale-x-100" aria-hidden />
            </button>
          </div>
        </Container>
      </div>
    </section>);

}
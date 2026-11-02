import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '../../entities';
import { useL } from '../../features/preferences/usePreferences';
import { icons } from '../../shared/lib/icons';
import { cn } from '../../shared/lib/cn';
import { Button } from '../../shared/ui/Button';
import { EASE_OUT } from '../../shared/motion/variants';
import { photoSrcSet, photoSmall } from '../../shared/lib/image';

/**
 * Service index with an image preview: hovering or focusing a row swaps the large image beside the list.
 * On small screens each row carries its own thumbnail instead.
 */
export function ServiceShowcase({ services }: {services: Service[];}) {
  const { t } = useTranslation();
  const l = useL();
  const [active, setActive] = useState(0);
  const current = services[active];
  if (!current) return null;
  const Icon = icons[current.icon];
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
      <ol className="border-t border-line">
        {services.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.slug}>
              <Link
                to={`/services/${s.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative flex items-center gap-5 border-b border-line py-5 outline-none md:py-6">

                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-y-0 start-0 w-px origin-top bg-accent transition-transform duration-300 ease-out',
                    on ? 'scale-y-100' : 'scale-y-0'
                  )} />

                <span dir="ltr" className={cn('w-8 shrink-0 ps-4 font-latin text-xs tabular-nums transition-colors duration-200', on ? 'text-accent-ink' : 'text-muted')}>
                  {pad(s.index)}
                </span>
                <img
                  src={photoSmall(s.image)}
                  alt=""
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="size-14 shrink-0 rounded-xl object-cover lg:hidden" />

                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'block text-lg font-light transition-[color,transform] duration-300 ease-out md:text-2xl',
                      on ? 'text-fg lg:translate-x-2 lg:rtl:-translate-x-2' : 'text-muted group-hover:text-fg'
                    )}>
                    {l(s.title)}
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-muted">{t(`services.categories.${s.category}`)}</span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-200',
                    on ? 'border-lime-500 bg-lime-500 text-ink-950' : 'border-line-strong text-fg group-hover:border-fg/40'
                  )}>

                  <ArrowUpRight className="size-4 rtl:-scale-x-100" />
                </span>
              </Link>
            </li>);

        })}
      </ol>

      <div className="relative hidden lg:block">
        <div className="sticky top-28 aspect-[4/5] max-h-[calc(100vh-9rem)] w-full overflow-hidden rounded-3xl border border-line">
          {/* All images stay mounted and cross-fade, so switching is instant and never shows a blank frame. */}
          {services.map((s, i) =>
          <motion.img
            key={s.slug}
            src={s.image} srcSet={photoSrcSet(s.image)} sizes="45vw"
            alt=""
            loading="lazy"
            decoding="async"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="absolute inset-0 size-full object-cover" />
          )}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

          <span dir="ltr" className="absolute end-6 top-6 font-latin text-xs tabular-nums text-white/70">
            <span className="text-lime-500">{pad(current.index)}</span> / {pad(services.length)}
          </span>

          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="absolute inset-x-0 bottom-0 p-8 text-white">

            <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/15 bg-black/40 text-lime-500 backdrop-blur">
              <Icon className="size-5" strokeWidth={1.5} aria-hidden />
            </span>
            <p className="mt-5 text-2xl font-light leading-snug">{l(current.title)}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{l(current.short)}</p>
            <Button to={`/services/${current.slug}`} arrow className="mt-6">
              {t('common.learnMore')}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>);

}

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Service } from '../../entities';
import { useL } from '../../features/preferences/usePreferences';
import { icons } from '../../shared/lib/icons';
import { photoSrcSet } from '../../shared/lib/image';
import { CardArrow, SpotlightCard, TiltLayer } from '../../shared/ui/SpotlightCard';

/** Image-led service card: photo with category, number and icon over it; title, summary and a "learn more" footer below. */
export function ServiceCard({ service }: {service: Service;}) {
  const { t } = useTranslation();
  const l = useL();
  const Icon = icons[service.icon];

  return (
    <SpotlightCard to={`/services/${service.slug}`} label={l(service.title)} className="h-full">
      <div className="flex h-full flex-col">
        <div className="relative aspect-[16/11] overflow-hidden">
          <img
            src={service.image}
            srcSet={photoSrcSet(service.image)}
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />

          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/20" />
          <span className="absolute start-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] text-white/90 backdrop-blur-md">
            {t(`services.categories.${service.category}`)}
          </span>
          <TiltLayer depth={8} className="absolute bottom-4 start-4">
            <motion.div
              layoutId={`service-icon-${service.slug}`}
              className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/15 bg-black/45 text-lime-500 backdrop-blur-md">

              <Icon className="size-5" strokeWidth={1.5} aria-hidden />
            </motion.div>
          </TiltLayer>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <motion.h3 layoutId={`service-title-${service.slug}`} className="text-xl font-light leading-snug text-fg">
            {l(service.title)}
          </motion.h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{l(service.short)}</p>
          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <span className="text-sm text-fg/80 transition-colors duration-200 group-hover:text-fg dark:group-hover:text-accent-ink">{t('common.learnMore')}</span>
            <CardArrow />
          </div>
        </div>
      </div>
    </SpotlightCard>);

}

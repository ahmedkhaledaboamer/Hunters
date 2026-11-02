import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Service } from '../../entities';
import { useL } from '../../features/preferences/usePreferences';
import { icons } from '../../shared/lib/icons';
import { CardArrow, SpotlightCard, TiltLayer } from '../../shared/ui/SpotlightCard';

export function ServiceCard({ service }: {service: Service;}) {
  const { t } = useTranslation();
  const l = useL();
  const Icon = icons[service.icon];

  return (
    <SpotlightCard to={`/services/${service.slug}`} label={l(service.title)} index={service.index} className="h-full">
      <div className="flex h-full min-h-[340px] flex-col p-7">
        <TiltLayer depth={8} className="self-start">
          <motion.div
            layoutId={`service-icon-${service.slug}`}
            className="inline-flex size-14 items-center justify-center rounded-2xl border border-line bg-fg/[0.03] text-accent-ink">
            
            <Icon className="size-6" strokeWidth={1.4} aria-hidden />
          </motion.div>
        </TiltLayer>
        <p className="mt-8 text-xs text-muted">{t(`services.categories.${service.category}`)}</p>
        <motion.h3 layoutId={`service-title-${service.slug}`} className="mt-2 text-xl font-light leading-snug text-fg">
          {l(service.title)}
        </motion.h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{l(service.short)}</p>
        <div className="mt-auto pt-8">
          <CardArrow />
        </div>
      </div>
    </SpotlightCard>);

}
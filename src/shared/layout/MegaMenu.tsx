import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGetServicesQuery } from '../../features/services/servicesApi';
import { useL } from '../../features/preferences/usePreferences';
import { icons } from '../lib/icons';
import { Container } from '../ui/Container';
import { NodeLine } from '../ui/NodeLine';
import { Skeleton } from '../ui/Skeleton';
import { Button } from '../ui/Button';
import { Eyebrow } from '../ui/SectionHeading';
import { companyLinks } from './navigation';
import { EASE_OUT } from '../motion/variants';

export function MegaMenu({ kind, id }: {kind: 'services' | 'company';id: string;}) {
  const { t } = useTranslation();
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
      className="absolute inset-x-0 top-full border-b border-line bg-bg/95 backdrop-blur-xl">
      
      <Container wide className="grid gap-10 py-10 lg:grid-cols-[300px_1fr]">
        <div className="flex flex-col">
          <Eyebrow>{kind === 'services' ? 'CORE EXPERTISE' : 'H HUNTERS'}</Eyebrow>
          <p className="mt-4 text-2xl font-extralight leading-snug text-fg">{t(kind === 'services' ? 'nav.servicesBlurb' : 'nav.companyBlurb')}</p>
          <NodeLine className="mt-6 max-w-[200px]" />
          {kind === 'services' &&
          <Button to="/services" variant="link" arrow className="mt-6 self-start">
              {t('nav.allServices')}
            </Button>
          }
        </div>
        {kind === 'services' ? <ServicesGrid /> : <CompanyGrid />}
      </Container>
    </motion.div>);

}

function ServicesGrid() {
  const { data, isLoading } = useGetServicesQuery();
  const l = useL();
  if (isLoading || !data) {
    return (
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) =>
        <Skeleton key={i} className="h-20" />
        )}
      </div>);

  }
  return (
    <ul className="grid gap-1 sm:grid-cols-2 xl:grid-cols-4">
      {data.map((s) => {
        const Icon = icons[s.icon];
        return (
          <li key={s.slug}>
            <Link
              to={`/services/${s.slug}`}
              className="group flex h-full gap-3 rounded-xl p-4 transition-colors duration-150 hover:bg-fg/[0.04]">
              
              <Icon className="mt-0.5 size-5 shrink-0 text-muted transition-colors duration-150 group-hover:text-accent-ink" strokeWidth={1.5} aria-hidden />
              <span>
                <span className="block text-sm font-medium text-fg">{l(s.title)}</span>
                <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted">{l(s.short)}</span>
              </span>
            </Link>
          </li>);

      })}
    </ul>);

}

function CompanyGrid() {
  const { t } = useTranslation();
  return (
    <ul className="grid gap-1 sm:grid-cols-2 xl:grid-cols-3">
      {companyLinks.map((c) => {
        const Icon = icons[c.icon];
        return (
          <li key={c.key}>
            <Link to={c.to} className="group flex gap-3 rounded-xl p-4 transition-colors duration-150 hover:bg-fg/[0.04]">
              <Icon className="mt-0.5 size-5 shrink-0 text-muted transition-colors duration-150 group-hover:text-accent-ink" strokeWidth={1.5} aria-hidden />
              <span>
                <span className="block text-sm font-medium text-fg">{t(`nav.${c.key}`)}</span>
                <span className="mt-1 block text-xs text-muted">{t(`nav.${c.key}Desc`)}</span>
              </span>
            </Link>
          </li>);

      })}
    </ul>);

}
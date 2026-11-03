import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import type { ServiceCategory } from '../../entities';
import { serviceCategories } from '../../data/services';
import { ServiceCard } from '../../components/services/ServiceCard';
import { useGetServicesQuery } from '../../features/services/servicesApi';
import { useSeo } from '../../shared/lib/useSeo';
import { PageHero } from '../../shared/ui/PageHero';
import { Section } from '../../shared/ui/Section';
import { Tabs, type TabItem } from '../../shared/ui/Tabs';
import { QueryState } from '../../shared/ui/QueryState';
import { CardSkeletonGrid } from '../../shared/ui/Skeleton';
import { EASE_OUT } from '../../shared/motion/variants';

type Filter = ServiceCategory | 'all';

export function ServicesPage() {
  const { t } = useTranslation();
  useSeo(t('nav.services'), t('services.lead'));
  const query = useGetServicesQuery();
  const [filter, setFilter] = useState<Filter>('all');
  const services = useMemo(() => query.data ?? [], [query.data]);

  const tabs: TabItem<Filter>[] = useMemo(
    () => [
    { value: 'all', label: t('services.categories.all'), count: services.length },
    ...serviceCategories.map((c) => ({
      value: c,
      label: t(`services.categories.${c}`),
      count: services.filter((s) => s.category === c).length
    }))],

    [t, services]
  );

  const visible = filter === 'all' ? services : services.filter((s) => s.category === filter);

  return (
    <>
      <PageHero eyebrow="CORE EXPERTISE" title={t('services.title')} lead={t('services.lead')} />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <Tabs items={tabs} value={filter} onChange={setFilter} label={t('services.filter')} />
        <div className="mt-10">
          <QueryState
            isLoading={query.isLoading}
            isError={query.isError}
            onRetry={query.refetch}
            skeleton={<CardSkeletonGrid count={8} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" itemClassName="h-[420px]" />}>
            
            {() =>
            <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout" initial={false}>
                  {visible.map((s) =>
                <motion.li
                  key={s.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}>
                  
                      <ServiceCard service={s} />
                    </motion.li>
                )}
                </AnimatePresence>
              </motion.ul>
            }
          </QueryState>
        </div>
      </Section>
    </>);

}
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectService } from '../../features/booking/bookingSlice';
import { useGetServicesQuery } from '../../features/services/servicesApi';
import { useL } from '../../features/preferences/usePreferences';
import { icons } from '../../shared/lib/icons';
import { QueryState } from '../../shared/ui/QueryState';
import { CardSkeletonGrid } from '../../shared/ui/Skeleton';
import { SelectableCard } from './SelectableCard';

export function StepService() {
  const { t } = useTranslation();
  const l = useL();
  const dispatch = useAppDispatch();
  const selected = useAppSelector((s) => s.booking.serviceSlug);
  const query = useGetServicesQuery();

  return (
    <div>
      <h2 className="text-2xl font-light md:text-3xl">{t('book.serviceTitle')}</h2>
      <div className="mt-8">
        <QueryState
          isLoading={query.isLoading}
          isError={query.isError}
          onRetry={query.refetch}
          skeleton={<CardSkeletonGrid count={8} className="grid gap-3 sm:grid-cols-2" itemClassName="h-28" />}>
          
          {() =>
          <div role="radiogroup" aria-label={t('book.serviceTitle')} className="grid gap-3 sm:grid-cols-2">
              {(query.data ?? []).map((s) => {
              const Icon = icons[s.icon];
              return (
                <SelectableCard key={s.slug} selected={selected === s.slug} onSelect={() => dispatch(selectService(s.slug))}>
                    <Icon className="size-5 text-accent-ink" strokeWidth={1.5} aria-hidden />
                    <span className="mt-4 pe-6 text-[15px] font-medium text-fg">{l(s.title)}</span>
                    <span className="mt-1 text-xs leading-relaxed text-muted">{l(s.short)}</span>
                  </SelectableCard>);

            })}
            </div>
          }
        </QueryState>
      </div>
    </div>);

}
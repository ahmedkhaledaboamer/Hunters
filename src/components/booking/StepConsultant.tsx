import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectConsultant } from '../../features/booking/bookingSlice';
import { useGetConsultantsQuery } from '../../features/content/contentApi';
import { useL } from '../../features/preferences/usePreferences';
import { Badge } from '../../shared/ui/Badge';
import { QueryState } from '../../shared/ui/QueryState';
import { CardSkeletonGrid } from '../../shared/ui/Skeleton';
import { SelectableCard } from './SelectableCard';

export const ANY_CONSULTANT = 'any';

export function StepConsultant({ onPicked }: {onPicked?: () => void;}) {
  const { t } = useTranslation();
  const l = useL();
  const dispatch = useAppDispatch();
  const { consultantId, serviceSlug } = useAppSelector((s) => s.booking);
  const query = useGetConsultantsQuery();
  const consultants = [...(query.data ?? [])].sort(
    (a, b) => Number(b.specializations.includes(serviceSlug ?? '')) - Number(a.specializations.includes(serviceSlug ?? ''))
  );

  return (
    <div>
      <h2 className="text-2xl font-light md:text-3xl">{t('book.consultantTitle')}</h2>
      <div className="mt-8">
        <QueryState
          isLoading={query.isLoading}
          isError={query.isError}
          onRetry={query.refetch}
          skeleton={<CardSkeletonGrid count={4} className="grid gap-3 sm:grid-cols-2" itemClassName="h-36" />}>
          
          {() =>
          <div role="radiogroup" aria-label={t('book.consultantTitle')} className="grid gap-3 sm:grid-cols-2">
              <SelectableCard selected={consultantId === ANY_CONSULTANT} onSelect={() => {dispatch(selectConsultant(ANY_CONSULTANT));onPicked?.();}} className="sm:col-span-2">
                <span className="flex items-center gap-4">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-lime-500 text-ink-950">
                    <Sparkles className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium text-fg">{t('book.any')}</span>
                    <span className="block text-sm text-muted">{t('book.anyDesc')}</span>
                  </span>
                </span>
              </SelectableCard>
              {consultants.map((c) => {
              const match = serviceSlug ? c.specializations.includes(serviceSlug) : false;
              return (
                <SelectableCard key={c.id} selected={consultantId === c.id} onSelect={() => {dispatch(selectConsultant(c.id));onPicked?.();}}>
                    <span className="flex items-center gap-4">
                      <span aria-hidden className="inline-flex size-12 items-center justify-center rounded-full border border-line-strong font-latin text-sm text-fg">
                        {c.initials}
                      </span>
                      <span>
                        <span className="block text-[15px] font-medium text-fg">{l(c.name)}</span>
                        <span className="block text-sm text-muted">{l(c.role)}</span>
                      </span>
                    </span>
                    <span className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted">{t('book.languages')}:</span>
                      {c.languages.map((lang) =>
                    <Badge key={lang} tone="outline">
                          {lang === 'ar' ? 'العربية' : 'English'}
                        </Badge>
                    )}
                      {match && <Badge tone="accent">{t('book.recommended')}</Badge>}
                    </span>
                  </SelectableCard>);

            })}
            </div>
          }
        </QueryState>
      </div>
    </div>);

}
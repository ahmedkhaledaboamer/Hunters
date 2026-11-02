import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { goToStep } from '../../features/booking/bookingSlice';
import { useBookingSummary } from './useBookingSummary';

export function StepReview({ error }: {error: boolean;}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const rows = useBookingSummary();
  const challenge = useAppSelector((s) => s.booking.details?.challenge);

  return (
    <div>
      <h2 className="text-2xl font-light md:text-3xl">{t('book.reviewTitle')}</h2>
      <dl className="mt-8 divide-y divide-line rounded-2xl border border-line">
        {rows.map((r) =>
        <div key={r.key} className="flex items-start justify-between gap-4 p-5">
            <div>
              <dt className="text-xs text-muted">{r.label}</dt>
              <dd className="mt-1 text-[15px] text-fg">{r.value ?? '—'}</dd>
              {r.key === 'contact' && challenge && <dd className="mt-2 line-clamp-3 text-sm text-muted">{challenge}</dd>}
            </div>
            <button
            type="button"
            onClick={() => dispatch(goToStep(r.step))}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-accent-ink transition-colors duration-150 hover:bg-fg/5">
            
              <Pencil className="size-3.5" aria-hidden />
              {t('book.edit')}
            </button>
          </div>
        )}
      </dl>
      {error &&
      <p role="alert" className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {t('book.error')}
        </p>
      }
    </div>);

}
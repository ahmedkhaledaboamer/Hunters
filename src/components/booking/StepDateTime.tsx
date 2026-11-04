import { useTranslation } from 'react-i18next';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { Globe2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setDate, setTime, toggleLocalTime } from '../../features/booking/bookingSlice';
import { useGetSlotsQuery } from '../../features/booking/bookingApi';
import { useLocale } from '../../features/preferences/usePreferences';
import { gstToDate } from '../../shared/lib/ics';
import { cn } from '../../shared/lib/cn';
import { Skeleton } from '../../shared/ui/Skeleton';
import { ErrorState } from '../../shared/ui/StateViews';
import { BookingCalendar } from './BookingCalendar';

function useLocalTimeLabel() {
  const locale = useLocale();
  return (date: string, time: string) =>
  new Intl.DateTimeFormat(locale === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).format(
    gstToDate(date, time)
  );
}

export function StepDateTime({ onPicked }: {onPicked?: () => void;}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { date, time, showLocalTime } = useAppSelector((s) => s.booking);
  const slots = useGetSlotsQuery(date ?? skipToken);
  const localLabel = useLocalTimeLabel();

  return (
    <div>
      <h2 className="text-2xl font-light md:text-3xl">{t('book.dateTitle')}</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]">
        <BookingCalendar value={date} onChange={(d) => dispatch(setDate(d))} />

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm text-muted">
              <Globe2 className="size-4 text-accent-ink" aria-hidden />
              {t('book.timezone')}
            </p>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-fg">
              <span className="relative inline-flex">
                <input type="checkbox" className="peer sr-only" checked={showLocalTime} onChange={() => dispatch(toggleLocalTime())} />
                <span className="h-5 w-9 rounded-full bg-fg/15 transition-colors duration-150 peer-checked:bg-lime-500 peer-focus-visible:outline-2 peer-focus-visible:outline-focus" />
                <span className="absolute start-0.5 top-0.5 size-4 rounded-full bg-white shadow transition-transform duration-150 peer-checked:translate-x-4 rtl:peer-checked:-translate-x-4" />
              </span>
              {t('book.showLocal')}
            </label>
          </div>

          <div className="mt-5" aria-live="polite">
            {!date ?
            <p className="rounded-2xl border border-dashed border-line-strong p-8 text-center text-sm text-muted">{t('book.selectDate')}</p> :
            slots.isFetching ?
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {Array.from({ length: 12 }, (_, i) =>
              <Skeleton key={i} className="h-12" />
              )}
              </div> :
            slots.isError ?
            <ErrorState onRetry={slots.refetch} /> :
            !slots.data?.some((s) => s.available) ?
            <p className="rounded-2xl border border-dashed border-line-strong p-8 text-center text-sm text-muted">{t('book.noSlots')}</p> :

            <div role="radiogroup" aria-label={t('book.dateTitle')} className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {slots.data.map((slot) => {
                const selected = time === slot.time;
                return (
                  <button
                    key={slot.time}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={!slot.available}
                    onClick={() => {dispatch(setTime(slot.time));onPicked?.();}}
                    className={cn(
                      'flex min-h-12 flex-col items-center justify-center rounded-xl border px-2 py-2 text-sm tabular-nums transition-[border-color,background-color] duration-150',
                      selected ?
                      'border-lime-500 bg-lime-500 font-medium text-ink-950' :
                      'border-line text-fg hover:border-line-strong disabled:border-transparent disabled:bg-fg/[0.03] disabled:text-muted/50 disabled:line-through'
                    )}>
                    
                      <span dir="ltr">{slot.time}</span>
                      {showLocalTime && slot.available &&
                    <span dir="ltr" className={cn('text-[10px]', selected ? 'text-ink-950/70' : 'text-muted')}>
                          {localLabel(date, slot.time)}
                        </span>
                    }
                    </button>);

              })}
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}
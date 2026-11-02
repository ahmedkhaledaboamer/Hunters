import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWeekend,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek } from
'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from '../../features/preferences/usePreferences';
import { formatDate, toISODate } from '../../shared/lib/format';
import { cn } from '../../shared/lib/cn';

const BOOKING_WINDOW_DAYS = 60;

interface BookingCalendarProps {
  value: string | null;
  onChange: (iso: string) => void;
}

/** Month calendar. Past days and UAE weekends (Sat–Sun) are disabled. Week starts Monday. */
export function BookingCalendar({ value, onChange }: BookingCalendarProps) {
  const { t } = useTranslation();
  const locale = useLocale();
  const today = startOfDay(new Date());
  const maxDate = addDays(today, BOOKING_WINDOW_DAYS);
  const selected = value ? parseISO(value) : null;
  const [month, setMonth] = useState(() => startOfMonth(selected ?? today));

  const days = useMemo(
    () =>
    eachDayOfInterval({
      start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }),
      end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 })
    }),
    [month]
  );

  const weekdays = days.slice(0, 7).map((d) => formatDate(d, locale, { weekday: 'short' }));
  const canPrev = isAfter(month, startOfMonth(today));
  const canNext = isBefore(startOfMonth(addMonths(month, 1)), maxDate);

  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-base font-medium text-fg" aria-live="polite">
          {formatDate(month, locale, { month: 'long', year: 'numeric' })}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            disabled={!canPrev}
            onClick={() => setMonth((m) => addMonths(m, -1))}
            aria-label={t('common.previous')}
            className="inline-flex size-9 items-center justify-center rounded-full text-fg transition-colors duration-150 hover:bg-fg/5 disabled:opacity-30">
            
            <ChevronLeft className="size-4 rtl:-scale-x-100" aria-hidden />
          </button>
          <button
            type="button"
            disabled={!canNext}
            onClick={() => setMonth((m) => addMonths(m, 1))}
            aria-label={t('common.next')}
            className="inline-flex size-9 items-center justify-center rounded-full text-fg transition-colors duration-150 hover:bg-fg/5 disabled:opacity-30">
            
            <ChevronRight className="size-4 rtl:-scale-x-100" aria-hidden />
          </button>
        </div>
      </div>

      <div role="grid" className="mt-4 grid grid-cols-7 gap-1 text-center">
        {weekdays.map((w) =>
        <span key={w} role="columnheader" className="pb-2 text-[11px] text-muted">
            {w}
          </span>
        )}
        {days.map((d) => {
          const outside = !isSameMonth(d, month);
          const disabled = outside || isBefore(d, today) || isWeekend(d) || isAfter(d, maxDate);
          const isSelected = selected ? isSameDay(d, selected) : false;
          const isToday = isSameDay(d, today);
          return (
            <button
              key={d.toISOString()}
              type="button"
              role="gridcell"
              disabled={disabled}
              aria-selected={isSelected}
              aria-label={formatDate(d, locale, { weekday: 'long', day: 'numeric', month: 'long' })}
              onClick={() => onChange(toISODate(d))}
              className={cn(
                'relative mx-auto inline-flex size-10 items-center justify-center rounded-full text-sm tabular-nums transition-colors duration-150',
                outside && 'invisible',
                disabled ? 'text-muted/40 line-through decoration-muted/30' : 'text-fg hover:bg-fg/[0.07]',
                isSelected && 'bg-lime-500 font-medium text-ink-950 no-underline hover:bg-lime-500'
              )}>
              
              {formatDate(d, locale, { day: 'numeric' })}
              {isToday && !isSelected && <span aria-hidden className="absolute bottom-1 size-1 rounded-full bg-accent" />}
            </button>);

        })}
      </div>
      <p className="mt-4 text-xs text-muted">{t('book.weekendNote')}</p>
    </div>);

}
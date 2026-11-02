import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CalendarPlus, RotateCcw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetBooking } from '../../features/booking/bookingSlice';
import { downloadIcs } from '../../shared/lib/ics';
import { Button } from '../../shared/ui/Button';
import { EASE_OUT } from '../../shared/motion/variants';
import { BookingSummary } from './BookingSummary';
import { useBookingSummary } from './useBookingSummary';

export function BookingSuccess() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const b = useAppSelector((s) => s.booking);
  const rows = useBookingSummary();
  const service = rows.find((r) => r.key === 'service')?.value ?? '';

  const addToCalendar = () => {
    if (!b.date || !b.time || !b.reference) return;
    downloadIcs({
      uid: b.reference,
      title: `H HUNTERS — ${service}`,
      description: `${t('book.reference')}: ${b.reference}`,
      location: b.mode === 'online' ? t(`book.platforms.${b.platform}`) : 'H HUNTERS — Abu Dhabi, UAE',
      date: b.date,
      time: b.time,
      durationMinutes: b.duration
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="text-center"
      role="status">
      
      <svg viewBox="0 0 96 96" className="mx-auto size-24" aria-hidden>
        <motion.circle
          cx="48"
          cy="48"
          r="44"
          fill="none"
          className="stroke-accent"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT }} />
        
        <motion.path
          d="M30 49 l12 12 l24 -26"
          fill="none"
          className="stroke-accent"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.45, ease: EASE_OUT }} />
        
      </svg>
      <h2 className="mt-8 text-3xl font-light md:text-4xl">{t('book.successTitle')}</h2>
      <p className="mx-auto mt-3 max-w-md text-muted">{t('book.successBody', { email: b.details?.email ?? '' })}</p>

      <div className="mx-auto mt-8 inline-flex flex-col items-center rounded-2xl border border-line px-8 py-5">
        <span className="text-xs text-muted">{t('book.reference')}</span>
        <span dir="ltr" className="mt-1 font-latin text-2xl tracking-[0.2em] text-accent-ink">
          {b.reference}
        </span>
      </div>

      <div className="mx-auto mt-10 max-w-md text-start">
        <BookingSummary />
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button onClick={addToCalendar} icon={<CalendarPlus className="size-4" aria-hidden />}>
          {t('book.addToCalendar')}
        </Button>
        <Button variant="ghost" onClick={() => dispatch(resetBooking())} icon={<RotateCcw className="size-4" aria-hidden />}>
          {t('book.another')}
        </Button>
        <Button variant="link" to="/" arrow>
          {t('common.backHome')}
        </Button>
      </div>
    </motion.div>);

}
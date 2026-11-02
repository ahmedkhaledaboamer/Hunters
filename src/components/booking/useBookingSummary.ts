import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../app/hooks';
import { useGetServicesQuery } from '../../features/services/servicesApi';
import { useGetConsultantsQuery } from '../../features/content/contentApi';
import { useL, useLocale } from '../../features/preferences/usePreferences';
import { formatDate } from '../../shared/lib/format';
import { ANY_CONSULTANT } from './StepConsultant';

export interface SummaryRow {
  key: 'service' | 'consultant' | 'meeting' | 'when' | 'contact';
  step: number;
  label: string;
  value: string | null;
}

/** Derives human-readable summary rows from booking state. */
export function useBookingSummary(): SummaryRow[] {
  const { t } = useTranslation();
  const l = useL();
  const locale = useLocale();
  const b = useAppSelector((s) => s.booking);
  const { data: services = [] } = useGetServicesQuery();
  const { data: consultants = [] } = useGetConsultantsQuery();
  const service = services.find((s) => s.slug === b.serviceSlug);
  const consultant = consultants.find((c) => c.id === b.consultantId);

  const meeting =
  b.mode === 'online' ?
  `${t('book.online')} · ${t(`book.platforms.${b.platform}`)} · ${t('book.minutes', { count: b.duration })}` :
  `${t('book.inPerson')} · ${t('book.minutes', { count: b.duration })}`;

  return [
  { key: 'service', step: 0, label: t('book.summary.service'), value: service ? l(service.title) : null },
  {
    key: 'consultant',
    step: 1,
    label: t('book.summary.consultant'),
    value: b.consultantId === ANY_CONSULTANT ? t('book.any') : consultant ? l(consultant.name) : null
  },
  { key: 'meeting', step: 2, label: t('book.summary.meeting'), value: b.step >= 2 ? meeting : null },
  {
    key: 'when',
    step: 3,
    label: t('book.summary.when'),
    value: b.date && b.time ? `${formatDate(b.date, locale, { weekday: 'long', day: 'numeric', month: 'long' })} · ${b.time} GST` : null
  },
  {
    key: 'contact',
    step: 4,
    label: t('book.summary.contact'),
    value: b.details ? `${b.details.fullName} · ${b.details.email}` : null
  }];

}

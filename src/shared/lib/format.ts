import type { Locale } from '../../entities';

type Numerals = 'latn' | 'arab';

function tag(locale: Locale, numerals: Numerals) {
  return locale === 'ar' ? `ar-AE-u-nu-${numerals}` : 'en-GB';
}

/** Locale-aware date formatting. Arabic-Indic numerals are optional (default: Latin digits). */
export function formatDate(
value: string | Date,
locale: Locale,
options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' },
numerals: Numerals = 'latn')
{
  const date = typeof value === 'string' ? new Date(value) : value;
  return new Intl.DateTimeFormat(tag(locale, numerals), options).format(date);
}

export function formatNumber(value: number, locale: Locale, numerals: Numerals = 'latn') {
  return new Intl.NumberFormat(tag(locale, numerals)).format(value);
}

export function pad2(n: number) {
  return String(n).padStart(2, '0');
}

export function toISODate(date: Date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}
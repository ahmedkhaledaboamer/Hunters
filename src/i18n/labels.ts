import { useCallback } from 'react';
import { useLocale } from '../features/preferences/usePreferences';
import { arLabels } from './labelMap';

/** Returns a translator for English-authored labels in the active locale. */
export function useLabel() {
  const locale = useLocale();
  return useCallback((label: string) => (locale === 'ar' ? arLabels[label] ?? label : label), [locale]);
}

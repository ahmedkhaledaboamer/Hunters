import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { i18n } from '../../i18n';
import type { L } from '../../entities';

const query = '(prefers-color-scheme: dark)';

export function useLocale() {
  return useAppSelector((s) => s.preferences.locale);
}

export function useIsRtl() {
  return useLocale() === 'ar';
}

/** Returns a picker for bilingual data values in the active locale. */
export function useL() {
  const locale = useLocale();
  return useCallback((value: L) => value[locale], [locale]);
}

export function useResolvedTheme(): 'light' | 'dark' {
  const theme = useAppSelector((s) => s.preferences.theme);
  const [systemDark, setSystemDark] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return theme === 'system' ? systemDark ? 'dark' : 'light' : theme;
}

/** Keeps <html> class / lang / dir and i18next in sync with the preferences slice. */
export function usePreferencesSync() {
  const locale = useLocale();
  const resolved = useResolvedTheme();

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', resolved === 'dark');
  }, [resolved]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === 'ar' ? 'rtl' : 'ltr';
    if (i18n.language !== locale) void i18n.changeLanguage(locale);
  }, [locale]);
}
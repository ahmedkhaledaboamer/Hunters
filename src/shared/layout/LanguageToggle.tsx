import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../app/hooks';
import { setLocale } from '../../features/preferences/preferencesSlice';
import { useLocale } from '../../features/preferences/usePreferences';
import { cn } from '../lib/cn';

export function LanguageToggle({ className }: {className?: string;}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const next = locale === 'ar' ? 'en' : 'ar';

  return (
    <button
      type="button"
      onClick={() => dispatch(setLocale(next))}
      aria-label={t('prefs.switchLanguageLabel')}
      lang={next}
      className={cn(
        'inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-line px-3 text-sm font-medium text-fg transition-colors duration-150 hover:border-line-strong hover:bg-fg/5',
        next === 'ar' ? 'font-arabic' : 'font-latin tracking-wider',
        className
      )}>
      
      {t('prefs.switchLanguage')}
    </button>);

}
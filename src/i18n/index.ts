import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ar } from './ar';
import { en } from './en';
import { loadPreferences } from '../features/preferences/preferencesSlice';

void i18n.use(initReactI18next).init({
  resources: { ar: { translation: ar }, en: { translation: en } },
  lng: loadPreferences().locale,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnObjects: true
});

export { i18n };
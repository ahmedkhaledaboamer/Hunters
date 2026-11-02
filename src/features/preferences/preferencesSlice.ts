import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Locale } from '../../entities';

export type ThemePreference = 'light' | 'dark' | 'system';

export interface PreferencesState {
  theme: ThemePreference;
  locale: Locale;
}

const STORAGE_KEY = 'hh:preferences';
const DEFAULTS: PreferencesState = { theme: 'dark', locale: 'ar' };

export function loadPreferences(): PreferencesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<PreferencesState>;
    return {
      theme: parsed.theme === 'light' || parsed.theme === 'system' || parsed.theme === 'dark' ? parsed.theme : DEFAULTS.theme,
      locale: parsed.locale === 'en' || parsed.locale === 'ar' ? parsed.locale : DEFAULTS.locale
    };
  } catch {
    return DEFAULTS;
  }
}

export function savePreferences(state: PreferencesState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {

    /* storage unavailable — preferences stay in memory */}
}

export function resolveTheme(theme: ThemePreference): 'light' | 'dark' {
  if (theme !== 'system') return theme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Applies theme + direction to <html> synchronously (also used before first paint). */
export function applyDocumentPreferences(state: PreferencesState) {
  const root = document.documentElement;
  root.classList.toggle('dark', resolveTheme(state.theme) === 'dark');
  root.lang = state.locale;
  root.dir = state.locale === 'ar' ? 'rtl' : 'ltr';
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: loadPreferences,
  reducers: {
    setTheme(state, action: PayloadAction<ThemePreference>) {
      state.theme = action.payload;
    },
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    }
  }
});

export const { setTheme, setLocale } = preferencesSlice.actions;
export const preferencesReducer = preferencesSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../shared/api/baseApi';
import { bookingReducer } from '../features/booking/bookingSlice';
import { applyDocumentPreferences, preferencesReducer, savePreferences } from '../features/preferences/preferencesSlice';

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    booking: bookingReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware)
});

applyDocumentPreferences(store.getState().preferences);

let lastPreferences = store.getState().preferences;
store.subscribe(() => {
  const next = store.getState().preferences;
  if (next !== lastPreferences) {
    lastPreferences = next;
    savePreferences(next);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
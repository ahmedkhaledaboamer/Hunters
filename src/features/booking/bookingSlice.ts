import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BookingDetails } from '../../entities';

export const BOOKING_STEPS = 6;

export interface BookingState {
  step: number;
  serviceSlug: string | null;
  consultantId: string | null;
  mode: 'online' | 'in-person';
  platform: 'teams' | 'zoom' | 'meet';
  duration: 30 | 60;
  date: string | null;
  time: string | null;
  showLocalTime: boolean;
  details: BookingDetails | null;
  reference: string | null;
}

const initialState: BookingState = {
  step: 0,
  serviceSlug: null,
  consultantId: null,
  mode: 'online',
  platform: 'teams',
  duration: 30,
  date: null,
  time: null,
  showLocalTime: false,
  details: null,
  reference: null
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    goToStep(state, action: PayloadAction<number>) {
      state.step = Math.max(0, Math.min(BOOKING_STEPS - 1, action.payload));
    },
    nextStep(state) {
      state.step = Math.min(BOOKING_STEPS - 1, state.step + 1);
    },
    prevStep(state) {
      state.step = Math.max(0, state.step - 1);
    },
    selectService(state, action: PayloadAction<string>) {
      state.serviceSlug = action.payload;
    },
    /** Used by service pages: pre-select a service and restart the wizard. */
    prefillService(state, action: PayloadAction<string>) {
      Object.assign(state, initialState, { serviceSlug: action.payload });
    },
    selectConsultant(state, action: PayloadAction<string>) {
      state.consultantId = action.payload;
    },
    setMode(state, action: PayloadAction<BookingState['mode']>) {
      state.mode = action.payload;
    },
    setPlatform(state, action: PayloadAction<BookingState['platform']>) {
      state.platform = action.payload;
    },
    setDuration(state, action: PayloadAction<BookingState['duration']>) {
      state.duration = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
      state.time = null;
    },
    setTime(state, action: PayloadAction<string>) {
      state.time = action.payload;
    },
    toggleLocalTime(state) {
      state.showLocalTime = !state.showLocalTime;
    },
    saveDetails(state, action: PayloadAction<BookingDetails>) {
      state.details = action.payload;
    },
    confirmBooking(state, action: PayloadAction<string>) {
      state.reference = action.payload;
    },
    resetBooking() {
      return initialState;
    }
  }
});

export const {
  goToStep,
  nextStep,
  prevStep,
  selectService,
  prefillService,
  selectConsultant,
  setMode,
  setPlatform,
  setDuration,
  setDate,
  setTime,
  toggleLocalTime,
  saveDetails,
  confirmBooking,
  resetBooking
} = bookingSlice.actions;

export const bookingReducer = bookingSlice.reducer;
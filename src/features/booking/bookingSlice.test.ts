import { describe, expect, it } from 'vitest';
import {
  BOOKING_STEPS,
  bookingReducer,
  confirmBooking,
  goToStep,
  nextStep,
  prefillService,
  prevStep,
  resetBooking,
  selectService,
  setDate,
  setTime } from
'./bookingSlice';

const initial = bookingReducer(undefined, { type: 'init' });

describe('bookingSlice', () => {
  it('keeps the step inside the wizard bounds', () => {
    expect(bookingReducer(initial, prevStep()).step).toBe(0);
    expect(bookingReducer(initial, goToStep(99)).step).toBe(BOOKING_STEPS - 1);
    expect(bookingReducer(initial, goToStep(-3)).step).toBe(0);
    let s = initial;
    for (let i = 0; i < 20; i++) s = bookingReducer(s, nextStep());
    expect(s.step).toBe(BOOKING_STEPS - 1);
  });

  it('clears the chosen time when the date changes', () => {
    let s = bookingReducer(initial, setDate('2026-11-10'));
    s = bookingReducer(s, setTime('10:30'));
    expect(s.time).toBe('10:30');
    s = bookingReducer(s, setDate('2026-11-11'));
    expect(s).toMatchObject({ date: '2026-11-11', time: null });
  });

  it('prefills a service and restarts the wizard', () => {
    let s = bookingReducer(initial, goToStep(3));
    s = bookingReducer(s, setDate('2026-11-10'));
    s = bookingReducer(s, prefillService('artificial-intelligence'));
    expect(s).toMatchObject({ step: 0, date: null, serviceSlug: 'artificial-intelligence' });
  });

  it('records the reference and resets', () => {
    let s = bookingReducer(initial, selectService('ui-ux-design'));
    s = bookingReducer(s, confirmBooking('HH-TEST'));
    expect(s.reference).toBe('HH-TEST');
    expect(bookingReducer(s, resetBooking())).toEqual(initial);
  });
});

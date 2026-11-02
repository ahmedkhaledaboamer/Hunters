import { baseApi } from '../../shared/api/baseApi';
import type { BookingConfirmation, BookingRequest, TimeSlot } from '../../entities';

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSlots: build.query<TimeSlot[], string>({ query: (date) => ({ url: `/slots/${date}` }) }),
    createBooking: build.mutation<BookingConfirmation, BookingRequest>({
      query: (body) => ({ url: '/bookings', method: 'POST', body })
    })
  })
});

export const { useGetSlotsQuery, useCreateBookingMutation } = bookingApi;
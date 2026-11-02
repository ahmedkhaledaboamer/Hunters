import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { handleMock, type ApiError, type MockRequest } from './mockServer';

/**
 * Serves requests from the in-memory data layer. The content is bundled with the app, so it resolves
 * immediately — no artificial latency, no loading flashes. Swap for fetchBaseQuery to go live.
 */
const fakeBaseQuery: BaseQueryFn<MockRequest, unknown, ApiError> = async (request) => handleMock(request);

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery,
  keepUnusedDataFor: 300,
  endpoints: () => ({})
});
import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { handleMock, type ApiError, type MockRequest } from './mockServer';

const LATENCY_MIN = 320;
const LATENCY_JITTER = 420;

/** Simulates a network round-trip against the mock data layer. */
const fakeBaseQuery: BaseQueryFn<MockRequest, unknown, ApiError> = async (request) => {
  await new Promise((resolve) => setTimeout(resolve, LATENCY_MIN + Math.random() * LATENCY_JITTER));
  return handleMock(request);
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery,
  keepUnusedDataFor: 300,
  endpoints: () => ({})
});
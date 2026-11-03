import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { handleMock, type ApiError, type MockRequest } from './mockServer';
import { submitByEmail } from './mailer';

/**
 * Reads come from the in-memory data layer (the content ships with the app, so they resolve immediately).
 * Form submissions (POST) are delivered by email — see mailer.ts.
 */
const baseQuery: BaseQueryFn<MockRequest, unknown, ApiError> = async (request) => {
  if (request.method !== 'POST') return handleMock(request);
  const resource = request.url.split('/').filter(Boolean)[0];
  try {
    return { data: await submitByEmail(resource, request.body) };
  } catch (e) {
    return { error: { status: 0, message: e instanceof Error ? e.message : 'Sending failed' } };
  }
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  keepUnusedDataFor: 300,
  endpoints: () => ({})
});

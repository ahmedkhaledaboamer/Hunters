import { baseApi } from '../../shared/api/baseApi';
import type { Partner } from '../../entities';

export const partnersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPartners: build.query<Partner[], void>({ query: () => ({ url: '/partners' }) }),
    getPartner: build.query<Partner, string>({ query: (slug) => ({ url: `/partners/${slug}` }) })
  })
});

export const { useGetPartnersQuery, useGetPartnerQuery } = partnersApi;
import { baseApi } from '../../shared/api/baseApi';
import type { Industry, Service } from '../../entities';

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query<Service[], void>({ query: () => ({ url: '/services' }) }),
    getService: build.query<Service, string>({ query: (slug) => ({ url: `/services/${slug}` }) }),
    getIndustries: build.query<Industry[], void>({ query: () => ({ url: '/industries' }) }),
    getIndustry: build.query<Industry, string>({ query: (slug) => ({ url: `/industries/${slug}` }) })
  })
});

export const { useGetServicesQuery, useGetServiceQuery, useGetIndustriesQuery, useGetIndustryQuery } = servicesApi;
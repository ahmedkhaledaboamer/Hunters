import { baseApi } from '../../shared/api/baseApi';
import type { NewsArticle, NewsQuery, Paged } from '../../entities';

export const newsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNews: build.query<Paged<NewsArticle>, NewsQuery>({ query: (params) => ({ url: '/news', params }) }),
    getArticle: build.query<NewsArticle, string>({ query: (slug) => ({ url: `/news/${slug}` }) })
  })
});

export const { useGetNewsQuery, useGetArticleQuery } = newsApi;
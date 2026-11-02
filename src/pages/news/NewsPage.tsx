import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import type { NewsCategory } from '../../entities';
import { newsCategories } from '../../data/news';
import { FeaturedNewsSlider } from '../../components/news/FeaturedNewsSlider';
import { NewsCard } from '../../components/news/NewsCard';
import { useGetNewsQuery } from '../../features/news/newsApi';
import { useSeo } from '../../shared/lib/useSeo';
import { PageHero } from '../../shared/ui/PageHero';
import { Section } from '../../shared/ui/Section';
import { Tabs } from '../../shared/ui/Tabs';
import { Button } from '../../shared/ui/Button';
import { QueryState } from '../../shared/ui/QueryState';
import { CardSkeletonGrid } from '../../shared/ui/Skeleton';

type Filter = NewsCategory | 'all';

export function NewsPage() {
  const { t } = useTranslation();
  useSeo(t('nav.news'), t('news.lead'));
  const [category, setCategory] = useState<Filter>('all');
  const [input, setInput] = useState('');
  const [q, setQ] = useState('');
  const [pageSize, setPageSize] = useState(7);

  useEffect(() => {
    const id = window.setTimeout(() => setQ(input.trim()), 300);
    return () => window.clearTimeout(id);
  }, [input]);
  useEffect(() => setPageSize(7), [category, q]);

  const query = useGetNewsQuery({ category, q, page: 1, pageSize });
  const items = query.data?.items ?? [];

  return (
    <>
      <PageHero eyebrow="NEWS & INSIGHTS" title={t('news.title')} lead={t('news.lead')} />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <FeaturedNewsSlider />
        <div className="mt-20 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <Tabs items={(['all', ...newsCategories] as Filter[]).map((c) => ({ value: c, label: t(`news.categories.${c}`) }))} value={category} onChange={setCategory} label={t('nav.news')} />
          <label className="flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 focus-within:border-accent lg:w-72">
            <Search className="size-4 text-muted" aria-hidden />
            <span className="sr-only">{t('common.search')}</span>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t('news.searchPlaceholder')} className="min-w-0 flex-1 bg-transparent text-sm text-fg placeholder:text-muted focus:outline-none" />
          </label>
        </div>
        <p className="mt-6 text-sm text-muted" aria-live="polite">{query.data ? t('news.results', { count: query.data.total }) : '\u00a0'}</p>
        <div className="mt-8">
          <QueryState isLoading={query.isLoading} isError={query.isError} onRetry={query.refetch} isEmpty={!items.length} skeleton={<CardSkeletonGrid count={6} className="grid gap-8 md:grid-cols-3" itemClassName="h-96" />}>
            {() =>
            <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {items.map((a, i) =>
              <li key={a.slug} className={i === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''}>
                    <NewsCard article={a} size={i === 0 ? 'large' : 'default'} />
                  </li>
              )}
              </ul>
            }
          </QueryState>
        </div>
        {query.data?.hasMore &&
        <div className="mt-14 text-center">
            <Button variant="ghost" loading={query.isFetching} onClick={() => setPageSize((s) => s + 6)}>{t('common.loadMore')}</Button>
          </div>
        }
      </Section>
    </>);

}
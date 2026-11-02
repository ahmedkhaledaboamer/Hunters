import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useScroll } from 'framer-motion';
import { Link2, Linkedin, Twitter } from 'lucide-react';
import { NewsCard, NewsMeta } from '../../components/news/NewsCard';
import { useGetArticleQuery, useGetNewsQuery } from '../../features/news/newsApi';
import { useL } from '../../features/preferences/usePreferences';
import { useSeo } from '../../shared/lib/useSeo';
import { Container } from '../../shared/ui/Container';
import { Section } from '../../shared/ui/Section';
import { Badge } from '../../shared/ui/Badge';
import { Button } from '../../shared/ui/Button';
import { Skeleton } from '../../shared/ui/Skeleton';
import { EmptyState } from '../../shared/ui/StateViews';
import { photoSrcSet } from '../../shared/lib/image';

export function NewsDetailPage() {
  const { slug = '' } = useParams();
  const { t } = useTranslation();
  const l = useL();
  const { scrollYProgress } = useScroll();
  const { data: a, isLoading, isError } = useGetArticleQuery(slug);
  const related = useGetNewsQuery({ category: a?.category, exclude: slug, pageSize: 3 }, { skip: !a });
  const [copied, setCopied] = useState(false);
  useSeo(a ? l(a.title) : t('nav.news'), a ? l(a.excerpt) : t('news.lead'), { image: a?.image, type: a ? 'article' : 'website' });

  if (isLoading) return <Container className="pt-40"><Skeleton className="h-[60vh]" /></Container>;
  if (isError || !a)
  return (
    <Container className="py-40 text-center">
        <EmptyState title={t('news.notFound')} />
        <Button to="/news" variant="ghost" className="mt-8" arrow>{t('nav.news')}</Button>
      </Container>);


  const url = typeof window !== 'undefined' ? window.location.href : '';
  const copy = async () => {
    await navigator.clipboard?.writeText(url);
    setCopied(true);
  };
  const shareBtn = 'inline-flex size-10 items-center justify-center rounded-full border border-line text-fg transition-colors duration-150 hover:border-accent hover:text-accent-ink';

  return (
    <>
      <motion.div aria-label={t('news.progress')} role="progressbar" style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-lime-500 rtl:origin-right" />
      <article>
        <Container className="max-w-4xl pb-10 pt-36 md:pt-44">
          <Badge tone="accent">{t(`news.categories.${a.category}`)}</Badge>
          <h1 className="mt-6 text-4xl font-light leading-tight md:text-6xl">{l(a.title)}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span>{l(a.author)}</span><span aria-hidden>·</span><NewsMeta article={a} />
          </div>
        </Container>
        <Container>
          <div className="aspect-[21/9] overflow-hidden rounded-3xl border border-line bg-ink-900">
            <img src={a.image} srcSet={photoSrcSet(a.image)} sizes="(min-width: 1024px) 70vw, 100vw" alt="" className="size-full object-cover" />
          </div>
        </Container>
        <Container className="grid max-w-5xl gap-10 py-16 md:grid-cols-[60px_1fr]">
          <div className="flex gap-2 md:sticky md:top-28 md:flex-col md:self-start" aria-label={t('common.share')}>
            <a className={shareBtn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="size-4" aria-hidden /></a>
            <a className={shareBtn} href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="X"><Twitter className="size-4" aria-hidden /></a>
            <button type="button" className={shareBtn} onClick={copy} aria-label={copied ? t('common.copied') : t('common.copyLink')}><Link2 className="size-4" aria-hidden /></button>
          </div>
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-fg/85">
            <p className="text-xl font-light text-fg">{l(a.excerpt)}</p>
            {a.body.map((p, i) => <p key={i}>{l(p)}</p>)}
          </div>
        </Container>
      </article>
      {!!related.data?.items.length &&
      <Section className="border-t border-line">
          <h2 className="text-3xl font-light">{t('news.related')}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {related.data.items.map((r) => <NewsCard key={r.slug} article={r} />)}
          </div>
        </Section>
      }
    </>);

}
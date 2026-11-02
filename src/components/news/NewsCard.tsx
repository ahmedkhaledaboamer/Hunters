import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { NewsArticle } from '../../entities';
import { useL, useLocale } from '../../features/preferences/usePreferences';
import { formatDate } from '../../shared/lib/format';
import { cn } from '../../shared/lib/cn';
import { Badge } from '../../shared/ui/Badge';
import { CardArrow } from '../../shared/ui/SpotlightCard';
import { photoSrcSet } from '../../shared/lib/image';

export function NewsMeta({ article, className }: {article: NewsArticle;className?: string;}) {
  const { t } = useTranslation();
  const locale = useLocale();
  return (
    <p className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted', className)}>
      <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
      <span aria-hidden>·</span>
      <span>{t('common.minRead', { count: article.readMinutes })}</span>
    </p>);

}

export function NewsCard({ article, size = 'default', className }: {article: NewsArticle;size?: 'default' | 'large';className?: string;}) {
  const { t } = useTranslation();
  const l = useL();
  const large = size === 'large';
  return (
    <article className={cn('group relative flex h-full flex-col', className)}>
      <div className={cn('relative overflow-hidden rounded-2xl border border-line bg-ink-900', large ? 'aspect-[16/10]' : 'aspect-[16/10]')}>
        <img
          src={article.image} srcSet={photoSrcSet(article.image)} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
        
        <Badge tone="solid" className="absolute start-4 top-4">
          {t(`news.categories.${article.category}`)}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <NewsMeta article={article} />
        <h3 className={cn('mt-3 font-light leading-snug text-fg transition-colors duration-150 group-hover:text-accent-ink', large ? 'text-3xl md:text-4xl' : 'text-xl')}>
          <Link to={`/news/${article.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
            {l(article.title)}
          </Link>
        </h3>
        <p className={cn('mt-3 leading-relaxed text-muted', large ? 'text-lg' : 'line-clamp-2 text-sm')}>{l(article.excerpt)}</p>
        <div className="mt-auto pt-6">
          <CardArrow />
        </div>
      </div>
    </article>);

}
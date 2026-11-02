import { useTranslation } from 'react-i18next';
import { RefreshCw, SearchX } from 'lucide-react';
import { Button } from './Button';
import { NodeDot } from './NodeLine';
import { cn } from '../lib/cn';

export function ErrorState({ onRetry, className }: {onRetry?: () => void;className?: string;}) {
  const { t } = useTranslation();
  return (
    <div role="alert" className={cn('glass flex flex-col items-center rounded-2xl px-6 py-14 text-center', className)}>
      <div className="flex items-center gap-1" aria-hidden>
        <NodeDot pulse={false} />
        <span className="h-px w-8 bg-line-strong" />
        <span className="h-px w-3 -rotate-12 bg-line-strong" />
        <span className="h-px w-8 bg-line-strong" />
      </div>
      <h3 className="mt-6 text-xl font-light">{t('common.errorTitle')}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{t('common.errorBody')}</p>
      {onRetry &&
      <Button variant="ghost" size="sm" className="mt-6" onClick={onRetry} icon={<RefreshCw className="size-4" aria-hidden />}>
          {t('common.retry')}
        </Button>
      }
    </div>);

}

export function EmptyState({ title, body, className }: {title?: string;body?: string;className?: string;}) {
  const { t } = useTranslation();
  return (
    <div className={cn('flex flex-col items-center rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center', className)}>
      <SearchX className="size-6 text-muted" aria-hidden />
      <h3 className="mt-4 text-lg font-light">{title ?? t('common.emptyTitle')}</h3>
      <p className="mt-1 text-sm text-muted">{body ?? t('common.emptyBody')}</p>
    </div>);

}
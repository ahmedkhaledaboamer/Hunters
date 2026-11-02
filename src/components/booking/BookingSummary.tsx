import { cn } from '../../shared/lib/cn';
import { useBookingSummary } from './useBookingSummary';

export function BookingSummary({ className }: {className?: string;}) {
  const rows = useBookingSummary();
  return (
    <dl className={cn('divide-y divide-line', className)}>
      {rows.map((r) =>
      <div key={r.key} className="py-4 first:pt-0 last:pb-0">
          <dt className="text-xs text-muted">{r.label}</dt>
          <dd className={cn('mt-1 text-sm', r.value ? 'text-fg' : 'text-muted/60')}>{r.value ?? '—'}</dd>
        </div>
      )}
    </dl>);

}
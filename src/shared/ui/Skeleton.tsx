import { cn } from '../lib/cn';

export function Skeleton({ className }: {className?: string;}) {
  return <div aria-hidden className={cn('animate-pulse rounded-xl bg-fg/[0.06]', className)} />;
}

export function CardSkeletonGrid({ count = 4, className, itemClassName }: {count?: number;className?: string;itemClassName?: string;}) {
  return (
    <div className={className} role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      {Array.from({ length: count }, (_, i) =>
      <Skeleton key={i} className={cn('h-64 rounded-2xl', itemClassName)} />
      )}
    </div>);

}
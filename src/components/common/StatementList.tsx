import type { L } from '../../entities';
import { useL } from '../../features/preferences/usePreferences';
import { RevealGroup, RevealItem } from '../../shared/motion/Reveal';
import { cn } from '../../shared/lib/cn';

/** Numbered list of statements separated by hairlines. */
export function StatementList({ items, className, columns = 1 }: {items: L[];className?: string;columns?: 1 | 2;}) {
  const l = useL();
  return (
    <RevealGroup as="ol" className={cn('grid border-t border-line', columns === 2 && 'sm:grid-cols-2 sm:gap-x-10', className)} step={0.04}>
      {items.map((item, i) =>
      <RevealItem as="li" key={item.en} className="flex items-baseline gap-4 border-b border-line py-4">
          <span dir="ltr" className="font-latin text-xs tabular-nums text-accent-ink">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="leading-relaxed text-fg/90">{l(item)}</span>
        </RevealItem>
      )}
    </RevealGroup>);

}
import type { Pillar } from '../../entities';
import { useL } from '../../features/preferences/usePreferences';
import { icons } from '../../shared/lib/icons';
import { cn } from '../../shared/lib/cn';
import { RevealGroup, RevealItem } from '../../shared/motion/Reveal';

/** Static, non-interactive grid of icon + title + description items, divided by hairlines. */
export function PillarGrid({ items, columns = 3, numbered = false }: {items: Pillar[];columns?: 2 | 3 | 4;numbered?: boolean;}) {
  const l = useL();
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns];
  return (
    <RevealGroup className={cn('grid gap-px overflow-hidden rounded-3xl border border-line bg-line', cols)}>
      {items.map((item, i) => {
        const Icon = icons[item.icon];
        return (
          <RevealItem key={item.id} className="relative flex flex-col bg-bg p-8">
            <div className="flex items-center justify-between">
              <Icon className="size-6 text-accent-ink" strokeWidth={1.4} aria-hidden />
              {numbered &&
              <span dir="ltr" className="font-latin text-xs tabular-nums text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
              }
            </div>
            <h3 className="mt-10 text-xl font-light text-fg">{l(item.title)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{l(item.description)}</p>
          </RevealItem>);

      })}
    </RevealGroup>);

}
import React, { useId, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/cn';
import { quick } from '../motion/variants';

export interface TabItem<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}

/** Segmented tabs with a sliding indicator and arrow-key navigation (direction-aware). */
export function Tabs<T extends string>({ items, value, onChange, label, className }: TabsProps<T>) {
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const rtl = document.documentElement.dir === 'rtl';
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
    const backward = rtl ? 'ArrowRight' : 'ArrowLeft';
    let next = -1;
    if (e.key === forward) next = (i + 1) % items.length;
    if (e.key === backward) next = (i - 1 + items.length) % items.length;
    if (next < 0) return;
    e.preventDefault();
    refs.current[next]?.focus();
    onChange(items[next].value);
  }

  return (
    <div role="tablist" aria-label={label} className={cn('no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 py-1', className)}>
      {items.map((item, i) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onKeyDown={(e) => onKeyDown(e, i)}
            onClick={() => onChange(item.value)}
            className={cn(
              'relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors duration-150',
              active ? 'text-ink-950' : 'text-muted hover:text-fg'
            )}>
            
            {active && <motion.span layoutId={`tab-${id}`} transition={quick} className="absolute inset-0 rounded-full bg-lime-500" />}
            <span className="relative flex items-center gap-2">
              {item.label}
              {item.count !== undefined && <span className={cn('text-xs tabular-nums', active ? 'text-ink-950/60' : 'text-muted')}>{item.count}</span>}
            </span>
          </button>);

      })}
    </div>);

}
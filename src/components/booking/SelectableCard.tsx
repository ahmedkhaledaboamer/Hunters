import { type ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../shared/lib/cn';

interface SelectableCardProps {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
  className?: string;
}

/** Radio-style selectable card used across the booking wizard. */
export function SelectableCard({ selected, onSelect, children, className }: SelectableCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        'group relative flex h-full w-full flex-col rounded-2xl border p-5 text-start transition-[border-color,background-color,box-shadow] duration-150',
        selected ?
        'border-lime-500 bg-lime-500/10 shadow-[0_0_0_1px_var(--color-lime-500)]' :
        'border-line bg-surface hover:border-line-strong',
        className
      )}>
      
      <span
        aria-hidden
        className={cn(
          'absolute end-4 top-4 inline-flex size-5 items-center justify-center rounded-full border transition-colors duration-150',
          selected ? 'border-lime-500 bg-lime-500 text-ink-950' : 'border-line-strong'
        )}>
        
        {selected && <Check className="size-3" strokeWidth={3} />}
      </span>
      {children}
    </button>);

}
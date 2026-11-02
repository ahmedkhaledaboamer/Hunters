import { type ReactNode } from 'react';
import { cn } from '../lib/cn';

type Tone = 'default' | 'accent' | 'outline' | 'solid';

const tones: Record<Tone, string> = {
  default: 'bg-fg/[0.06] text-fg/80',
  accent: 'bg-lime-500/15 text-accent-ink ring-1 ring-inset ring-lime-500/30',
  outline: 'ring-1 ring-inset ring-line-strong text-muted',
  solid: 'bg-lime-500 text-ink-950'
};

export function Badge({ children, tone = 'default', className }: {children: ReactNode;tone?: Tone;className?: string;}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium', tones[tone], className)}>
      {children}
    </span>);

}
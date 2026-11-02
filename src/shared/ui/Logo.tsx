import { cn } from '../lib/cn';

/** The H mark: two uprights, with a crossbar that extends to a round node on the left. */
export function LogoMark({ className }: {className?: string;}) {
  return (
    <svg viewBox="0 0 112 100" className={cn('h-8 w-auto', className)} aria-hidden>
      <g className="fill-lime-500 stroke-ink-950/70 stroke-[1.5] [paint-order:stroke] dark:stroke-0">
        <rect x="34" y="4" width="15" height="92" rx="7.5" />
        <rect x="76" y="6" width="15" height="86" rx="7.5" />
        <rect x="16" y="43" width="90" height="13" rx="3" />
      </g>
      <circle cx="13" cy="49.5" r="10" className="fill-lime-500 stroke-ink-950/70 stroke-[1.5] [paint-order:stroke] dark:stroke-0" />
    </svg>);

}

export function Logo({ className, withTagline = false }: {className?: string;withTagline?: boolean;}) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)} dir="ltr">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-latin text-lg font-extralight tracking-[0.28em] text-fg">HUNTERS</span>
        {withTagline && <span className="mt-1.5 font-latin text-[9px] font-light tracking-[0.3em] text-muted">SOFTWARE &amp; AI SERVICES</span>}
      </span>
    </span>);

}
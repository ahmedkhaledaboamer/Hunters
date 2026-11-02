import { cn } from '../../shared/lib/cn';

/** Generic placeholder logo glyph — no real company marks are used. */
export function PartnerLogo({ monogram, name, className }: {monogram: string;name: string;className?: string;}) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)} dir="ltr">
      <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden>
        <rect x="1" y="1" width="38" height="38" rx="10" className="fill-none stroke-current" strokeWidth="1.2" />
        <circle cx="11" cy="20" r="3" className="fill-current" />
        <line x1="14" y1="20" x2="30" y2="20" className="stroke-current" strokeWidth="1.2" />
        <text x="24" y="16" textAnchor="middle" className="fill-current font-latin" fontSize="9" fontWeight="500">
          {monogram}
        </text>
      </svg>
      <span className="whitespace-nowrap font-latin text-base font-light tracking-wide">{name}</span>
    </span>);

}
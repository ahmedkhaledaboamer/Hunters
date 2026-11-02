import { Link } from 'react-router-dom';
import type { Industry } from '../../entities';
import { useL } from '../../features/preferences/usePreferences';
import { icons } from '../../shared/lib/icons';
import { cn } from '../../shared/lib/cn';
import { CardArrow } from '../../shared/ui/SpotlightCard';
import { photoSrcSet } from '../../shared/lib/image';

/** Image-led card. Text sits on a dark overlay so it stays legible in both themes. */
export function IndustryCard({ industry, className }: {industry: Industry;className?: string;}) {
  const l = useL();
  const Icon = icons[industry.icon];
  return (
    <Link
      to={`/industries/${industry.slug}`}
      className={cn('group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-ink-900', className)}>
      
      <img
        src={industry.image} srcSet={photoSrcSet(industry.image)} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
      
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/50 to-ink-950/0" />
      <span className="border-beam" aria-hidden />
      <div className="absolute inset-0 flex flex-col p-6 text-white">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/20 bg-ink-950/40 backdrop-blur-md">
          <Icon className="size-5 text-lime-500" strokeWidth={1.5} aria-hidden />
        </span>
        <div className="mt-auto">
          <h3 className="text-2xl font-light leading-tight">{l(industry.title)}</h3>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {industry.focus.slice(0, 3).map((f) =>
            <li key={f.en} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/85 backdrop-blur">
                {l(f)}
              </li>
            )}
          </ul>
          <CardArrow className="mt-6 border-white/30 text-white" />
        </div>
      </div>
    </Link>);

}
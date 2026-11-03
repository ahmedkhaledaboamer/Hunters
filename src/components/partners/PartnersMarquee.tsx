import { Link } from 'react-router-dom';
import type { Partner } from '../../entities';
import { useGetPartnersQuery } from '../../features/partners/partnersApi';
import { useL } from '../../features/preferences/usePreferences';
import { Skeleton } from '../../shared/ui/Skeleton';
import { ErrorState } from '../../shared/ui/StateViews';
import { cn } from '../../shared/lib/cn';
import { PartnerLogo } from './PartnerLogo';

/** Two infinite rows of glass cards moving in opposite directions; pause on hover. */
export function PartnersMarquee() {
  const { data, isLoading, isError, refetch } = useGetPartnersQuery();
  if (isLoading) return <Skeleton className="h-40" />;
  if (isError || !data) return <ErrorState onRetry={refetch} />;
  const half = Math.ceil(data.length / 2);
  return (
    <div dir="ltr" className="-my-6 flex flex-col gap-4 py-6 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <Row partners={data.slice(0, half)} reverse={false} />
      <Row partners={data.slice(half)} reverse />
    </div>);

}

function Row({ partners, reverse }: {partners: Partner[];reverse: boolean;}) {
  const l = useL();
  const items = [...partners, ...partners, ...partners, ...partners];
  return (
    // Vertical room (offset by negative margins) so a lifted card and its glow are not clipped by the row.
    // The row ignores the pointer (only cards take it), so the overlapping room never steals a neighbour row's hover.
    <div className="group pointer-events-none -my-6 overflow-hidden py-6">
      <ul className={cn('flex w-max gap-4 group-hover:[animation-play-state:paused]', reverse ? 'animate-marquee-reverse' : 'animate-marquee')}>
        {items.map((p, i) =>
        <li key={`${p.slug}-${i}`} aria-hidden={i >= partners.length || undefined}>
            <Link
            to={`/partners/${p.slug}`}
            tabIndex={i >= partners.length ? -1 : undefined}
            className="group/card pointer-events-auto flex h-24 items-center rounded-2xl border border-line bg-surface px-6 text-fg/80 shadow-[0_18px_44px_-22px_rgb(0_0_0/0.45)] backdrop-blur-md transition-[color,border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-lime-500/60 hover:text-fg hover:shadow-[0_22px_56px_-20px_rgb(215_247_30/0.45)] dark:shadow-[0_24px_50px_-24px_rgb(0_0_0/0.9)]">
            
              <span className="flex flex-col gap-1">
                <PartnerLogo monogram={p.monogram} name={p.name} className="[&_svg]:transition-colors group-hover/card:[&_svg]:text-accent-ink" />
                <span dir="auto" className="pl-12 text-left text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 group-hover/card:text-accent-ink">
                  {l(p.type)}
                </span>
              </span>
            </Link>
          </li>
        )}
      </ul>
    </div>);

}
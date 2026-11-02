import { Link } from 'react-router-dom';
import type { Partner } from '../../entities';
import { useGetPartnersQuery } from '../../features/partners/partnersApi';
import { useL } from '../../features/preferences/usePreferences';
import { Skeleton } from '../../shared/ui/Skeleton';
import { ErrorState } from '../../shared/ui/StateViews';
import { cn } from '../../shared/lib/cn';
import { PartnerLogo } from './PartnerLogo';

/** Two infinite rows of glass cards moving in opposite directions; pause on hover. Meant to sit on a dark backdrop. */
export function PartnersMarquee() {
  const { data, isLoading, isError, refetch } = useGetPartnersQuery();
  if (isLoading) return <Skeleton className="h-40" />;
  if (isError || !data) return <ErrorState onRetry={refetch} />;
  const half = Math.ceil(data.length / 2);
  return (
    <div dir="ltr" className="flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <Row partners={data.slice(0, half)} reverse={false} />
      <Row partners={data.slice(half)} reverse />
    </div>);

}

function Row({ partners, reverse }: {partners: Partner[];reverse: boolean;}) {
  const l = useL();
  const items = [...partners, ...partners, ...partners, ...partners];
  return (
    <div className="group overflow-hidden">
      <ul className={cn('flex w-max gap-4 group-hover:[animation-play-state:paused]', reverse ? 'animate-marquee-reverse' : 'animate-marquee')}>
        {items.map((p, i) =>
        <li key={`${p.slug}-${i}`} aria-hidden={i >= partners.length || undefined}>
            <Link
            to={`/partners/${p.slug}`}
            tabIndex={i >= partners.length ? -1 : undefined}
            className="group/card flex h-24 items-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 text-white/70 backdrop-blur-md transition-[color,background-color,border-color,box-shadow] duration-300 hover:border-lime-500/60 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_40px_-12px_rgb(215_247_30/0.6)]">
            
              <span className="flex flex-col gap-1">
                <PartnerLogo monogram={p.monogram} name={p.name} className="[&_svg]:transition-colors group-hover/card:[&_svg]:text-lime-500" />
                <span dir="auto" className="pl-12 text-left text-[11px] uppercase tracking-[0.18em] text-white/40 transition-colors duration-300 group-hover/card:text-lime-500/90">
                  {l(p.type)}
                </span>
              </span>
            </Link>
          </li>
        )}
      </ul>
    </div>);

}
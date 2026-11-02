import { useGetPillarsQuery } from '../../features/content/contentApi';
import { useL } from '../../features/preferences/usePreferences';
import { icons } from '../../shared/lib/icons';
import { cn } from '../../shared/lib/cn';
import { QueryState } from '../../shared/ui/QueryState';
import { CardSkeletonGrid } from '../../shared/ui/Skeleton';
import { RevealGroup, RevealItem } from '../../shared/motion/Reveal';
import { photoSrcSet } from '../../shared/lib/image';

const spans = [
'lg:col-span-2 lg:row-span-2',
'lg:col-span-2',
'',
'',
'lg:col-span-2',
'',
''];

/** Photo backdrops for the large tiles, keyed by pillar id. */
const images: Record<string, string> = {
  'business-first': '/c2eadb64-58b4-425f-9fa3-a2cae684df4e.webp',
  integrated: '/1f9a226c-ef70-40ca-b110-b7e076324db0.webp',
  scalable: '/7396decc-4313-4eb0-ba97-7222a3748381.webp'
};


/** Bento grid of the seven "Why H HUNTERS" pillars. The first pillar leads. */
export function WhyBento() {
  const l = useL();
  const query = useGetPillarsQuery('why');

  return (
    <QueryState
      isLoading={query.isLoading}
      isError={query.isError}
      onRetry={query.refetch}
      skeleton={<CardSkeletonGrid count={6} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" itemClassName="h-56" />}>
      
      {() =>
      <RevealGroup className="grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-4">
          {(query.data ?? []).map((pillar, i) => {
          const Icon = icons[pillar.icon];
          const lead = i === 0;
          const image = images[pillar.id];
          return (
            <RevealItem key={pillar.id} className={cn('glass group relative flex flex-col overflow-hidden rounded-2xl p-7', image && 'dark', spans[i])}>
                {image &&
                <>
                    <img
                    src={image} srcSet={photoSrcSet(image)} sizes="(min-width: 1024px) 50vw, 100vw"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover opacity-60 transition-[transform,opacity] duration-700 ease-out group-hover:scale-105 group-hover:opacity-75" />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
                  </>
                }
                {lead && !image && <LeadGraphic />}
                <Icon className={cn('relative text-accent-ink', lead ? 'size-8' : 'size-6')} strokeWidth={1.4} aria-hidden />
                <div className="relative mt-auto pt-10">
                  <p className="font-latin text-xs uppercase tracking-[0.2em] text-muted rtl:hidden">
                    {pillar.title.en}
                  </p>
                  <h3 className={cn('mt-2 font-light text-fg rtl:mt-0', lead ? 'text-3xl md:text-4xl' : 'text-xl')}>{l(pillar.title)}</h3>
                  <p className={cn('mt-3 leading-relaxed text-muted', lead ? 'max-w-md text-lg' : 'text-sm')}>{l(pillar.description)}</p>
                </div>
              </RevealItem>);

        })}
        </RevealGroup>
      }
    </QueryState>);

}

/** Node-line constellation for the lead tile. */
function LeadGraphic() {
  const nodes = [
  [40, 60],
  [140, 30],
  [230, 90],
  [320, 40],
  [180, 150],
  [300, 170]];

  const links = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 4],
  [4, 5],
  [2, 5]];

  return (
    <svg viewBox="0 0 360 200" className="pointer-events-none absolute end-0 top-0 h-48 w-auto opacity-80 rtl:-scale-x-100" aria-hidden>
      {links.map(([a, b]) =>
      <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className="stroke-line-strong" strokeWidth="1" />
      )}
      {nodes.map(([x, y], i) =>
      <circle key={i} cx={x} cy={y} r={i === 2 ? 5 : 3} className={i === 2 ? 'fill-accent' : 'fill-fg/30'} />
      )}
    </svg>);

}
import { motion, useReducedMotion } from 'framer-motion';
import type { Market } from '../../entities';
import { useL } from '../../features/preferences/usePreferences';
import { cn } from '../../shared/lib/cn';

const project = (lon: number, lat: number) => ({ x: (lon - 28) * 20, y: (34 - lat) * 20 });

// Stylized, simplified outlines (not to scale) — drawn as dot-matrix fills.
const PENINSULA =
'132,92 170,40 220,36 280,50 370,98 400,82 410,120 440,150 456,186 464,158 472,174 472,188 480,200 528,194 546,174 562,156 568,182 590,204 612,208 636,230 616,270 596,300 540,340 480,360 410,400 340,424 306,426 296,370 260,300 220,250 200,200 170,160 136,120';
const NORTH =
'124,54 130,-44 170,-44 210,-56 280,-64 326,-64 680,-64 680,170 600,160 560,150 520,150 470,120 430,90 400,82 370,98 280,50 220,36 170,40 132,92';
// Anatolia (Türkiye), north of the original frame — the viewBox extends upward to include it.
const TURKEY =
'-40,-120 -30,-152 20,-144 70,-144 140,-160 200,-140 270,-150 310,-142 336,-114 326,-64 280,-64 210,-56 170,-44 156,-56 120,-44 80,-42 40,-46 0,-56 -16,-72 -32,-96';
const EGYPT = '0,60 60,50 86,54 124,54 138,90 126,126 92,82 118,140 152,202 178,240 0,240';

interface RegionMapProps {
  hub: {lon: number;lat: number;name: string;};
  markets: Market[];
  className?: string;
}

/** GCC / MENA reach map with a pulsing Abu Dhabi node and animated arcs to regional markets. */
export function RegionMap({ hub, markets, className }: RegionMapProps) {
  const l = useL();
  const reduce = useReducedMotion();
  const origin = project(hub.lon, hub.lat);

  return (
    <div dir="ltr" className={cn('relative', className)}>
      <svg viewBox="-50 -175 730 615" className="h-auto w-full" role="img" aria-label={`${hub.name} — ${markets.map((m) => l(m.name)).join(', ')}`}>
        <defs>
          <pattern id="map-dots" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" className="fill-fg" />
          </pattern>
        </defs>
        <polygon points={NORTH} fill="url(#map-dots)" opacity="0.12" />
        <polygon points={TURKEY} fill="url(#map-dots)" opacity="0.22" />
        <polygon points={EGYPT} fill="url(#map-dots)" opacity="0.18" />
        <polygon points={PENINSULA} fill="url(#map-dots)" opacity="0.32" />

        {markets.map((m, i) => {
          const p = project(m.lon, m.lat);
          const dist = Math.hypot(p.x - origin.x, p.y - origin.y);
          const cx = (p.x + origin.x) / 2;
          const cy = (p.y + origin.y) / 2 - dist * 0.35;
          const d = `M ${origin.x} ${origin.y} Q ${cx} ${cy} ${p.x} ${p.y}`;
          return (
            <g key={m.id}>
              <motion.path
                d={d}
                fill="none"
                className="stroke-accent"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.15 * i, ease: [0.65, 0, 0.35, 1] }} />
              
              {!reduce &&
              <circle r="2.6" className="fill-accent">
                  <animateMotion dur={`${2.4 + i % 3 * 0.4}s`} repeatCount="indefinite" path={d} begin={`${0.9 + i * 0.3}s`} />
                </circle>
              }
              <circle cx={p.x} cy={p.y} r="4" className="fill-bg stroke-fg/60" strokeWidth="1.2" />
              <text x={p.x} y={p.y + 18} textAnchor="middle" className="fill-fg/70 font-arabic" fontSize="12">
                {l(m.name)}
              </text>
            </g>);

        })}

        <g>
          {!reduce &&
          <motion.circle
            cx={origin.x}
            cy={origin.y}
            r="7"
            className="fill-accent"
            // Grow with a transform (from the circle's own centre) rather than animating the r attribute,
            // which framer can briefly set to "undefined" and which repaints more.
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={{ scale: [1, 4], opacity: [0.45, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }} />

          }
          <circle cx={origin.x} cy={origin.y} r="7" className="fill-accent" />
          <circle cx={origin.x} cy={origin.y} r="2.5" className="fill-bg" />
          <text x={origin.x + 14} y={origin.y - 12} className="fill-fg font-arabic" fontSize="14" fontWeight="500">
            {hub.name}
          </text>
        </g>
      </svg>
    </div>);

}
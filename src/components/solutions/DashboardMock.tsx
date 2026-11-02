import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Clock, Flag } from 'lucide-react';
import { cn } from '../../shared/lib/cn';
import { Badge } from '../../shared/ui/Badge';
import { EASE_OUT } from '../../shared/motion/variants';

type Status = 'onTrack' | 'atRisk' | 'delayed';

// Illustrative values only — not performance data.
const initiativeStatus: Status[] = ['onTrack', 'atRisk', 'onTrack', 'delayed'];
const initiativeProgress = [0.72, 0.48, 0.61, 0.3];
const statusClass: Record<Status, string> = {
  onTrack: 'bg-lime-500',
  atRisk: 'bg-amber-400',
  delayed: 'bg-red-400'
};
const alertIcons = [Clock, Flag, AlertTriangle];

/** Stylized, animated executive dashboard (illustrative UI only). */
export function DashboardMock() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const reduce = useReducedMotion();
  const items = t('solutions.dashboard.items', { returnObjects: true }) as string[];
  const depts = t('solutions.dashboard.depts', { returnObjects: true }) as string[];
  const alerts = t('solutions.dashboard.alertItems', { returnObjects: true }) as string[];
  const [bars, setBars] = useState([0.55, 0.78, 0.42, 0.66, 0.5]);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setBars((b) => b.map(() => 0.3 + Math.random() * 0.6)), 2800);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="glass overflow-hidden rounded-3xl" aria-label={t('common.illustrative')} role="img">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2" aria-hidden>
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="size-2.5 rounded-full bg-fg/15" />
          <span className="size-2.5 rounded-full bg-fg/15" />
        </div>
        <p className="text-sm text-fg/80">{t('solutions.dashboard.title')}</p>
        <Badge tone="outline">{t('common.illustrative')}</Badge>
      </div>

      <div className="grid gap-px bg-line md:grid-cols-[1.2fr_1fr]">
        <div className="bg-bg/60 p-5">
          <p className="text-xs text-muted">{t('solutions.dashboard.initiatives')}</p>
          <ul className="mt-4 space-y-4">
            {items.map((item, i) =>
            <li key={item}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate text-fg">{item}</span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap text-xs text-muted">
                    <span className={cn('size-1.5 rounded-full', statusClass[initiativeStatus[i]])} />
                    {t(`solutions.dashboard.${initiativeStatus[i]}`)}
                  </span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-fg/[0.07]">
                  <motion.div
                  className={cn('h-full origin-left rounded-full rtl:origin-right', statusClass[initiativeStatus[i]])}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: inView ? initiativeProgress[i] : 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * i, ease: EASE_OUT }} />
                
                </div>
              </li>
            )}
          </ul>
        </div>

        <div className="bg-bg/60 p-5">
          <p className="text-xs text-muted">{t('solutions.dashboard.departments')}</p>
          <div className="mt-4 flex h-36 items-end gap-3" aria-hidden>
            {bars.map((h, i) =>
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <motion.div
                className={cn('w-full origin-bottom rounded-t-md', i === 1 ? 'bg-lime-500' : 'bg-fg/15')}
                style={{ height: '100%' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: inView ? h : 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT }} />
              
              </div>
            )}
          </div>
          <div className="mt-2 flex gap-3 text-[10px] text-muted">
            {depts.map((d) =>
            <span key={d} className="flex-1 truncate text-center">
                {d}
              </span>
            )}
          </div>
          <svg viewBox="0 0 200 50" className="mt-4 h-12 w-full" aria-hidden>
            <motion.path
              d="M0 40 C 20 38, 30 20, 50 24 S 80 40, 100 28 S 140 8, 160 16 S 190 10, 200 6"
              fill="none"
              className="stroke-accent"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: inView ? 1 : 0 }}
              transition={{ duration: 1, ease: EASE_OUT }} />
            
          </svg>
        </div>

        <div className="bg-bg/60 p-5 md:col-span-2">
          <p className="text-xs text-muted">{t('solutions.dashboard.alerts')}</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {alerts.map((a, i) => {
              const Icon = alertIcons[i % alertIcons.length];
              return (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
                  transition={{ duration: 0.25, delay: 0.3 + i * 0.08, ease: EASE_OUT }}
                  className="flex items-start gap-2 rounded-xl border border-line p-3 text-xs text-fg/85">
                  
                  <Icon className="mt-0.5 size-3.5 shrink-0 text-accent-ink" aria-hidden />
                  {a}
                </motion.li>);

            })}
          </ul>
        </div>
      </div>
    </div>);

}
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Bot, CheckCircle2 } from 'lucide-react';
import { chatScript } from '../../data/company';
import { useL } from '../../features/preferences/usePreferences';
import { cn } from '../../shared/lib/cn';
import { Badge } from '../../shared/ui/Badge';
import { EASE_OUT } from '../../shared/motion/variants';

const STEP_MS = 1700;

/** Animated assistant conversation that loops while in view (illustrative). */
export function ChatMock() {
  const { t } = useTranslation();
  const l = useL();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? chatScript.length : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setTimeout(
      () => setCount((c) => c >= chatScript.length ? 0 : c + 1),
      count >= chatScript.length ? STEP_MS * 2.5 : count === 0 ? 400 : STEP_MS
    );
    return () => window.clearTimeout(id);
  }, [count, inView, reduce]);

  const next = chatScript[count];
  const typing = !reduce && next?.from === 'assistant';

  return (
    <div ref={ref} className="glass flex h-[520px] flex-col overflow-hidden rounded-3xl">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-lime-500 text-ink-950">
          <Bot className="size-5" aria-hidden />
        </span>
        <div className="flex-1">
          <p className="text-sm text-fg">{t('solutions.chat.title')}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <span className="size-1.5 rounded-full bg-lime-500" aria-hidden />
            {t('solutions.chat.status')}
          </p>
        </div>
        <Badge tone="outline">{t('common.illustrative')}</Badge>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-3 overflow-hidden p-5" aria-live="polite">
        <AnimatePresence initial={false}>
          {chatScript.slice(0, count).map((msg, i) =>
          <motion.div
            key={`${i}-${msg.text.en}`}
            layout
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className={cn(
              'max-w-[85%] text-sm leading-relaxed',
              msg.from === 'user' && 'self-end rounded-2xl rounded-ee-md bg-fg/[0.07] px-4 py-3 text-fg',
              msg.from === 'assistant' && 'self-start rounded-2xl rounded-es-md border border-lime-500/30 bg-lime-500/10 px-4 py-3 text-fg',
              msg.from === 'system' && 'flex items-center gap-2 self-center rounded-full border border-line px-3 py-1.5 text-xs text-muted'
            )}>
            
              {msg.from === 'system' && <CheckCircle2 className="size-3.5 text-accent-ink" aria-hidden />}
              {l(msg.text)}
            </motion.div>
          )}
          {typing && inView &&
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1 self-start rounded-full border border-line px-4 py-3"
            aria-label={t('solutions.chat.typing')}>
            
              {[0, 1, 2].map((d) =>
            <motion.span
              key={d}
              className="size-1.5 rounded-full bg-fg/50"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }} />

            )}
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}
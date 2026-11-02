import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '../../shared/lib/cn';
import { EASE_OUT } from '../../shared/motion/variants';

interface BookingProgressProps {
  step: number;
  onStepClick: (step: number) => void;
}

/** Progress as a node line: completed nodes are lime and clickable. */
export function BookingProgress({ step, onStepClick }: BookingProgressProps) {
  const { t } = useTranslation();
  const steps = t('book.steps', { returnObjects: true }) as string[];
  const ratio = step / (steps.length - 1);

  return (
    <nav aria-label={t('book.stepOf', { current: step + 1, total: steps.length })}>
      <p className="mb-4 text-sm text-muted sm:hidden">
        {t('book.stepOf', { current: step + 1, total: steps.length })} · <span className="text-fg">{steps[step]}</span>
      </p>
      <div className="relative">
        <div aria-hidden className="absolute inset-x-[10px] top-[9px] h-px bg-line">
          <motion.div
            className="h-full origin-left bg-accent rtl:origin-right"
            animate={{ scaleX: ratio }}
            transition={{ duration: 0.3, ease: EASE_OUT }} />
          
        </div>
        <ol className="relative flex justify-between">
          {steps.map((label, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={label} className="flex flex-col items-center gap-3">
                <button
                  type="button"
                  disabled={!done}
                  onClick={() => onStepClick(i)}
                  aria-current={current ? 'step' : undefined}
                  aria-label={`${i + 1}. ${label}`}
                  className={cn(
                    'relative flex size-5 items-center justify-center rounded-full border bg-bg transition-colors duration-200',
                    done || current ? 'border-accent' : 'border-line-strong',
                    done && 'cursor-pointer'
                  )}>
                  
                  <span className={cn('size-2 rounded-full transition-colors duration-200', done || current ? 'bg-accent' : 'bg-transparent')} />
                  {current && <span aria-hidden className="absolute inset-0 rounded-full bg-accent/40 animate-node-pulse" />}
                </button>
                <span className={cn('hidden whitespace-nowrap text-xs sm:block', current ? 'text-fg' : 'text-muted')}>{label}</span>
              </li>);

          })}
        </ol>
      </div>
    </nav>);

}
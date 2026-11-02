import { type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { useLabel } from '../../i18n/labels';
import { Reveal } from '../motion/Reveal';
import { SplitText } from '../motion/SplitText';

interface SectionHeadingProps {
  eyebrow: string;
  index?: string;
  title: string;
  description?: ReactNode;
  align?: 'start' | 'center';
  action?: ReactNode;
  id?: string;
  className?: string;
  as?: 'h1' | 'h2';
}

export function Eyebrow({ children, index, className }: {children: ReactNode;index?: string;className?: string;}) {
  const label = useLabel();
  return (
    <p className={cn('eyebrow flex items-center gap-3', className)}>
      {index && <span dir="ltr" className="text-muted tabular-nums">{index}</span>}
      {index && <span aria-hidden className="h-0.5 w-6 rounded-full bg-lime-500" />}
      <span>{typeof children === 'string' ? label(children) : children}</span>
    </p>);

}

export function SectionHeading({ eyebrow, index, title, description, align = 'start', action, id, className, as = 'h2' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div className={cn('flex flex-col gap-8 md:flex-row md:items-end md:justify-between', centered && 'md:flex-col md:items-center', className)}>
      <div className={cn('max-w-3xl', centered && 'mx-auto text-center')}>
        <Eyebrow index={index} className={cn(centered && 'justify-center')}>
          {eyebrow}
        </Eyebrow>
        <div id={id}>
          <SplitText
            as={as}
            text={title}
            className="mt-5 text-headline font-light tracking-tight text-fg rtl:leading-[1.3] rtl:tracking-normal" />
          
        </div>
        {description &&
        <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{description}</p>
          </Reveal>
        }
      </div>
      {action && <Reveal className="shrink-0">{action}</Reveal>}
    </div>);

}
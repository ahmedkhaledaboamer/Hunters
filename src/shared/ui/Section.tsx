import { type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  glow?: 'start' | 'end' | 'center';
  grid?: boolean;
  wide?: boolean;
  'aria-labelledby'?: string;
}

const glowPosition = {
  start: '-start-40 top-0',
  end: '-end-40 top-1/3',
  center: 'start-1/2 -translate-x-1/2 rtl:translate-x-1/2 top-0'
};

export function Section({ children, id, className, containerClassName, glow, grid, wide, ...rest }: SectionProps) {
  return (
    <section id={id} className={cn('relative scroll-mt-24 overflow-x-clip py-14 md:py-20 lg:py-24', className)} {...rest}>
      {grid &&
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />

      }
      {glow &&
      <div aria-hidden className={cn('pointer-events-none absolute size-[640px] rounded-full glow-radial opacity-80', glowPosition[glow])} />
      }
      <Container wide={wide} className={cn('relative', containerClassName)}>
        {children}
      </Container>
    </section>);

}
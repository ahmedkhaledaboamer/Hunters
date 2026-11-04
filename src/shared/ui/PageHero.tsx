import { type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Reveal } from '../motion/Reveal';
import { SplitText } from '../motion/SplitText';
import { Container } from './Container';
import { NodeLine } from './NodeLine';
import { Eyebrow } from './SectionHeading';
import { brandify } from '../lib/brand';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
}

export function PageHero({ eyebrow, title, lead, children, aside, className }: PageHeroProps) {
  return (
    <header className={cn('relative overflow-hidden pb-16 pt-36 md:pb-20 md:pt-44', className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
      <div aria-hidden className="pointer-events-none absolute -top-40 start-1/4 size-[720px] rounded-full glow-radial" />
      <Container className="relative">
        <div className={cn('grid gap-12', aside && 'lg:grid-cols-[1.4fr_1fr] lg:items-end')}>
          <div>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <SplitText
              as="h1"
              trigger="mount"
              delay={0.05}
              text={title}
              className="mt-6 max-w-5xl text-display font-extralight tracking-[-0.03em] text-fg rtl:font-light rtl:leading-[1.2] rtl:tracking-normal" />
            
            {lead &&
            <Reveal delay={0.15}>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{brandify(lead)}</p>
              </Reveal>
            }
            {children && <Reveal delay={0.2} className="mt-10">{children}</Reveal>}
          </div>
          {aside && <Reveal delay={0.2}>{aside}</Reveal>}
        </div>
        <NodeLine className="mt-16 md:mt-20" />
      </Container>
    </header>);

}
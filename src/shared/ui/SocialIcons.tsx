import { cn } from '../lib/cn';

const paths = {
  linkedin:
  'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.04h4.56V23H.22V8.04zM8.34 8.04h4.37v2.04h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 6.99V23h-4.56v-7.43c0-1.77-.03-4.05-2.47-4.05-2.47 0-2.85 1.93-2.85 3.92V23H8.34V8.04z',
  x: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z',
  instagram:
  'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.3.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z',
  youtube:
  'M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 00.5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 002.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 002.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z'
} as const;

export type SocialName = keyof typeof paths;

const socialLinks: {name: SocialName;label: string;href: string;}[] = [
{ name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com' },
{ name: 'x', label: 'X', href: 'https://x.com' },
{ name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com' },
{ name: 'youtube', label: 'YouTube', href: 'https://www.youtube.com' }];


export function SocialIcon({ name, className }: {name: SocialName;className?: string;}) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-4 fill-current', className)} aria-hidden>
      <path d={paths[name]} />
    </svg>);

}

export function SocialRow({ className }: {className?: string;}) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {socialLinks.map((s) =>
      <li key={s.name}>
          <a
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors duration-150 hover:border-accent hover:text-accent-ink">
          
            <SocialIcon name={s.name} />
          </a>
        </li>
      )}
    </ul>);

}
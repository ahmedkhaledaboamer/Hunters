import { cn } from '../lib/cn';

export type ButtonVariant = 'primary' | 'ghost' | 'subtle' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-lime-500 text-ink-950 shadow-[0_10px_28px_-10px_rgb(140_170_0/0.75)] hover:bg-lime-400 dark:shadow-[0_0_32px_-8px_rgb(215_247_30/0.55)]',
  ghost: 'border border-fg/40 text-fg hover:border-fg hover:bg-fg/[0.05] dark:border-line-strong dark:hover:border-fg/40',
  subtle: 'bg-fg/[0.06] text-fg hover:bg-fg/10',
  link: 'text-accent-ink hover:text-fg !px-0 !h-auto'
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base'
};

export const buttonClass = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) =>
cn(
  'group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium',
  'transition-[background-color,color,border-color,transform] duration-150 ease-out active:scale-[0.97]',
  'disabled:pointer-events-none disabled:opacity-50',
  sizes[size],
  variants[variant],
  className
);

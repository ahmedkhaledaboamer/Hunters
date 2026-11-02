import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { buttonClass, type ButtonSize, type ButtonVariant } from './buttonClass';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  href?: string;
  arrow?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
{ variant = 'primary', size = 'md', to, href, arrow, loading, icon, className, children, type = 'button', ...rest },
ref)
{
  const classes = buttonClass(variant, size, className);
  const content =
  <>
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {icon}
      <span>{children}</span>
      {arrow &&
    <ArrowRight
      aria-hidden
      className="size-4 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/btn:-translate-x-0.5" />

    }
    </>;


  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        tabIndex={rest.tabIndex}
        aria-label={rest['aria-label']}
        onClick={rest.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
        
        {content}
      </Link>);

  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {content}
      </a>);

  }
  return (
    <button ref={ref} type={type} className={classes} disabled={rest.disabled || loading} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>);

});
import { forwardRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export const fieldClass =
'w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] text-fg placeholder:text-muted/70 transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-4 focus:ring-lime-500/15 aria-[invalid=true]:border-red-500/70';

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  optionalLabel?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ label, htmlFor, error, hint, optionalLabel, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="text-sm text-fg/85">
        {label}
        {optionalLabel && <span className="ms-1.5 text-xs text-muted">({optionalLabel})</span>}
      </label>
      {children}
      {error ?
      <p id={`${htmlFor}-error`} role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p> :
      hint ?
      <p className="text-xs text-muted">{hint}</p> :
      null}
    </div>);

}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(fieldClass, 'h-12', className)} {...props} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
{ className, rows = 4, ...props },
ref)
{
  return <textarea ref={ref} rows={rows} className={cn(fieldClass, 'resize-y', className)} {...props} />;
});
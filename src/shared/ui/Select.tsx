import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/cn';
import { fieldClass } from './Input';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ options, placeholder, className, ...props }, ref) {
  return (
    <div className="relative">
      <select ref={ref} className={cn(fieldClass, 'h-12 appearance-none pe-10', className)} {...props}>
        {placeholder &&
        <option value="" disabled className="bg-surface-2 text-muted">
            {placeholder}
          </option>
        }
        {options.map((o) =>
        <option key={o.value} value={o.value} className="bg-surface-2 text-fg">
            {o.label}
          </option>
        )}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
    </div>);

});
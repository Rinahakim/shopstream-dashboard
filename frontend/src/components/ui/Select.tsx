'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, id, ...props }, ref) => {
    const locale = useLocale();
    const isRTL = locale === 'he';

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={id} 
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              'w-full py-2.5 text-slate-900 bg-white border border-slate-200 rounded-lg',
              'appearance-none cursor-pointer transition-all duration-200',
              'hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
              isRTL ? 'pr-4 pl-10 text-right' : 'pl-4 pr-10 text-left',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className={cn(
            "absolute top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none",
            isRTL ? "left-3" : "right-3"
          )} />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };


import React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          'bg-background flex h-9 w-full min-w-0 rounded-lg border px-3 py-2 text-base md:text-sm',
          'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
          'transition-[color,box-shadow,border-color] outline-none',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:border-input focus-visible:shadow-focus-ring',

          error
            ? 'border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive aria-invalid:ring-destructive/20 aria-invalid:border-destructive'
            : 'border-input',

          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };

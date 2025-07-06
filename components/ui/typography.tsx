import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'text-3xl font-bold tracking-tight',
      h3: 'text-foreground text-2xl font-bold tracking-tight',
      h4: 'text-xl text-foreground font-bold tracking-tight',
      h5: 'text-lg font-semibold tracking-tight',
      h6: 'text-base font-semibold tracking-tight',
      p: 'text-slate-500',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-[14px]',
      muted: 'text-sm text-muted-foreground leading-5',
      list: 'ml-2 list-disc list-inside marker:text-[10px]',
      'table-head': 'text-foreground font-bold leading-7',
      'medium-large': 'font-manrope leading-5 font-medium text-black',
      'regular-default': 'font-manrope leading-4 text-sm text-ink-normal',
      'regular-large':
        'font-manrope font-bold leading-[120%] text-[22px] text-ink-normal',
      'semi-bold-default':
        'font-manrope leading-4 font-bold text-sm text-ink-normal',
      'semi-bold-small':
        'font-manrope leading-[14px] font-bold text-xs text-black',
      'semi-bold-large': 'font-manrope font-bold text-black',
      'bold-large': 'font-manrope leading-5 font-extrabold text-black',
    },
    affects: {
      default: '',
      removePMargin: '[&:not(:first-child)]:mt-0',
    },
  },
  defaultVariants: {
    variant: 'p',
    affects: 'default',
  },
});

type ElementType = keyof React.JSX.IntrinsicElements;

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, affects, asChild = false, as, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(typographyVariants({ variant, affects, className }))}
          ref={ref}
          {...props}
        />
      );
    }

    const Component = (as || getDefaultElement(variant)) as ElementType;

    return React.createElement(Component, {
      className: cn(typographyVariants({ variant, affects, className })),
      ref,
      ...props,
    });
  },
);

Typography.displayName = 'Typography';

const getDefaultElement = (
  variant: TypographyProps['variant'],
): ElementType => {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'list':
      return 'ul';
    case 'p':
    case 'lead':
    case 'large':
    case 'small':
    case 'muted':
    default:
      return 'p';
  }
};

export { Typography, typographyVariants };

import React from 'react';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface OptionBoxProps extends React.ComponentProps<'div'> {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const OptionBox = React.forwardRef<HTMLDivElement, OptionBoxProps>(
  ({ className, icon, children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          'w-full cursor-pointer flex-row items-center gap-4 pl-4 text-left',
          className,
        )}
        {...props}
      >
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <span className="leading-7 font-bold">{children}</span>
      </Card>
    );
  },
);
OptionBox.displayName = 'OptionBox';

export { OptionBox };

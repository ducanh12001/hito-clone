import { cn } from '@/lib/utils';

import { Divider } from '@/components/ui/divider';

interface DividerProps {
  children?: React.ReactNode;
  className?: string;
  lineClassName?: string;
  textClassName?: string;
}

const TextDivider = ({
  children,
  className,
  lineClassName,
  textClassName,
}: DividerProps) => {
  return (
    <div className={cn('flex items-center', className)}>
      <Divider className={cn('flex-1', lineClassName)} />
      {children && (
        <div
          className={cn(
            'text-muted-foreground px-4 text-sm leading-3.5',
            textClassName,
          )}
        >
          {children}
        </div>
      )}
      <Divider className={cn('flex-1', lineClassName)} />
    </div>
  );
};

export { TextDivider };

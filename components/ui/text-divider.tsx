import { cn } from '@/lib/utils';

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
      <div className={cn('bg-border h-px flex-1', lineClassName)} />
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
      <div className={cn('bg-border h-px flex-1', lineClassName)} />
    </div>
  );
};

export { TextDivider };

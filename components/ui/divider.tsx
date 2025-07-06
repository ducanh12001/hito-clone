import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => {
  return <div className={cn('bg-border h-px', className)}></div>;
};

import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface OptionPickerProps {
  label: ReactNode;
  value?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const OptionPicker = ({
  label,
  value,
  onClick,
  className,
}: OptionPickerProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'flex w-full flex-row items-center justify-between pr-3 pl-5',
        onClick ? 'cursor-pointer' : 'cursor-not-allowed',
        className,
      )}
    >
      <div className="text-muted-foreground text-base leading-[100%]">
        {label}
      </div>
      <div className="text-foreground flex items-center gap-4">
        {value && (
          <span className="text-base leading-7 font-bold">{value}</span>
        )}
        {onClick && <ChevronRight className="size-6" />}
      </div>
    </Card>
  );
};

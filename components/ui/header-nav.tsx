import { ChevronLeft, X } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

interface HeaderNavProps {
  backIcon?: React.ReactNode;
  onBack?: () => void;
  title?: string;
  onClose?: () => void;
  className?: string;
}

const HeaderNav = ({
  backIcon,
  onBack,
  title,
  onClose,
  className,
}: HeaderNavProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 px-5 py-4',
        className,
      )}
    >
      <div className="flex items-center justify-start gap-2">
        {onBack && (
          <div className="rounded-full" onClick={onBack}>
            {backIcon ? (
              backIcon
            ) : (
              <Button variant="ghost" size="icon" className="size-6">
                <ChevronLeft className="!size-6" />
              </Button>
            )}
          </div>
        )}

        {title && (
          <div className="text-foreground text-2xl font-bold">{title}</div>
        )}
      </div>

      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="size-7"
        >
          <X className="!size-6" />
        </Button>
      )}
    </div>
  );
};

export { HeaderNav };

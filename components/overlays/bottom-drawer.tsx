'use client';

import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

interface BottomDrawerProps {
  open: boolean;
  onClose: () => void;
  onBack?: () => void;
  headerCloseIcon?: React.ReactNode;
  showCloseButton?: boolean;
  headerTitle?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const BottomDrawer = ({
  open,
  headerCloseIcon,
  showCloseButton = true,
  headerTitle,
  footer,
  children,
  onClose,
  onBack,
  className,
}: BottomDrawerProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      onClose();
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent
        className={cn(
          'data-[vaul-drawer-direction=bottom]:rounded-t-[26px] sm:mx-auto sm:max-w-md',
          className,
        )}
      >
        <DrawerHeader
          className={`shrink-0 flex-row items-center gap-2 ${showCloseButton || headerTitle ? 'py-5' : 'p-0'}`}
        >
          {showCloseButton && (
            <Button variant="ghost" size="icon" onClick={handleBackClick}>
              {headerCloseIcon || <X className="size-6" />}
            </Button>
          )}
          <DrawerTitle className="text-foreground text-left text-xl leading-[100%] font-bold">
            {headerTitle}
          </DrawerTitle>
        </DrawerHeader>

        {children}

        {footer && (
          <DrawerFooter className="bg-white p-0">{footer}</DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

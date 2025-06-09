import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
}

export const SectionCard = ({
  title,
  children,
  className,
  contentClassName,
  titleClassName,
}: SectionCardProps) => {
  return (
    <Card className={cn('gap-4', className)}>
      <CardTitle
        className={cn(
          'text-foreground px-5 text-xl leading-[100%] font-bold',
          titleClassName,
        )}
      >
        {title}
      </CardTitle>
      <CardContent className={cn('flex flex-col gap-4 px-5', contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
};

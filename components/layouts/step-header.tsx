'use client';

import { cn } from '@/lib/utils';
import { useSignupStore } from '@/lib/stores/signup-store';

import { Progress } from '@/components/ui/progress';
import { HeaderNav } from '@/components/ui/header-nav';

interface StepHeaderProps {
  onBack: () => void;
  className?: string;
}

export const StepHeader = ({ onBack, className }: StepHeaderProps) => {
  const { currentStep, totalSteps } = useSignupStore();

  const progressValue = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={cn('bg-background-primary sticky top-0 z-10', className)}>
      <Progress value={progressValue} className="h-1 rounded-none" />
      <HeaderNav onBack={onBack} />
    </div>
  );
};

'use client';

import { useRouter } from 'next/navigation';
import { useSignupStore } from '@/lib/stores/signup-store';

import { StepHeader } from '@/components/layouts/step-header';

interface SignupLayoutProps {
  children: React.ReactNode;
}

export const SignupLayout = ({ children }: SignupLayoutProps) => {
  const router = useRouter();
  const { currentStep, prevStep } = useSignupStore();

  const handleBack = () => {
    if (currentStep > 1) {
      prevStep();

      switch (currentStep - 1) {
        default:
          router.push('/login');
      }
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <StepHeader onBack={handleBack} />
      <main>{children}</main>
    </>
  );
};

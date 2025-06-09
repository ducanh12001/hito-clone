import { ReactNode } from 'react';

interface SectionContainerProps {
  title: string;
  children: ReactNode;
  showDivider?: boolean;
}

export const SectionContainer = ({
  title,
  children,
  showDivider = true,
}: SectionContainerProps) => {
  return (
    <div className="flex flex-col">
      <div className="mb-6 flex flex-col gap-2.5">
        <h1 className="font-manrope text-[22px] leading-[120%] font-bold">
          {title}
        </h1>
        {children}
      </div>
      {showDivider && <div className="h-px bg-[#DDDDDD]" />}
    </div>
  );
};

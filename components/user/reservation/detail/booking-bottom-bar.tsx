'use client';

import { Button } from '@/components/ui/button';

interface BookingBottomBarProps {
  price: number;
  unit: string;
  selectedDate: string;
  onBook: () => void;
  buttonText?: string;
  disabled?: boolean;
}

export const BookingBottomBar = ({
  price,
  unit,
  selectedDate,
  onBook,
  buttonText = '予約',
  disabled = false,
}: BookingBottomBarProps) => {
  return (
    <div className="flex h-21 w-full items-center justify-between border-t border-black/16 bg-white px-6 py-4 sm:mx-auto sm:max-w-md">
      <div className="font-manrope flex flex-col gap-2">
        <div className="flex items-center gap-1 text-[#252525]">
          <span className="text-xl leading-4 font-bold">
            ¥{price.toLocaleString()}
          </span>
          <span className="text-sm leading-4">/ {unit}</span>
        </div>
        <div className="text-sm leading-4 font-bold underline underline-offset-2">
          {selectedDate}
        </div>
      </div>
      <Button
        className="h-13 w-[128px] rounded-full px-6 py-2"
        onClick={onBook}
        disabled={disabled}
      >
        {buttonText}
      </Button>
    </div>
  );
};

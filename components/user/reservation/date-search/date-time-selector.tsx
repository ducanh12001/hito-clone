import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useDateSearch } from '@/hooks/use-date-search';

import { Button } from '@/components/ui/button';
import type { QuickDateOption } from '@/types/date-search';
import { BottomDrawer } from '@/components/overlays/bottom-drawer';
import { Calendar } from '@/components/ui/calendar';

interface DateTimeSelectorProps {
  quickDates: QuickDateOption[];
  selectedQuickDate: string;
  onQuickDateSelect: (dateOption: QuickDateOption) => void;
  selectedDateDisplay: string;
}

export const DateTimeSelector = ({
  quickDates,
  selectedQuickDate,
  onQuickDateSelect,
  selectedDateDisplay,
}: DateTimeSelectorProps) => {
  const { selectedDate, handleCalendarDateSelect } = useDateSearch();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {quickDates.map((dateOption) => (
          <Button
            key={dateOption.id}
            variant={
              selectedQuickDate === dateOption.id ? 'default' : 'outline'
            }
            className={cn(
              'flex h-[66px] flex-col gap-1 rounded-xl border px-3 py-2',
              selectedQuickDate === dateOption.id
                ? 'bg-primary text-white'
                : 'bg-background border-border text-muted-foreground',
            )}
            onClick={() => onQuickDateSelect(dateOption)}
          >
            <span className="text-lg font-bold">{dateOption.label}</span>
            <span className="leading-[100%] font-[350]">
              {dateOption.subLabel}
            </span>
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        className="bg-background border-border text-muted-foreground h-[63px] gap-1 rounded-xl border px-3 py-2"
        onClick={() => setOpen(true)}
      >
        <div className="flex flex-1 flex-col gap-1">
          <h4 className="text-xl font-bold">日時を選択</h4>
          <span className="leading-[100%] font-[350]">
            {selectedDateDisplay}
          </span>
        </div>
        <ChevronRight className="size-6" />
      </Button>
      <BottomDrawer
        open={open}
        onClose={() => setOpen(false)}
        headerCloseIcon={<ChevronLeft className="size-6" />}
        headerTitle="日時を選択"
      >
        <div className="flex-1 overflow-y-auto px-5">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleCalendarDateSelect}
            initialFocus
          />
        </div>
      </BottomDrawer>
    </>
  );
};

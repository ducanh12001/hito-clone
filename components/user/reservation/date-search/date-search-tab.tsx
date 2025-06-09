'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useReservationStore } from '@/lib/stores/reservation-store';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/ui/section-card';
import { DateTimeSelector } from '@/components/user/reservation/date-search/date-time-selector';
import { ActionButtons } from '@/components/user/reservation/date-search/action-buttons';
import { ServiceFilter } from '@/components/user/reservation/services/service-filter';
import { useDateSearch } from '@/hooks/use-date-search';

export const DateSearchTab = () => {
  const {
    quickDates,
    selectedQuickDate,
    handleQuickDateSelect,
    handleSearch,
    getSelectedDateDisplay,
  } = useDateSearch();
  const { userCount, setUserCount, selectedFilter } = useReservationStore();

  const handleUserCountChange = (increment: boolean) => {
    if (increment) {
      setUserCount(userCount + 1);
    } else if (userCount > 1) {
      setUserCount(userCount - 1);
    }
  };

  const canSearch = selectedQuickDate && selectedFilter;

  return (
    <div className="relative flex h-full flex-col gap-4 p-5">
      <SectionCard title="いつ利用しますか？" className="pb-4">
        <DateTimeSelector
          quickDates={quickDates}
          selectedQuickDate={selectedQuickDate}
          onQuickDateSelect={handleQuickDateSelect}
          selectedDateDisplay={getSelectedDateDisplay()}
        />
      </SectionCard>

      <SectionCard title="サービスの種類" contentClassName="px-0">
        <ServiceFilter />
      </SectionCard>

      <SectionCard title="利用人数">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'size-8 border',
              userCount <= 1
                ? 'border-slate-200 text-slate-200'
                : 'border-[#B0B0B0] !text-black',
            )}
            disabled={userCount <= 1}
            onClick={() => handleUserCountChange(false)}
          >
            <Minus className="size-3.5" />
          </Button>
          <div className="text-foreground leading-7 font-bold">
            {userCount}名
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-8 border border-[#B0B0B0]"
            onClick={() => handleUserCountChange(true)}
          >
            <Plus className="size-3.5 text-black" />
          </Button>
        </div>
      </SectionCard>

      <div className="flex-1" />

      <ActionButtons onSearch={handleSearch} disabled={!canSearch} />
    </div>
  );
};

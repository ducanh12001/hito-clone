'use client';

import { useMemo } from 'react';
import { ChevronLeft, Circle, Minus, Plus, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { IntervalType, TimeSlot, useBookingStore } from '@/lib/stores/booking';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BottomDrawer } from '@/components/overlays/bottom-drawer';
import { BookingBottomBar } from '@/components/user/reservation/detail/booking-bottom-bar';

export const TimeSlotBookingDrawer = () => {
  const {
    booking,
    currentStep,
    dates,
    isDrawerOpen,
    isLoading,
    closeDrawer,
    nextStep,
    prevStep,
    setSelectedDate,
    setSelectedTime,
    setIntervalMinutes,
    setGuestCount,
    saveBooking,
    getTotalPrice,
    getSelectedDateLabel,
    getCurrentStepConfig,
    setSelectedEndTime,
  } = useBookingStore();

  const timeOptions = useMemo(() => {
    const times: string[] = [];
    for (let hour = 0; hour <= 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        if (hour === 24 && minute > 0) break;
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  }, []);

  const timeSlots = useMemo(() => {
    const slots: TimeSlot[] = [];
    const [startHour, startMinute] = booking.selectedTime
      .split(':')
      .map(Number);
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = 24 * 60;
    const interval = parseInt(booking.intervalMinutes);
    console.log(booking);
    const shopOpenTime = booking.openTime || '08:00';
    const shopCloseTime = booking.closeTime || '19:00';
    const [shopOpenHour, shopOpenMinute] = shopOpenTime.split(':').map(Number);
    const [shopCloseHour, shopCloseMinute] = shopCloseTime
      .split(':')
      .map(Number);
    const shopOpenTimeInMinutes = shopOpenHour * 60 + shopOpenMinute;
    const shopCloseTimeInMinutes = shopCloseHour * 60 + shopCloseMinute;

    const selectedEndTimeInMinutes = booking.selectedEndTime
      ? (() => {
          const [endHour, endMinute] = booking.selectedEndTime
            .split(':')
            .map(Number);
          return endHour * 60 + endMinute;
        })()
      : null;

    for (
      let current = startTimeInMinutes;
      current <= endTimeInMinutes;
      current += interval
    ) {
      if (current > endTimeInMinutes) break;

      const hours = Math.floor(current / 60);
      const minutes = current % 60;
      const timeString =
        hours === 24
          ? '24:00'
          : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

      const isInSelectedRange =
        selectedEndTimeInMinutes &&
        current >= shopOpenTimeInMinutes &&
        current <= selectedEndTimeInMinutes;

      const available =
        current >= shopOpenTimeInMinutes && current < shopCloseTimeInMinutes;

      slots.push({
        time: timeString,
        available,
        isInSelectedRange: !!isInSelectedRange,
      });
    }

    return slots;
  }, [booking]);

  const intervalOptions = [
    { value: '15', label: '15分' },
    { value: '30', label: '30分' },
    { value: '60', label: '1時間' },
  ];

  const getSlotBorderStyles = (index: number) => {
    const slot = timeSlots[index];
    if (!slot.isInSelectedRange) return {};

    const prevSlot = timeSlots[index - 1];
    const nextSlot = timeSlots[index + 1];

    const isFirstInGroup = !prevSlot?.isInSelectedRange || index === 0;
    const isLastInGroup =
      !nextSlot?.isInSelectedRange || index === timeSlots.length - 1;

    return {
      borderTopWidth: isFirstInGroup ? '3px' : '1px',
      borderBottomWidth: isLastInGroup ? '3px' : '1px',
      borderTopColor: isFirstInGroup ? 'var(--primary)' : '',
      borderBottomColor: isLastInGroup ? 'var(--primary)' : '',
    };
  };

  const handleNext = async () => {
    if (currentStep < 3) {
      nextStep();
    } else {
      await saveBooking();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      prevStep();
    } else {
      closeDrawer();
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    setSelectedEndTime('');
  };

  const handleTimeSlotClick = (time: string, available: boolean) => {
    if (!available) return;
    setSelectedEndTime(time);
  };

  const stepConfig = getCurrentStepConfig();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex-1 overflow-hidden px-5">
            <div className="flex h-full flex-col gap-[23px] text-slate-300">
              <div className="flex-shrink-0 space-y-[23px]">
                <div className="flex gap-2 overflow-x-auto">
                  {dates.map((date) => (
                    <Button
                      key={date.id}
                      variant={
                        date.id === booking.selectedDate ? 'default' : 'outline'
                      }
                      className={cn(
                        'flex h-[66px] flex-col gap-1 rounded-xl border px-3 py-2 whitespace-nowrap',
                        date.id === booking.selectedDate
                          ? 'bg-primary border-primary text-white'
                          : 'bg-background border-border text-muted-foreground',
                      )}
                      onClick={() => setSelectedDate(date.id)}
                    >
                      <span className="text-lg font-bold">{date.label}</span>
                      <span className="leading-[100%] font-[350]">
                        {date.date}
                      </span>
                    </Button>
                  ))}
                </div>

                <div className="text-foreground flex items-center gap-[23px]">
                  <p className="leading-[100%] whitespace-nowrap">
                    利用開始時間
                  </p>
                  <Select
                    value={booking.selectedTime}
                    onValueChange={handleTimeChange}
                  >
                    <SelectTrigger className="border-input !h-12 flex-1 rounded-lg border px-3 py-2 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-foreground flex items-center gap-[23px]">
                  <p className="leading-[100%] whitespace-nowrap">時間間隔</p>
                  <Select
                    value={booking.intervalMinutes}
                    onValueChange={(value: IntervalType) =>
                      setIntervalMinutes(value)
                    }
                  >
                    <SelectTrigger className="border-input !h-12 flex-1 rounded-lg border px-3 py-2 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {intervalOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {booking.selectedEndTime && (
                <div className="bg-primary/10 rounded-lg p-3">
                  <div className="text-sm font-medium">
                    選択時間: {booking.selectedTime} 〜{' '}
                    {booking.selectedEndTime}
                  </div>
                </div>
              )}
              <div className="min-h-0 flex-1 overflow-y-auto py-3">
                {timeSlots.length > 0 ? (
                  timeSlots.map((slot, index) => {
                    const borderStyles = getSlotBorderStyles(index);
                    return (
                      <div
                        key={slot.time}
                        className="flex items-start justify-between gap-[23px]"
                      >
                        <span className="-mt-3 text-sm leading-5 text-[#717171]">
                          {slot.time}
                        </span>
                        <div
                          className={cn(
                            'relative flex h-[58px] flex-1 flex-col items-center justify-center border-y-[1px] transition-colors',
                            slot.available
                              ? 'cursor-pointer'
                              : 'cursor-not-allowed',
                            slot.isInSelectedRange
                              ? 'bg-primary/10 border-violet-200'
                              : slot.available
                                ? 'border-slate-300 bg-white hover:bg-gray-50'
                                : 'border-slate-300 bg-slate-100',
                          )}
                          style={borderStyles}
                          onClick={() =>
                            handleTimeSlotClick(slot.time, slot.available)
                          }
                        >
                          {slot.available ? (
                            <Circle className="text-primary size-6" />
                          ) : (
                            <X className="size-6 text-slate-500" />
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="py-8 text-center text-gray-500">
                      時間スロットがありません
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 overflow-y-auto px-5 pb-5">
            <div className="flex items-center justify-center gap-1.5">
              <Button
                variant="outline"
                size="icon"
                className={cn('size-8 border')}
                onClick={() => setGuestCount(booking.guestCount - 1)}
                disabled={booking.guestCount <= 1}
              >
                <Minus className="size-3.5" />
              </Button>
              <div className="text-foreground leading-7 font-bold">
                {booking.guestCount}名
              </div>
              <Button
                variant="outline"
                size="icon"
                className="size-8 border border-[#B0B0B0]"
                onClick={() => setGuestCount(booking.guestCount + 1)}
                disabled={booking.guestCount >= 10}
              >
                <Plus className="size-3.5 text-black" />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <BottomDrawer
      open={isDrawerOpen}
      onClose={closeDrawer}
      headerTitle={stepConfig.title}
      headerCloseIcon={<ChevronLeft className="size-6" />}
      onBack={handleBack}
      className={cn(currentStep === 1 ? 'h-[80vh]' : '')}
      footer={
        <BookingBottomBar
          price={getTotalPrice()}
          unit={booking.unit}
          selectedDate={getSelectedDateLabel()}
          onBook={handleNext}
          buttonText={stepConfig.buttonText}
          disabled={isLoading}
        />
      }
    >
      {renderStepContent()}
    </BottomDrawer>
  );
};

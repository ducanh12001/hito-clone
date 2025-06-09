import { useState, useMemo } from 'react';
import { format, addDays } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

import { useReservationStore } from '@/lib/stores/reservation-store';
import type { QuickDateOption } from '@/types/date-search';

export const useDateSearch = () => {
  const router = useRouter();
  const { selectedDate, selectedService, userCount, setSelectedDate } =
    useReservationStore();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedQuickDate, setSelectedQuickDate] = useState<string>('today');

  const quickDates: QuickDateOption[] = useMemo(() => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const dayAfterTomorrow = addDays(today, 2);

    return [
      {
        id: 'today',
        label: '今日',
        subLabel: format(today, 'M月d日', { locale: ja }),
        date: today,
      },
      {
        id: 'tomorrow',
        label: '明日',
        subLabel: format(tomorrow, 'M月d日', { locale: ja }),
        date: tomorrow,
      },
      {
        id: 'day-after',
        label: '金曜日',
        subLabel: format(dayAfterTomorrow, 'M月d日', { locale: ja }),
        date: dayAfterTomorrow,
      },
    ];
  }, []);

  const handleQuickDateSelect = (dateOption: QuickDateOption) => {
    setSelectedQuickDate(dateOption.id);
    setSelectedDate(dateOption.date);
  };

  const handleCalendarDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSearch = () => {
    console.log('Search with:', {
      date: selectedDate,
      service: selectedService,
      userCount,
    });
    router.push('/reservation/office');
  };

  const getSelectedDateDisplay = () => {
    if (!selectedDate) return '5月22日';
    return format(selectedDate, 'M月d日', { locale: ja });
  };

  const getServiceDisplay = () => {
    if (!selectedService) return 'サービスを選択';
    return selectedService.name;
  };

  return {
    selectedDate,
    selectedService,
    userCount,
    showCalendar,
    selectedQuickDate,
    quickDates,

    setShowCalendar,
    handleQuickDateSelect,
    handleCalendarDateSelect,
    handleSearch,

    getSelectedDateDisplay,
    getServiceDisplay,
  };
};

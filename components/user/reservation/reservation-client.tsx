'use client';

import { TabType, useReservationStore } from '@/lib/stores/reservation-store';

import { HeaderNav } from '@/components/ui/header-nav';
import { NavigationTabs } from '@/components/ui/navigation-tabs';
import { ServicesTab } from '@/components/user/reservation/services/service-tab';
import { DateSearchTab } from '@/components/user/reservation/date-search/date-search-tab';
import {
  CalendarIcon,
  HistoryIcon,
  ServiceRoomIcon,
} from '@/components/icons/service-icons';
import { Service } from '@/types/reservation';

interface ReservationClientProps {
  services: Service[];
}

export const ReservationClient = ({ services }: ReservationClientProps) => {
  const { activeTab, setActiveTab } = useReservationStore();

  const tabs = [
    {
      id: 'services',
      label: 'サービス一覧',
      icon: <ServiceRoomIcon />,
    },
    {
      id: 'date-search',
      label: '日付から検索',
      icon: <CalendarIcon />,
    },
    {
      id: 'recent',
      label: '直近の予約',
      icon: <HistoryIcon />,
    },
  ];

  return (
    <div className="bg-background flex h-full flex-col">
      <HeaderNav
        title="予約"
        onClose={() => console.log('Close')}
        className="p-5"
      />

      <NavigationTabs
        tabs={tabs}
        value={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId as TabType)}
      />

      {activeTab === 'services' && (
        <div className="py-5">
          <ServicesTab services={services} />
        </div>
      )}

      {activeTab === 'date-search' && <DateSearchTab />}

      {activeTab === 'recent' && (
        <div className="p-4">
          <p className="text-muted-foreground">直近の予約の内容</p>
        </div>
      )}
    </div>
  );
};

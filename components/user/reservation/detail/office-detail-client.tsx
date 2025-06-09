'use client';

import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { HeaderNav } from '@/components/ui/header-nav';
import { BookingBottomBar } from '@/components/user/reservation/detail/booking-bottom-bar';
import { FacilitiesGrid } from '@/components/user/reservation/detail/facilities-grid';
import { ImageCarousel } from '@/components/user/reservation/detail/image-carousel';
import { NoticeSection } from '@/components/user/reservation/detail/notice-section';
import { OfficeInfo } from '@/components/user/reservation/detail/office-info';
import { SectionContainer } from '@/components/user/reservation/detail/section-container';
import { TimeSlotBookingDrawer } from '@/components/overlays/time-slot-booking-drawer';
import { useBookingStore } from '@/lib/stores/booking';
import { Service } from '@/types/reservation';

interface OfficeDetailClientProps {
  service: Service;
}

export const OfficeDetailClient = ({ service }: OfficeDetailClientProps) => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const {
    openDrawer,
    setOfficeInfo,
    getTotalPrice,
    getSelectedDateLabel,
    isDrawerOpen,
    setShopHours,
  } = useBookingStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      setOfficeInfo({
        id: service.id,
        name: service.name,
        price: service.price,
        unit: service.duration.toString(),
      });
      setShopHours('08:00', '19:00');
    }
  }, [service, setOfficeInfo, setShopHours, isHydrated]);

  const handleBack = () => {
    router.push('/reservation');
  };

  return (
    <div className="relative flex h-full flex-col gap-5 overflow-auto bg-white pb-21">
      <div className="relative">
        <HeaderNav
          backIcon={
            <Button
              variant="outline"
              size="icon"
              className="size-[34px] border-none text-black hover:text-black"
            >
              <ChevronLeft className="!size-6" />
            </Button>
          }
          onBack={handleBack}
          className="absolute top-0 z-10 p-5"
        />
        <ImageCarousel images={service.images} showDots={false} />
      </div>

      <OfficeInfo
        name={service.name}
        price={service.price}
        unit={service.unit}
        description={service.description}
      />

      <div className="flex flex-col gap-[30px] px-5">
        <SectionContainer title="サービスについて">
          <p className="text-foreground leading-[100%]">
            {service.description}
          </p>
        </SectionContainer>

        <SectionContainer title="設備・備品">
          <FacilitiesGrid facilities={service.features} />
        </SectionContainer>

        <SectionContainer title="空室カレンダー">
          <Calendar mode="single" className="w-full p-0" initialFocus />
        </SectionContainer>

        <SectionContainer title="注意事項" showDivider={false}>
          <NoticeSection />
        </SectionContainer>
      </div>

      {isHydrated && !isDrawerOpen && (
        <div className="fixed bottom-0 z-20 w-full sm:mx-auto sm:max-w-md">
          <BookingBottomBar
            price={getTotalPrice()}
            unit={service.unit}
            selectedDate={getSelectedDateLabel()}
            onBook={openDrawer}
          />
        </div>
      )}

      {isHydrated && <TimeSlotBookingDrawer />}
    </div>
  );
};

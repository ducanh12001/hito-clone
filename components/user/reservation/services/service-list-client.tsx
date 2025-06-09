'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

import { useReservationStore } from '@/lib/stores/reservation-store';
import type { Service, ServiceCategory } from '@/types/reservation';
import { HeaderNav } from '@/components/ui/header-nav';
import { Card } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { ServicesTab } from '@/components/user/reservation/services/service-tab';

interface ServiceListClientProps {
  category: string;
  services: Service[];
  initialFilters?: {
    date?: string;
    guests?: number;
  };
}

export function ServiceListClient({
  category,
  services,
  initialFilters,
}: ServiceListClientProps) {
  const router = useRouter();

  // Zustand stores
  const { selectedFilter, setSelectedFilter, setUserCount } =
    useReservationStore();

  useEffect(() => {
    if (category !== 'all') {
      setSelectedFilter(category as ServiceCategory);
    }

    if (initialFilters?.guests) {
      setUserCount(initialFilters.guests);
    }
  }, [category, initialFilters, setSelectedFilter, setUserCount]);

  const filteredAndSortedServices = useMemo(() => {
    let filtered = services;

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(
        (service) => service.category === selectedFilter,
      );
    }

    return filtered;
  }, [services, selectedFilter]);

  const handleBack = () => {
    router.push('/reservation');
  };

  return (
    <ErrorBoundary>
      <div className="bg-background flex h-full flex-col">
        <HeaderNav
          title="検索結果"
          onBack={handleBack}
          className="flex-shrink-0 p-5"
        />
        <div className="flex flex-col gap-5">
          Add commentMore actions
          <div className="px-5">
            <Card className="flex-row items-center justify-between gap-0 rounded-full p-5">
              <span className="flex-1 text-center text-base leading-7 font-bold">
                5月21日・オフィススペース
              </span>
              <ChevronRight className="size-6" />
            </Card>
          </div>
          <ServicesTab services={filteredAndSortedServices} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

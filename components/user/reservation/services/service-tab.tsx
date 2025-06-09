'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useReservationStore } from '@/lib/stores/reservation-store';
import { Service } from '@/types/reservation';
import { ServiceCard } from '@/components/user/reservation/services/service-card';
import { ServiceFilter } from '@/components/user/reservation/services/service-filter';

interface ServicesTabProps {
  services: Service[];
}

export const ServicesTab = ({ services }: ServicesTabProps) => {
  const router = useRouter();
  const { selectedFilter } = useReservationStore();

  const filteredServices = useMemo(() => {
    if (selectedFilter === 'all') return services;
    return services.filter((service) => service.category === selectedFilter);
  }, [services, selectedFilter]);

  const handleServiceSelect = (service: Service) => {
    router.push(`/reservation/services/${service.category}/${service.id}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <ServiceFilter />

      <div className="flex flex-col gap-4 px-5">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={handleServiceSelect}
          />
        ))}
      </div>
    </div>
  );
};

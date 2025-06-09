'use client';

import { getServicesByCategory } from '@/lib/api/services';
import { ServiceListClient } from '@/components/user/reservation/services/service-list-client';

interface ServiceListPageProps {
  params: { category: string };
  searchParams: { date?: string; guests?: string };
}

export default async function ServiceListPage({
  params,
  searchParams,
}: ServiceListPageProps) {
  const services = await getServicesByCategory(params.category);
  const searchFilters = {
    date: searchParams.date,
    guests: searchParams.guests ? parseInt(searchParams.guests) : 1,
  };

  return (
    <ServiceListClient
      category={params.category}
      services={services}
      initialFilters={searchFilters}
    />
  );
}

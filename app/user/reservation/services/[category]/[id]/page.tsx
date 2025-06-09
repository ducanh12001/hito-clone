'use client';

import { OfficeDetailClient } from '@/components/user/reservation/detail/office-detail-client';
import { getServiceById } from '@/lib/api/services';
import Banner from '@/public/images/banner.png';
import { notFound } from 'next/navigation';

interface ServiceDetailPageProps {
  params: { category: string; id: string };
}

export default async function DetailPage({ params }: ServiceDetailPageProps) {
  const service = await getServiceById(params.id);

  if (!service || service.category !== params.category) {
    notFound();
  }

  return <OfficeDetailClient service={service} />;
}

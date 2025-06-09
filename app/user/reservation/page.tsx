import { getServices } from '@/lib/api/services';
import { ReservationClient } from '@/components/user/reservation/reservation-client';

export default async function ReservationPage() {
  const services = await getServices();

  return <ReservationClient services={services} />;
}

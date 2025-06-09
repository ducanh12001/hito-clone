import { Service } from '@/types/reservation';

export async function getServices(): Promise<Service[]> {
  // Mock for now, replace with actual API
  return [
    {
      id: 'booth-a',
      name: 'ブースA',
      price: 500,
      duration: 30,
      capacity: '1～2名',
      description: '1～2名での作業に最適な個室ブースです。',
      image: '/images/banner.png',
      category: 'office',
      features: ['WiFi', 'Monitor', 'Power'],
      availability: { open: '08:00', close: '19:00' },
    },
    {
      id: 'booth-b',
      name: 'ブースB',
      price: 500,
      duration: 30,
      capacity: '1～2名',
      description: '1～2名での作業に最適な個室ブースです。',
      image: '/images/banner.png',
      category: 'office',
      features: ['WiFi', 'Monitor', 'Power'],
      availability: { open: '08:00', close: '19:00' },
    },
    {
      id: 'meeting-a',
      name: '会議室A',
      price: 1000,
      duration: 30,
      capacity: '3～4名',
      description: '3～4名での作業に最適な個室ブースです。',
      image: '/images/banner.png',
      category: 'meeting',
      features: ['WiFi', 'Monitor', 'Power'],
      availability: { open: '08:00', close: '19:00' },
    },
  ];
}

export async function getServicesByCategory(
  category: string,
): Promise<Service[]> {
  const services = await getServices();
  return services.filter((service) => service.category === category);
}

export async function getServiceById(id: string): Promise<Service | null> {
  const services = await getServices();
  return services.find((service) => service.id === id) || null;
}

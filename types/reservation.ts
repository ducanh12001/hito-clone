import { StaticImageData } from 'next/image';

export type ServiceCategory = 'office' | 'meeting' | 'lounge';
export type FilterType = 'all' | ServiceCategory;

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  capacity: string;
  description: string;
  image: string | StaticImageData;
  category: ServiceCategory;
  features?: string[];
  availability: {
    open: string; // "08:00"
    close: string; // "19:00"
    daysOfWeek?: number[]; // [0,1,2,3,4,5,6] where 0 = Sunday
  };
  rating?: number;
  reviewCount?: number;
  location?: {
    floor: number;
    room: string;
  };
  amenities?: Amenity[];
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: 'basic' | 'tech' | 'comfort' | 'food';
}

export interface Booking {
  id: string;
  serviceId: string;
  userId: string;
  date: string; // ISO date string
  startTime: string; // "08:00"
  endTime: string; // "10:00"
  guestCount: number;
  status: BookingStatus;
  totalPrice: number;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no-show';

export interface TimeSlot {
  time: string;
  available: boolean;
  price?: number; // Dynamic pricing
  isSelected?: boolean;
  isInRange?: boolean;
}

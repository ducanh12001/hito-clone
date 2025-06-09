import { z } from 'zod';

export const serviceSearchSchema = z.object({
  category: z.enum(['all', 'office', 'meeting', 'lounge']),
  date: z.string().optional(),
  guests: z.number().min(1).max(20).optional(),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(),
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .optional(),
});

export const bookingFormSchema = z.object({
  serviceId: z.string().min(1),
  date: z.string().min(1),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  guestCount: z.number().min(1).max(20),
  specialRequests: z.string().max(500).optional(),
  contactInfo: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z
      .string()
      .regex(/^[\d\-\+\(\)\s]+$/)
      .min(10),
  }),
});

export type ServiceSearchInput = z.infer<typeof serviceSearchSchema>;
export type BookingFormInput = z.infer<typeof bookingFormSchema>;

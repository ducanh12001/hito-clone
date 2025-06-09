import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Types
export interface DateOption {
  id: string;
  label: string;
  date: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  isInSelectedRange?: boolean;
}

export type IntervalType = '15' | '30' | '60';

export interface BookingData {
  officeId: string;
  officeName: string;
  basePrice: number;
  unit: string;

  // Step 1: Date & Time Selection
  selectedDate: string;
  selectedTime: string;
  intervalMinutes: '15' | '30' | '60';
  selectedSlots: string[];
  selectedEndTime: string;
  openTime: string;
  closeTime: string;

  // Step 2: Guest Count
  guestCount: number;
}

export interface BookingFlow {
  currentStep: number;
  isDrawerOpen: boolean;
  isLoading: boolean;
  errors: Record<string, string>;

  booking: BookingData;

  dates: DateOption[];
  timeSlots: TimeSlot[];

  // Actions
  openDrawer: () => void;
  closeDrawer: () => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setOfficeInfo: (info: {
    id: string;
    name: string;
    price: number;
    unit: string;
  }) => void;
  setSelectedDate: (dateId: string) => void;
  setSelectedTime: (time: string) => void;
  setIntervalMinutes: (interval: '15' | '30' | '60') => void;
  setGuestCount: (count: number) => void;
  setSelectedEndTime: (time: string) => void;
  setShopHours: (openTime: string, closeTime: string) => void;
  toggleTimeSlot: (time: string) => void;

  getTotalPrice: () => number;
  getSelectedDateLabel: () => string;
  getCurrentStepConfig: () => { title: string; buttonText: string };

  canProceedToNextStep: () => boolean;
  validateCurrentStep: () => boolean;

  saveBooking: () => Promise<void>;
  clearBooking: () => void;
  resetToStep: (step: number) => void;
}

export const useBookingStore = create<BookingFlow>()(
  devtools(
    persist(
      (set, get) => ({
        currentStep: 1,
        isDrawerOpen: false,
        isLoading: false,
        errors: {},

        booking: {
          officeId: '',
          officeName: '',
          basePrice: 0,
          unit: '',
          selectedDate: 'today',
          selectedTime: '16:00',
          intervalMinutes: '15',
          selectedSlots: [],
          guestCount: 1,
          additionalServices: [],
          specialRequests: '',
          selectedEndTime: '',
          openTime: '08:00',
          closeTime: '20:00',
        },

        dates: [
          { id: 'today', label: '今日', date: '5月21日' },
          { id: 'tomorrow', label: '明日', date: '5月22日' },
          { id: 'friday', label: '金曜日', date: '5月23日' },
          { id: 'select', label: '日時を選択', date: '5月23日' },
        ],

        timeSlots: [],

        openDrawer: () => set({ isDrawerOpen: true }),
        closeDrawer: () => set({ isDrawerOpen: false }),
        setStep: (step) => set({ currentStep: step }),
        nextStep: () =>
          set((state) => ({
            currentStep: Math.min(state.currentStep + 1, 3),
          })),
        prevStep: () =>
          set((state) => ({
            currentStep: Math.max(state.currentStep - 1, 1),
          })),

        // Booking Data Updates
        setOfficeInfo: (info) =>
          set((state) => ({
            booking: {
              ...state.booking,
              officeId: info.id,
              officeName: info.name,
              basePrice: info.price,
              unit: info.unit,
            },
          })),
        setSelectedDate: (dateId) =>
          set((state) => ({
            booking: { ...state.booking, selectedDate: dateId },
          })),
        setSelectedTime: (time) =>
          set((state) => ({
            booking: { ...state.booking, selectedTime: time },
          })),
        setIntervalMinutes: (interval) =>
          set((state) => ({
            booking: { ...state.booking, intervalMinutes: interval },
          })),
        setGuestCount: (count) =>
          set((state) => ({
            booking: {
              ...state.booking,
              guestCount: Math.max(1, Math.min(10, count)),
            },
          })),
        setSelectedEndTime: (time) =>
          set((state) => ({
            booking: { ...state.booking, selectedEndTime: time },
          })),
        setShopHours: (openTime, closeTime) =>
          set((state) => ({
            booking: {
              ...state.booking,
              openTime: openTime,
              closeTime: closeTime,
            },
          })),
        toggleTimeSlot: (time) =>
          set((state) => {
            const selectedSlots = state.booking.selectedSlots.includes(time)
              ? state.booking.selectedSlots.filter((t) => t !== time)
              : [...state.booking.selectedSlots, time];

            return {
              booking: { ...state.booking, selectedSlots },
            };
          }),

        getTotalPrice: () => {
          const state = get();
          return state.booking.basePrice * state.booking.guestCount;
        },
        getSelectedDateLabel: () => {
          const state = get();
          const selectedDate = state.dates.find(
            (d) => d.id === state.booking.selectedDate,
          );
          return selectedDate?.date || '5月21日';
        },
        getCurrentStepConfig: () => {
          const state = get();
          const stepConfigs = {
            1: { title: '利用日時を選択してください', buttonText: '次へ' },
            2: { title: '利用人数を選択してください', buttonText: '確認' },
          };
          return (
            stepConfigs[state.currentStep as keyof typeof stepConfigs] ||
            stepConfigs[1]
          );
        },

        canProceedToNextStep: () => {
          const state = get();
          switch (state.currentStep) {
            case 1:
              return !!(
                state.booking.selectedDate && state.booking.selectedTime
              );
            case 2:
              return state.booking.guestCount > 0;
            default:
              return false;
          }
        },

        validateCurrentStep: () => {
          const state = get();
          return state.canProceedToNextStep();
        },

        saveBooking: async () => {
          set({ isLoading: true, errors: {} });
          try {
            const state = get();
            // API call here
            console.log('Booking saved:', state.booking);

            get().clearBooking();
          } catch (error) {
            set({
              errors: {
                submit:
                  error instanceof Error ? error.message : 'Booking failed',
              },
            });
          } finally {
            set({ isLoading: false });
          }
        },

        clearBooking: () =>
          set((state) => ({
            currentStep: 1,
            isDrawerOpen: false,
            booking: {
              ...state.booking,
              selectedDate: 'today',
              selectedTime: '16:00',
              intervalMinutes: '15',
              selectedSlots: [],
              guestCount: 1,
              additionalServices: [],
              specialRequests: '',
            },
            errors: {},
          })),

        resetToStep: (step) => set({ currentStep: step }),
      }),
      {
        name: 'booking-storage',
        partialize: (state) => ({
          booking: state.booking,
          currentStep: state.currentStep,
        }),
      },
    ),
    { name: 'booking-store' },
  ),
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FilterType, Service } from '@/types/reservation';

export type TabType = 'services' | 'date-search' | 'recent';

interface ReservationStore {
  activeTab: TabType;
  selectedFilter: FilterType;

  selectedDate?: Date;
  userCount: number;
  searchResults: string[];

  services: Service[];

  setActiveTab: (tab: TabType) => void;
  setSelectedFilter: (filter: FilterType) => void;
  setSelectedDate: (date: Date) => void;
  setUserCount: (count: number) => void;
  setSearchResults: (results: string[]) => void;
  clearSearch: () => void;
  setServices: (services: Service[]) => void;
  getServiceById: (id: string) => Service | undefined;
}

export const useReservationStore = create<ReservationStore>()(
  persist(
    (set, get) => ({
      activeTab: 'services',
      selectedFilter: 'all',
      selectedDate: undefined,
      userCount: 1,
      searchResults: [],
      services: [],

      setActiveTab: (tab) => set({ activeTab: tab }),
      setSelectedFilter: (filter) => set({ selectedFilter: filter }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setUserCount: (count) => set({ userCount: count }),
      setSearchResults: (results) => set({ searchResults: results }),
      clearSearch: () =>
        set({
          selectedDate: undefined,
          searchResults: [],
        }),
      setServices: (services) => set({ services }),
      getServiceById: (id) =>
        get().services.find((service) => service.id === id),
    }),
    {
      name: 'reservation-storage',
      partialize: (state) => ({
        selectedDate: state.selectedDate,
        userCount: state.userCount,
      }),
    },
  ),
);

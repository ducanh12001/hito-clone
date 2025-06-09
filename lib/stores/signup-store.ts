import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SignupData {
  email: string;
  verificationCode: string;
  name: string;
  password: string;
  gender: string;
}

interface SignupStore {
  data: Partial<SignupData>;
  currentStep: number;
  totalSteps: number;

  isLoading: boolean;
  countdown: number;
  canResend: boolean;

  setData: (field: keyof SignupData, value: string) => void;
  updateData: (newData: Partial<SignupData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  setLoading: (loading: boolean) => void;

  startCountdown: () => void;
  setCountdown: (count: number) => void;
  setCanResend: (can: boolean) => void;

  reset: () => void;
}

const initialState = {
  data: {},
  currentStep: 1,
  totalSteps: 6,
  isLoading: false,
  countdown: 0,
  canResend: true,
};

export const useSignupStore = create<SignupStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setData: (field, value) =>
        set((state) => ({
          data: { ...state.data, [field]: value },
        })),

      updateData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
        })),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, state.totalSteps),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      setStep: (step) => set({ currentStep: step }),

      setLoading: (loading) => set({ isLoading: loading }),

      startCountdown: () => {
        set({ countdown: 60, canResend: false });

        const timer = setInterval(() => {
          const { countdown } = get();
          if (countdown <= 1) {
            clearInterval(timer);
            set({ countdown: 0, canResend: true });
          } else {
            set({ countdown: countdown - 1 });
          }
        }, 1000);
      },

      setCountdown: (count) => set({ countdown: count }),
      setCanResend: (can) => set({ canResend: can }),

      reset: () => set(initialState),
    }),
    {
      name: 'signup-storage',
      partialize: (state) => ({
        data: state.data,
        currentStep: state.currentStep,
      }),
    },
  ),
);

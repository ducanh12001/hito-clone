'use client';

import { ReactNode } from 'react';
import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

interface ToastOptions {
  description?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
}

export const useToast = () => {
  const showToast = (
    type: ToastType,
    message: string,
    options?: ToastOptions,
  ) => {
    const commonOptions = {
      description: options?.description,
      duration: options?.duration || 3000,
      position: options?.position,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    };

    switch (type) {
      case 'success':
        return toast.success(message, commonOptions);

      case 'error':
        return toast.error(message, {
          ...commonOptions,
          duration: options?.duration || 6000,
        });

      case 'warning':
        return toast.warning(message, commonOptions);

      case 'info':
        return toast.info(message, commonOptions);

      case 'loading':
        return toast.loading(message, {
          ...commonOptions,
          duration: Infinity,
        });

      default:
        return toast(message, commonOptions);
    }
  };

  const success = (message: string, options?: ToastOptions) =>
    showToast('success', message, options);

  const error = (message: string, options?: ToastOptions) =>
    showToast('error', message, options);

  const warning = (message: string, options?: ToastOptions) =>
    showToast('warning', message, options);

  const info = (message: string, options?: ToastOptions) =>
    showToast('info', message, options);

  const loading = (message: string, options?: ToastOptions) =>
    showToast('loading', message, options);

  const dismiss = (toastId?: string | number) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  return {
    showToast,
    success,
    error,
    warning,
    info,
    loading,
    dismiss,
  };
};

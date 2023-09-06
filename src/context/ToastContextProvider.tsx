'use client';

import { createContext, useState } from 'react';

interface ToastConetextProvier {
  children: React.ReactNode;
}

type ToastOptions = {
  position?:
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'top-left'
    | 'top-right';
  autoCleanup?: boolean;
  cleanupTimeout?: number;
  type?: 'warn' | 'success' | 'info';
};

type addToast = {
  id?: string;
} & ToastOptions;

export type Toast = { text: string } & addToast;

type add = (text: string, options?: addToast) => void;
type ToastContextType = {
  addToast: add;
  removeToast: (id: string) => void;
  toasts: Toast[];
};

const defaultToast: ToastOptions = {
  position: 'bottom-right',
  autoCleanup: true,
  cleanupTimeout: 3000,
  type: 'info',
};

export const ToastContext = createContext<ToastContextType | null>(null);

export default function ToastContextProvider({ children }: ToastConetextProvier) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (
    text: string,
    { id = Math.random().toString(), ...toastOptions }: addToast = {},
  ) => {
    const newToast = {
      id,
      text,
      ...defaultToast,
      ...toastOptions,
    };

    setToasts(curretnToasts => [...curretnToasts, newToast]);

    if (newToast.autoCleanup) {
      setTimeout(() => {
        setToasts(currentToasts => currentToasts.filter(toast => toast.id !== newToast.id));
      }, newToast.cleanupTimeout);
    }
  };

  const removeToast = (id: string) => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, toasts, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

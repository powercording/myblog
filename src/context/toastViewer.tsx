'use client';

import { Toast } from './ToastContextProvider';
import { useToast } from './useToast';

export default function ToastViewer() {
  const { toasts, removeToast } = useToast();

  const toastsByPosition = toasts.reduce(
    (groupToasts, toast) => {
      const { position } = toast;

      if (!groupToasts[position]) {
        groupToasts[position] = [];
      }

      groupToasts[position].push(toast);

      return groupToasts;
    },
    {} as Record<string, Toast[]>,
  );

  return (
    <div>
      {Object.entries(toastsByPosition).map(([position, toasts]) => {
        return (
          <div key={position} className={`${position} toast-container`}>
            {toasts.map(toast => {
              return <ToastMessage key={toast.id} toast={toast} removeToast={removeToast} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

interface ToastMessageProps {
  toast: Toast;
  removeToast: (id: string) => void;
}

function ToastMessage({ toast, removeToast }: ToastMessageProps) {
  return (
    <div
      className={`flex h-12 w-full items-center justify-center rounded-md bg-green-200 p-4 ${toast.type} text-xs md:w-[200px]`}
      onClick={() => removeToast(toast.id)}
    >
      {toast.text}
    </div>
  );
}

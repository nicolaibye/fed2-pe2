import { useState } from "react";
import type { ReactNode } from "react";
import { ToastContext } from "./useToastContext";

export type ToastType = "success" | "error" | "warning";

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

export interface ToastContextValue {
  toast: Toast[] | null;
  showToast: (type: ToastType, message: string) => void;
  hideToast: () => void;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast[]>([]);

  function showToast(type: ToastType, message: string) {
    const id = Date.now();
    setToast((prevToast) => [...prevToast, { id, type, message }]);
    setTimeout(() => {
      setToast((prevToast) => prevToast.filter((t) => t.id !== id));
    }, 3000);
  }

  function hideToast(id: number) {
    setToast((prevToast) => prevToast.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

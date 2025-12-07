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
      <ul className="fixed w-[calc(100%-2rem)] md:w-auto bottom-20 md:bottom-4 md:right-4 flex flex-col gap-2 z-1005">
        {toast.map((t) => (
          <li
            key={t.id}
            className={`${t.type === "success" ? "bg-green-400" : t.type === "error" ? "bg-red-400" : "bg-yellow-400"} text-white px-4 py-2 rounded fixed w-[calc(100%-2rem)] md:w-auto bottom-20 md:bottom-4 md:right-4 flex flex-col gap-2 z-500`}
            onClick={() => hideToast(t.id)}
          >
            <p>{t.message}</p>
          </li>
        ))}
      </ul>
    </ToastContext.Provider>
  );
}

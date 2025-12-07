import { createContext } from "react";
import type { ToastContextValue } from "./";

export const ToastContext = createContext<ToastContextValue>({
  toast: null,
  showToast: () => {},
  hideToast: () => {},
});

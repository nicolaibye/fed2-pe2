import { use } from "react";
import { ToastContext } from "../../context/ToastContext/useToastContext";

export function ToastList() {
  const { toast, hideToast } = use(ToastContext);

  if (!toast) return null;

  return (
    <ul className="fixed w-[calc(100%-2rem)] md:w-auto bottom-20 md:bottom-4 md:right-4 flex flex-col gap-2 z-1005">
      {toast.map((t) => (
        <li
          key={t.id}
          className={`${t.type === "success" ? "bg-green-400" : t.type === "error" ? "bg-red-400" : "bg-yellow-400"} text-white px-4 py-2 rounded fixed w-[calc(100%-2rem)] md:w-auto bottom-20 md:bottom-4 md:right-4 flex flex-col gap-2 z-500`}
          onClick={() => hideToast}
        >
          <p>{t.message}</p>
        </li>
      ))}
    </ul>
  );
}

export default ToastList;

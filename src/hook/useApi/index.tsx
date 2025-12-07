import { useState, useEffect, useContext } from "react";
import { ToastContext } from "../../context/ToastContext/useToastContext";

export function useApi<T>(url: string, options?: RequestInit) {
  const { showToast } = useContext(ToastContext);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) {
      return;
    }
    async function fetchData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url, {
          ...options,
        });
        if (!response.ok) {
          const message = await response.text();
          showToast("error", message);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data);

        if (result.message) {
          showToast("success", result.message);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
        showToast("error", (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, options]);
  return { data, isLoading, isError };
}

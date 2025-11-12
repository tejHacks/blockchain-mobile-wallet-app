import { useEffect, useState } from "react";

export default function useFetch<T = any>(endpoint: string, options: RequestInit = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = "https://api.coingecko.com/api/v3";

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
          headers: { "Content-Type": "application/json" },
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        if (isMounted) setData(json);
      } catch (err: any) {
        console.error("❌ Fetch error:", err);
        if (isMounted)
          setError("Network error — please check your connection.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    // cleanup to avoid state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [endpoint, options]);

  return { data, loading, error };
}

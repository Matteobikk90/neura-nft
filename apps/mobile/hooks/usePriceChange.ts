import { useEffect, useState } from "react";

export function useEthPriceChange() {
  const [change, setChange] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPriceChange = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true",
        );
        const data = await res.json();
        const changeValue = data?.ethereum?.usd_24h_change;
        if (typeof changeValue === "number") {
          setChange(changeValue);
        }
      } catch {
        setError("Failed to fetch ETH price change");
      } finally {
        setLoading(false);
      }
    };

    fetchPriceChange();
  }, []);

  return { change, loading, error };
}

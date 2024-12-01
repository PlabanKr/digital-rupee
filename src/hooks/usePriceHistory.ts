import { useState, useEffect } from 'react';

interface PriceData {
  timestamp: number;
  price: number;
}

export function usePriceHistory() {
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        // Simulate API call - replace with actual data fetching
        const mockData = Array.from({ length: 30 }, (_, i) => ({
          timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
          price: 75 + Math.random() * 5
        }));
        
        setPriceHistory(mockData);
      } catch (error) {
        console.error('Error fetching price history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPriceHistory();
  }, []);

  return { priceHistory, isLoading };
}
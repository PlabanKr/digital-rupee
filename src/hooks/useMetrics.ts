import { useState, useEffect } from 'react';

interface Metrics {
  totalSupply: number;
  activeUsers: number;
  dailyTransactions: number;
}

export function useMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    totalSupply: 0,
    activeUsers: 0,
    dailyTransactions: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Simulate API call - replace with actual data fetching
        const mockMetrics = {
          totalSupply: 1000000000,
          activeUsers: 25000,
          dailyTransactions: 15000
        };
        
        setMetrics(mockMetrics);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { metrics, isLoading };
}
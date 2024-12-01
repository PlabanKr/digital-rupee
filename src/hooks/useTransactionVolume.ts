import { useState, useEffect } from 'react';

interface VolumeData {
  timestamp: number;
  volume: number;
}

export function useTransactionVolume() {
  const [volumeData, setVolumeData] = useState<VolumeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVolumeData = async () => {
      try {
        // Simulate API call - replace with actual data fetching
        const mockData = Array.from({ length: 7 }, (_, i) => ({
          timestamp: Date.now() - (6 - i) * 24 * 60 * 60 * 1000,
          volume: 1000 + Math.floor(Math.random() * 5000)
        }));
        
        setVolumeData(mockData);
      } catch (error) {
        console.error('Error fetching volume data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVolumeData();
  }, []);

  return { volumeData, isLoading };
}
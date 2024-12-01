import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { useTransactionVolume } from '../../hooks/useTransactionVolume';

export function TransactionVolume() {
  const { volumeData, isLoading } = useTransactionVolume();

  if (isLoading) {
    return (
      <div className="animate-pulse bg-white rounded-lg p-6 h-[400px]">
        <div className="h-full bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction Volume</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={volumeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(timestamp) => format(new Date(timestamp), 'MMM d')}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(timestamp) => format(new Date(timestamp), 'MMM d, yyyy')}
              formatter={(value: number) => [`${value.toLocaleString()} transactions`, 'Volume']}
            />
            <Bar dataKey="volume" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
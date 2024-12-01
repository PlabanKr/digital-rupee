import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean | null;
}

export function StatsCard({ title, value, icon, trend, trendUp }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 text-sm">{title}</span>
        <div className="text-gray-400">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="flex items-center mt-2">
            {trendUp !== null && (
              <div className={`flex items-center ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {trendUp ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
              </div>
            )}
            <span className={`text-sm ml-1 ${
              trendUp === null ? 'text-gray-500' : 
              trendUp ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
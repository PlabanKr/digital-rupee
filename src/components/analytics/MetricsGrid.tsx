import React from 'react';
import { TrendingUp, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useMetrics } from '../../hooks/useMetrics';

export function MetricsGrid() {
  const { metrics, isLoading } = useMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-lg p-6">
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Supply</p>
            <h3 className="text-2xl font-bold text-gray-900">
              ₹{metrics.totalSupply.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-500">+2.5%</span>
          <span className="text-gray-500 ml-2">from last month</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Users</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {metrics.activeUsers.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <Users className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-green-500">+5.2%</span>
          <span className="text-gray-500 ml-2">from last week</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Daily Transactions</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {metrics.dailyTransactions.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <ArrowUpRight className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
          <span className="text-red-500">-1.8%</span>
          <span className="text-gray-500 ml-2">from yesterday</span>
        </div>
      </div>
    </div>
  );
}
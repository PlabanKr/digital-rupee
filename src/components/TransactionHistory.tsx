import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const transactions = [
  {
    id: 1,
    type: 'sent',
    amount: '1,000',
    address: '0x1234...5678',
    timestamp: '2 minutes ago',
    status: 'completed',
  },
  {
    id: 2,
    type: 'received',
    amount: '500',
    address: '0x8765...4321',
    timestamp: '1 hour ago',
    status: 'completed',
  },
  {
    id: 3,
    type: 'sent',
    amount: '2,500',
    address: '0x9876...1234',
    timestamp: '3 hours ago',
    status: 'pending',
  },
];

export function TransactionHistory() {
  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-2 rounded-lg ${
                tx.type === 'sent' ? 'bg-red-50' : 'bg-green-50'
              }`}
            >
              {tx.type === 'sent' ? (
                <ArrowUpRight
                  className={`w-5 h-5 ${
                    tx.type === 'sent' ? 'text-red-600' : 'text-green-600'
                  }`}
                />
              ) : (
                <ArrowDownLeft
                  className={`w-5 h-5 ${
                    tx.type === 'sent' ? 'text-red-600' : 'text-green-600'
                  }`}
                />
              )}
            </div>
            <div>
              <p className="font-medium text-black-900">
                {tx.type === 'sent' ? 'Sent' : 'Received'} ₹{tx.amount}
              </p>
              <p className="text-sm text-gray-500">{tx.address}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">{tx.timestamp}</p>
            <p
              className={`text-sm ${
                tx.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
              }`}
            >
              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

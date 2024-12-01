import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import { useWallet } from '../hooks/useWallet';
import { formatDistanceToNow } from 'date-fns';

export function UserTransactions() {
  const { account } = useWallet();
  const transactions = useTransactions(account);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h1>

        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No transactions found
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.hash} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    tx.from.toLowerCase() === account?.toLowerCase() ? 'bg-red-50' : 'bg-green-50'
                  }`}>
                    {tx.from.toLowerCase() === account?.toLowerCase() ? (
                      <ArrowUpRight className="w-5 h-5 text-red-600" />
                    ) : (
                      <ArrowDownLeft className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {tx.from.toLowerCase() === account?.toLowerCase() ? 'Sent' : 'Received'} ₹{tx.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {tx.from.toLowerCase() === account?.toLowerCase() ? 'To: ' : 'From: '}
                      {tx.from.toLowerCase() === account?.toLowerCase() ? tx.to : tx.from}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
                    </p>
                    <p className={`text-sm ${
                      tx.status === 'completed' ? 'text-green-600' : 
                      tx.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </p>
                  </div>
                  <Link 
                    to={`/transaction/${tx.hash}`}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
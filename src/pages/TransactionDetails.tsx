import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TransactionDetails() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Transaction Details</h1>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Transaction Hash</label>
              <p className="mt-1 text-gray-900">{id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Status</label>
              <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Success
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">From</label>
              <p className="mt-1 text-gray-900">0x1234...5678</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">To</label>
              <p className="mt-1 text-gray-900">0x8765...4321</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Value</label>
            <p className="mt-1 text-xl font-bold text-gray-900">₹ 1,000.00</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Transaction Fee</label>
            <p className="mt-1 text-gray-900">0.0021 ETH</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Timestamp</label>
            <p className="mt-1 text-gray-900">Mar 15, 2024 14:30:45</p>
          </div>
        </div>
      </div>
    </div>
  );
}
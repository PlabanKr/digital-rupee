import React from 'react';
import { useTradingContext } from '../context/TradingContext';

const tabs = ['ALL', 'GAINERS', 'LOSERS', 'LAYER-1', 'SMART CONTRACTS', 'MEME COINS'] as const;

export function TradingTabs() {
  const { activeTab, setActiveTab } = useTradingContext();

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
            ${activeTab === tab 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-[#242642]'
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
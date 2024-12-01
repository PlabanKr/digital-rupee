import React from 'react';
import { ArrowUp, ArrowDown, MoreVertical } from 'lucide-react';
import { useTradingContext } from '../context/TradingContext';
import { useSearchContext } from '../context/SearchContext';

const allMarketData = [
  {
    id: 1,
    name: 'Digital Rupee',
    symbol: 'DINR',
    price: '54,157.31',
    change: '+1.29',
    volume: '689.73',
    isUp: true,
    category: 'LAYER-1'
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: '3,01,747.72',
    change: '+5.6',
    volume: '16,001.77',
    isUp: true,
    category: 'SMART CONTRACTS'
  },
  {
    id: 3,
    name: 'BNB',
    symbol: 'BNB',
    price: '54,157.31',
    change: '-2.5',
    volume: '689.73',
    isUp: false,
    category: 'LAYER-1'
  },
  {
    id: 4,
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: '12.31',
    change: '+15.5',
    volume: '1,289.73',
    isUp: true,
    category: 'MEME COINS'
  }
];

export function MarketOverview() {
  const { activeTab } = useTradingContext();
  const { searchQuery } = useSearchContext();
  
  const filteredMarketData = allMarketData.filter(coin => {
    const matchesTab = 
      activeTab === 'ALL' ||
      (activeTab === 'GAINERS' && coin.isUp) ||
      (activeTab === 'LOSERS' && !coin.isUp) ||
      coin.category === activeTab;

    const matchesSearch = 
      searchQuery === '' ||
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-[#242642] rounded-lg border border-[#2e305b] overflow-hidden">
      <div className="grid grid-cols-6 gap-4 p-4 border-b border-[#2e305b] text-sm text-gray-400">
        <div className="col-span-2">Coin</div>
        <div>Price (₹)</div>
        <div>24h Change</div>
        <div>24h Volume</div>
        <div className="text-center">Actions</div>
      </div>
      
      {filteredMarketData.length > 0 ? (
        filteredMarketData.map((coin) => (
          <div key={coin.id} className="grid grid-cols-6 gap-4 p-4 border-b border-[#2e305b] hover:bg-[#2a2c4a] transition-colors">
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                {coin.symbol.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-white">{coin.name}</div>
                <div className="text-sm text-gray-400">{coin.symbol}</div>
              </div>
            </div>
            <div className="flex items-center text-white">₹{coin.price}</div>
            <div className={`flex items-center ${coin.isUp ? 'text-green-400' : 'text-red-400'}`}>
              {coin.isUp ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              {coin.change}%
            </div>
            <div className="flex items-center text-white">₹{coin.volume}</div>
            <div className="flex items-center justify-center gap-2">
              <button className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700">
                Buy
              </button>
              <button className="px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700">
                Sell
              </button>
              <button className="p-1 text-gray-400 hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="p-8 text-center text-gray-400">
          No coins found for the selected category and search criteria
        </div>
      )}
    </div>
  );
}
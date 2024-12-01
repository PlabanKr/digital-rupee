import React, { createContext, useContext, useState, ReactNode } from 'react';

type TabType = 'ALL' | 'GAINERS' | 'LOSERS' | 'LAYER-1' | 'SMART CONTRACTS' | 'MEME COINS';

interface TradingContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export function TradingProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>('ALL');

  return (
    <TradingContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TradingContext.Provider>
  );
}

export function useTradingContext() {
  const context = useContext(TradingContext);
  if (context === undefined) {
    throw new Error('useTradingContext must be used within a TradingProvider');
  }
  return context;
}
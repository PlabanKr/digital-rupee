import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { WalletConnect } from './components/WalletConnect';
import { TransactionForm } from './components/TransactionForm';
import { PriceChart } from './components/analytics/PriceChart';
import { TransactionVolume } from './components/analytics/TransactionVolume';
import { MetricsGrid } from './components/analytics/MetricsGrid';
import { UserTransactions } from './pages/UserTransactions';
import { TransactionDetails } from './pages/TransactionDetails';
import { useWallet } from './hooks/useWallet';
import { Coins } from 'lucide-react';

function App() {
  const { 
    account, 
    contract, 
    balance, 
    nativeBalance,
    networkName,
    isConnecting, 
    connectWallet 
  } = useWallet();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-right" />
        
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Coins className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Digital Rupee</span>
              </div>
              <WalletConnect 
                account={account} 
                isConnecting={isConnecting}
                onConnect={connectWallet}
                balance={balance}
                nativeBalance={nativeBalance}
                networkName={networkName}
              />
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="space-y-8">
                <MetricsGrid />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <PriceChart />
                  <TransactionVolume />
                </div>
                {account && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Transfer Tokens</h2>
                    <TransactionForm contract={contract} account={account} />
                  </div>
                )}
                {!account && (
                  <div className="text-center bg-white rounded-lg shadow-sm p-12">
                    <Coins className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Connect your wallet to get started
                    </h2>
                    <p className="text-gray-600 mb-8">
                      You'll need MetaMask installed to interact with the Digital Rupee.
                    </p>
                    <button
                      onClick={connectWallet}
                      disabled={isConnecting}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    >
                      Connect Wallet
                    </button>
                  </div>
                )}
              </div>
            </main>
          } />
          <Route path="/transactions" element={<UserTransactions />} />
          <Route path="/transaction/:id" element={<TransactionDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { Wallet, Loader2, ArrowLeftRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WalletConnectProps {
  account: string;
  isConnecting: boolean;
  onConnect: () => void;
  balance: string;
  nativeBalance: string;
  networkName: string;
}

export function WalletConnect({ 
  account, 
  isConnecting, 
  onConnect, 
  balance,
  nativeBalance,
  networkName 
}: WalletConnectProps) {
  return (
    <div className="flex items-center gap-4">
      {account ? (
        <div className="flex items-center gap-4">
          <div className="hidden md:block px-4 py-2 bg-[#1a1b2e] rounded-lg border border-[#2e305b]">
            <div className="text-xs text-gray-400">Network</div>
            <div className="text-sm font-medium text-white capitalize">{networkName || 'Unknown'}</div>
          </div>
          <div className="hidden md:block px-4 py-2 bg-[#1a1b2e] rounded-lg border border-[#2e305b]">
            <div className="text-xs text-gray-400">ETH Balance</div>
            <div className="text-sm font-medium text-white">{parseFloat(nativeBalance).toFixed(4)} ETH</div>
          </div>
          <div className="hidden md:block px-4 py-2 bg-[#1a1b2e] rounded-lg border border-[#2e305b]">
            <div className="text-xs text-gray-400">CBDC Balance</div>
            <div className="text-sm font-medium text-white">₹ {parseFloat(balance).toFixed(2)}</div>
          </div>
          <div className="px-4 py-2 bg-[#1a1b2e] rounded-lg border border-[#2e305b] flex items-center gap-2">
            <Wallet className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-white">
              {`${account.slice(0, 6)}...${account.slice(-4)}`}
            </span>
          </div>
          <Link to="/transactions" className="px-4 py-2 bg-[#1a1b2e] rounded-lg border border-[#2e305b] flex items-center gap-2 cursor-pointer">
            <ArrowLeftRight className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-white">Transactions</span>
          </Link>
        </div>
      ) : (
        <button
          onClick={onConnect}
          disabled={isConnecting}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-800"
        >
          {isConnecting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Wallet className="w-4 h-4" />
          )}
          {isConnecting ? 'Connecting...' : 'Connect'}
        </button>
      )}
    </div>
  );
}
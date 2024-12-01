import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider, Contract, formatEther } from 'ethers';
import toast from 'react-hot-toast';
import { requestAccount, createContract, checkMetaMaskInstalled } from '../utils/wallet';
import { getWalletError } from '../utils/errors';

export function useWallet() {
  const [account, setAccount] = useState<string>('');
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [nativeBalance, setNativeBalance] = useState<string>('0');
  const [isConnecting, setIsConnecting] = useState(false);
  const [networkName, setNetworkName] = useState<string>('');

  const updateBalances = useCallback(async () => {
    if (provider && account) {
      try {
        // Get native token (ETH) balance
        const ethBalance = await provider.getBalance(account);
        setNativeBalance(formatEther(ethBalance));

        // Get CBDC token balance if contract is available
        if (contract) {
          const tokenBalance = await contract.balanceOf(account);
          setBalance(formatEther(tokenBalance));
        }

        // Get network information
        const network = await provider.getNetwork();
        setNetworkName(network.name);
      } catch (error) {
        console.error('Error fetching balances:', error);
        toast.error('Failed to fetch balances');
      }
    }
  }, [provider, contract, account]);

  const connectWallet = useCallback(async () => {
    if (isConnecting) return;
    
    try {
      setIsConnecting(true);
      
      if (!checkMetaMaskInstalled()) {
        toast.error('Please install MetaMask to continue');
        return;
      }

      const newAccount = await requestAccount();
      const { provider: newProvider, contract: newContract } = await createContract();
      
      setAccount(newAccount);
      setProvider(newProvider);
      setContract(newContract);
      
      toast.success('Wallet connected successfully!');
      
    } catch (error) {
      console.error('Connection error:', error);
      toast.error(getWalletError(error));
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting]);

  useEffect(() => {
    if (account && provider) {
      updateBalances();
    }
  }, [account, provider, updateBalances]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        const newAccount = accounts[0] || '';
        setAccount(newAccount);
        
        if (newAccount) {
          try {
            const { provider: newProvider, contract: newContract } = await createContract();
            setProvider(newProvider);
            setContract(newContract);
            updateBalances();
          } catch (error) {
            console.error('Error reconnecting:', error);
            toast.error('Failed to reconnect wallet');
          }
        } else {
          setProvider(null);
          setContract(null);
          setBalance('0');
          setNativeBalance('0');
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, [updateBalances]);

  return {
    account,
    provider,
    contract,
    balance,
    nativeBalance,
    networkName,
    isConnecting,
    connectWallet
  };
}
import { BrowserProvider, Contract } from 'ethers';
import { WalletError } from './errors';
import { NATIVE_COIN_ABI, CONTRACT_ADDRESS } from '../contracts/NativeCoin';

export const checkMetaMaskInstalled = (): boolean => {
  return typeof window.ethereum !== 'undefined';
};

export const requestAccount = async (): Promise<string> => {
  if (!checkMetaMaskInstalled()) {
    throw new WalletError('Please install MetaMask to continue');
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts'
    });
    return accounts[0];
  } catch (error) {
    throw new WalletError(error?.message || 'Failed to connect wallet');
  }
};

export const createContract = async (): Promise<{
  provider: BrowserProvider;
  contract: Contract;
}> => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new Contract(CONTRACT_ADDRESS, NATIVE_COIN_ABI, signer);
  
  return { provider, contract };
};
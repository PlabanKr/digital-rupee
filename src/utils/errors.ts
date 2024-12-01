export class WalletError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WalletError';
  }
}

export const getWalletError = (error: any): string => {
  if (error?.code === 4001) {
    return 'You rejected the connection request';
  }
  if (error?.code === -32002) {
    return 'Please check MetaMask. A connection request is pending';
  }
  return error?.message || 'Failed to connect wallet';
};
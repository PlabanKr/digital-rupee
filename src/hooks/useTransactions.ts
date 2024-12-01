import { useEffect, useState } from 'react';
import { useTransactionStore, Transaction } from '../stores/transactionStore';

export function useTransactions(address?: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const getTransactionsByAddress = useTransactionStore(state => state.getTransactionsByAddress);
  const allTransactions = useTransactionStore(state => state.transactions);

  useEffect(() => {
    if (address) {
      setTransactions(getTransactionsByAddress(address));
    } else {
      setTransactions(allTransactions);
    }
  }, [address, getTransactionsByAddress, allTransactions]);

  return transactions;
}
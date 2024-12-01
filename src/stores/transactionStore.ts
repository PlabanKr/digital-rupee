import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (hash: string, updates: Partial<Transaction>) => void;
  getTransactionsByAddress: (address: string) => Transaction[];
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions]
        })),
      updateTransaction: (hash, updates) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.hash === hash ? { ...tx, ...updates } : tx
          )
        })),
      getTransactionsByAddress: (address) => {
        const state = get();
        return state.transactions.filter(
          (tx) => tx.from.toLowerCase() === address.toLowerCase() ||
                 tx.to.toLowerCase() === address.toLowerCase()
        );
      }
    }),
    {
      name: 'transaction-store'
    }
  )
);
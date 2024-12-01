import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Contract, parseEther } from 'ethers';
import { useTransactionStore } from '../stores/transactionStore';

interface TransactionFormProps {
  contract: Contract | null;
  account: string;
}

export function TransactionForm({ contract, account }: TransactionFormProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || !recipient || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      // Validate recipient address
      if (!recipient.match(/^0x[a-fA-F0-9]{40}$/)) {
        throw new Error('Invalid recipient address');
      }

      // Convert amount to Wei (considering 18 decimals)
      const amountInWei = parseEther(amount);

      // Check if the contract has the transfer function
      if (!contract.transfer) {
        throw new Error('Contract transfer function not found');
      }

      // Send transaction
      const tx = await contract.transfer(recipient, amountInWei);

      // Add to transaction store
      addTransaction({
        hash: tx.hash,
        from: account,
        to: recipient,
        amount: parseFloat(amount),
        timestamp: Date.now(),
        status: 'pending',
      });

      // Show toast with transaction hash
      toast.promise(tx.wait(), {
        loading: 'Transaction is pending...',
        success: (receipt) => {
          // Update transaction status
          addTransaction({
            hash: tx.hash,
            from: account,
            to: recipient,
            amount: parseFloat(amount),
            timestamp: Date.now(),
            status: 'completed',
          });
          return 'Transaction successful!';
        },
        error: (err) => {
          // Update transaction status
          addTransaction({
            hash: tx.hash,
            from: account,
            to: recipient,
            amount: parseFloat(amount),
            timestamp: Date.now(),
            status: 'failed',
          });
          return `Transaction failed: ${err.message}`;
        },
      });

      setRecipient('');
      setAmount('');
    } catch (error: any) {
      console.error('Transfer error:', error);
      toast.error(error.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleTransfer} className="space-y-4">
      <div>
        <label
          htmlFor="recipient"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Recipient Address
        </label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="0x..."
          required
          pattern="^0x[a-fA-F0-9]{40}$"
          title="Please enter a valid Ethereum address"
        />
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amount (₹)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg ${
            amount
              ? 'border-green-500 text-green-600 focus:ring-green-500 focus:bg-green-50'
              : 'border-gray-300 text-gray-700 focus:ring-blue-500 focus:bg-blue-50'
          }`}
          placeholder="0.0"
          required
          min="0"
          step="0.000000000000000001"
        />
      </div>

      <button
        type="submit"
        disabled={!account || loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send
          </>
        )}
      </button>
    </form>
  );
}

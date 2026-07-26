'use client';
import { Transaction } from '@/app/app/_data/transactions';
import { useEffect, useMemo } from 'react';
import { create } from 'zustand';

export type FilterKey = 'All' | 'USDT' | 'USDC' | 'Income' | 'Expense';

interface TransactionStoreState {
   setTransactions: (transactions: Transaction[]) => void;
   transactions: Transaction[];
   activeFilter: FilterKey;
   setFilter: (filter: FilterKey) => void;
   filteredTransactions: Transaction[];
}

export const useTransactionStore = create<TransactionStoreState>((set, get) => {
   return {
      setTransactions: (transactions) => {
         set({ transactions, filteredTransactions: applyFilter(transactions, get().activeFilter) });
      },
      transactions: [],
      activeFilter: 'All',
      setFilter: (filter) => {
         set({ activeFilter: filter, filteredTransactions: applyFilter(get().transactions, filter) });
      },
      filteredTransactions: [],
   };
});

function applyFilter(transactions: Transaction[], filter: FilterKey): Transaction[] {
   switch (filter) {
      case 'USDT':
         return transactions.filter((tx) => tx.asset === 'USDT');
      case 'USDC':
         return transactions.filter((tx) => tx.asset === 'USDC');
      case 'Income':
         return transactions.filter((tx) => tx.direction === 'RECEIVED');
      case 'Expense':
         return transactions.filter((tx) => tx.direction === 'SENT');
      default:
         return transactions;
   }
}

export function useHydratedTransactionStore(transactions: Transaction[]) {
   const { setTransactions } = useTransactionStore();
   useEffect(() => {
      setTransactions(transactions);
   }, [setTransactions, transactions]);
}

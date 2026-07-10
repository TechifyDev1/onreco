'use client';
import { Transaction } from '@/app/app/_data/transactions';
import { useEffect } from 'react';
import { create } from 'zustand';

interface TransactionStoreState {
   setTransactions: (transactions: Transaction[]) => void;
   transactions: Transaction[] | [];
}

export const useTransactionStore = create<TransactionStoreState>((set) => {
   return {
      setTransactions: (transactions) => {
         set({ transactions: transactions });
      },
      transactions: [],
   };
});

export function useHydratedTransactionStore(transactions: Transaction[]) {
   const { setTransactions } = useTransactionStore();
   useEffect(() => {
      setTransactions(transactions);
   }, [setTransactions, transactions]);
}

'use client';
import { Transaction } from '@/app/app/_data/transactions';
import { useEffect, useMemo } from 'react';
import { create } from 'zustand';

export type FilterKey = 'All' | 'USDT' | 'USDC' | 'Income' | 'Expense';

export const PAGE_SIZE = 12;

interface TransactionStoreState {
   setTransactions: (transactions: Transaction[]) => void;
   transactions: Transaction[];
   activeFilter: FilterKey;
   setFilter: (filter: FilterKey) => void;
   filteredTransactions: Transaction[];
   currentPage: number;
   pageSize: number;
   setPage: (page: number) => void;
   paginatedTransactions: Transaction[];
   totalPages: number;
}

export const useTransactionStore = create<TransactionStoreState>((set, get) => {
   return {
      setTransactions: (transactions) => {
         const filtered = applyFilter(transactions, get().activeFilter);
         const paged = paginate(filtered, 1, PAGE_SIZE);
         set({
            transactions,
            filteredTransactions: filtered,
            currentPage: paged.page,
            paginatedTransactions: paged.items,
            totalPages: paged.totalPages,
         });
      },
      transactions: [],
      activeFilter: 'All',
      setFilter: (filter) => {
         const filtered = applyFilter(get().transactions, filter);
         const paged = paginate(filtered, 1, PAGE_SIZE);
         set({
            activeFilter: filter,
            filteredTransactions: filtered,
            currentPage: paged.page,
            paginatedTransactions: paged.items,
            totalPages: paged.totalPages,
         });
      },
      filteredTransactions: [],
      currentPage: 1,
      pageSize: PAGE_SIZE,
      setPage: (page) => {
         const paged = paginate(get().filteredTransactions, page, PAGE_SIZE);
         set({ currentPage: paged.page, paginatedTransactions: paged.items, totalPages: paged.totalPages });
      },
      paginatedTransactions: [],
      totalPages: 1,
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

function paginate(items: Transaction[], page: number, pageSize: number) {
   const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
   const safePage = Math.min(Math.max(page, 1), totalPages);
   const start = (safePage - 1) * pageSize;
   return { items: items.slice(start, start + pageSize), page: safePage, totalPages };
}

export function useHydratedTransactionStore(transactions: Transaction[]) {
   const { setTransactions } = useTransactionStore();
   useEffect(() => {
      setTransactions(transactions);
   }, [setTransactions, transactions]);
}

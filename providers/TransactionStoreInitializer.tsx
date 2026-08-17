'use client';
import { Transaction } from '@/app/app/_data/transactions';
import { useHydratedTransactionStore } from './transaction-store';

export default function TransactionStoreInitializer({ transactions }: { transactions: Transaction[] }) {
   useHydratedTransactionStore(transactions);
   return null;
}

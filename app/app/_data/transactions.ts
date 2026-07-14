export type TransactionType = 'RECEIVED' | 'SENT';
export type Asset = 'USDT' | 'USDC';
export type SyncStatus = 'SYNCED' | 'PENDING' | 'FAILED';

export type Transaction = {
   id: string;
   date: string;
   asset: Asset;
   direction: TransactionType;
   amount: string;
   usd: string;
   wallet: string;
   category: string;
   counterparty: string;
   status: SyncStatus;
};

export const TX_STATUS_STYLES: Record<SyncStatus, string> = {
   SYNCED: 'bg-primary/10 text-primary',
   PENDING: 'bg-secondary/15 text-secondary',
   FAILED: 'bg-tertiary-container/20 text-tertiary',
};

export const TX_FILTERS = ['All', 'USDT', 'USDC', 'Income', 'Expense'] as const;

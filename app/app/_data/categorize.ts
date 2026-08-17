export type TransactionType = 'RECEIVED' | 'SENT';
export type Asset = 'USDT' | 'USDC';
export type SyncStatus = 'SYNCED' | 'PENDING' | 'FAILED';
export type SupportedChain = 'SOLANA' | 'BASE' | 'TRON';

export type PendingEntry = {
   id: string;
   txHash: string;
   amount: string;
   currency: Asset;
   chain: SupportedChain;
   type: TransactionType;
   txDate: string;
   walletAddress: string;
   counterpartyAddress: string | null;
   syncStatus: SyncStatus;
   errorMessage: string | null;
};

export type BatchSyncItem = {
   journalEntryId: string;
   offsetAccountId: string;
};

export type EntryResult = {
   journalEntryId: string;
   status: SyncStatus;
   error: string | null;
};

export type BatchSyncResponse = {
   synced: number;
   failed: number;
   results: EntryResult[];
};

export const CATEGORIZE_TABS = ['Pending', 'Failed'] as const;
export type CategorizeTab = (typeof CATEGORIZE_TABS)[number];

export const TX_DIRECTION_STYLES: Record<TransactionType, string> = {
   RECEIVED: 'bg-primary/10 text-primary',
   SENT: 'bg-secondary/15 text-secondary',
};

export const SYNC_STATUS_STYLES: Record<SyncStatus, string> = {
   SYNCED: 'bg-primary/10 text-primary',
   PENDING: 'bg-secondary/15 text-secondary',
   FAILED: 'bg-tertiary-container/20 text-tertiary',
};

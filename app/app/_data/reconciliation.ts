export type TransactionType = 'RECEIVED' | 'SENT';
export type Asset = 'USDT' | 'USDC';
export type SupportedChain = 'SOLANA' | 'BASE' | 'TRON';

export type InvoiceMatch = {
   id: string;
   docNumber: string | null;
   customerName: string | null;
   totalAmount: string;
   balance: string;
   dueDate: string | null;
};

export type ReconcileMatch = {
   journalEntryId: string;
   txHash: string;
   amount: string;
   currency: Asset;
   chain: SupportedChain;
   type: TransactionType;
   txDate: string;
   walletAddress: string;
   counterpartyAddress: string | null;
   invoice: InvoiceMatch | null;
   confidence: number;
};

export type ReconcileResponse = {
   matches: ReconcileMatch[];
   totalPending: number;
   totalOpenInvoices: number;
};

export function confidenceStyle(c: number) {
   if (c >= 90) return 'bg-primary/15 text-primary border-primary/30';
   if (c >= 70) return 'bg-secondary/20 text-secondary border-secondary/30';
   return 'bg-tertiary-container/20 text-tertiary border-tertiary-container/30';
}

export function confidenceLabel(c: number) {
   if (c >= 90) return 'Strong';
   if (c >= 70) return 'Good';
   if (c >= 50) return 'Weak';
   return 'No match';
}

import ApiClient from './ApiClient';

export type SupportedChain = 'SOLANA' | 'BASE' | 'TRON';
export type SupportedCurrency = 'USDT' | 'USDC';
export type TransactionType = 'RECEIVED' | 'SENT';
export type SyncStatus = 'SYNCED' | 'PENDING' | 'FAILED';

export interface ChartDataPoint {
   date: string;
   inFlow: number;
   outFlow: number;
}

export interface AccountingIntegrationStatus {
   name: string;
   slug: string;
   available: boolean;
   connected: boolean;
   connectedAt: string | null;
   lastSyncAt: string | null;
   pushed30d: number;
}

export interface JournalEntryResponse {
   id: string;
   txHash: string;
   amount: number;
   currency: SupportedCurrency;
   chain: SupportedChain;
   type: TransactionType;
   syncStatus: SyncStatus;
   journalEntryId: string | null;
   txDate: string;
   createdAt: string;
}

export interface WalletResponse {
   id: string;
   address: string;
   chain: SupportedChain;
   monitoredCurrencies: SupportedCurrency[];
   label: string;
   active: boolean;
   createdAt: string;
   lastSyncAt: string | null;
   transactionCount30d: number;
}

export interface DashboardSummary {
   inflow30d: number;
   outflow30d: number;
   inflowChange: number;
   outflowChange: number;
   reconciliationRate: number;
   pendingSync: number;
   pushed30d: number;
   integrations: AccountingIntegrationStatus[];
   activityChart: ChartDataPoint[];
   recentTransactions: JournalEntryResponse[];
   connectedWallets: WalletResponse[];
}

export class DashboardService {
   private static readonly dashboardBasePath = '/dashboard';

   static async getSummary(): Promise<DashboardSummary> {
      const res = await ApiClient.get<DashboardSummary>(`${this.dashboardBasePath}/summary`);
      return res.data;
   }
}

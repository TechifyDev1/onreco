'use client';

import { useEffect } from 'react';
import { create } from 'zustand';
import type {
   AccountingIntegrationStatus,
   ChartDataPoint,
   DashboardSummary,
   JournalEntryResponse,
   WalletResponse,
} from '@/services/DashboardService';

interface DashboardStoreState {
   summary: DashboardSummary | null;
   setSummary: (summary: DashboardSummary) => void;
   integrations: AccountingIntegrationStatus[];
   activityChart: ChartDataPoint[];
   recentTransactions: JournalEntryResponse[];
   connectedWallets: WalletResponse[];
}

export const useDashboardStore = create<DashboardStoreState>((set) => ({
   summary: null,
   integrations: [],
   activityChart: [],
   recentTransactions: [],
   connectedWallets: [],

   setSummary: (summary) =>
      set({
         summary,
         integrations: summary.integrations,
         activityChart: summary.activityChart,
         recentTransactions: summary.recentTransactions,
         connectedWallets: summary.connectedWallets,
      }),
}));

export function useHydratedDashboardStore(summary: DashboardSummary) {
   const { setSummary } = useDashboardStore();
   useEffect(() => {
      setSummary(summary);
   }, [summary, setSummary]);
}

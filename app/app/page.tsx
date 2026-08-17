import type { Metadata } from 'next';

import ActivityChart from '@/components/dashboard/ActivityChart';
import QuickBooksPanel from '@/components/dashboard/QuickBooksPanel';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import StatsRow from '@/components/dashboard/StatsRow';
import WalletsPanel from '@/components/dashboard/WalletsPanel';
import DashboardStoreInitializer from '@/providers/DashboardStoreInitializer';
import { DashboardService, type DashboardSummary } from '@/services/DashboardService';
import { ApiError } from '@/services/ApiError';

export const metadata: Metadata = {
   title: 'Dashboard | Onreco Stablecoin Accounting',
   description:
      'Monitor USDT and USDC transactions, reconciliation status, and QuickBooks or Xero sync in one place.',
   robots: {
      index: false,
      follow: false,
   },
};

const EMPTY_SUMMARY: DashboardSummary = {
   inflow30d: 0,
   outflow30d: 0,
   inflowChange: 0,
   outflowChange: 0,
   reconciliationRate: 0,
   pendingSync: 0,
   pushed30d: 0,
   integrations: [],
   activityChart: [],
   recentTransactions: [],
   connectedWallets: [],
};

export default async function DashboardPage() {
   let summary = EMPTY_SUMMARY;
   try {
      summary = await DashboardService.getSummary();
   } catch (error) {
      if (error instanceof ApiError) {
         console.error('[DashboardPage] Failed to fetch summary:', error.message);
      } else {
         console.error('[DashboardPage] Failed to fetch summary:', error);
      }
   }

   return (
      <>
         <DashboardStoreInitializer summary={summary} />
         <div className="flex flex-col gap-6 md:gap-8">
            <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
               <div>
                  <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
                     Dashboard
                  </h1>
                  <p className="text-sm text-on-surface-variant mt-1">
                     Your stablecoin accounting, reconciliation, and QuickBooks or Xero sync at a glance.
                  </p>
               </div>
               <div className="text-xs text-on-surface-variant">
                  {new Date().toLocaleDateString('en-US', {
                     weekday: 'long',
                     year: 'numeric',
                     month: 'long',
                     day: 'numeric',
                  })}
               </div>
            </header>

            <StatsRow />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
               <div className="xl:col-span-2">
                  <ActivityChart />
               </div>
               <div>
                  <QuickBooksPanel />
               </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
               <div className="xl:col-span-2">
                  <RecentTransactions />
               </div>
               <div>
                  <WalletsPanel />
               </div>
            </div>
         </div>
      </>
   );
}

import type { Metadata } from 'next';
import ReconcileClient from './ReconcileClient';
import ReconcileStoreInitializer from '@/providers/ReconcileStoreInitializer';
import ReconcileService from '@/services/ReconcileService';
import { ApiError } from '@/services/ApiError';
import type { ReconcileResponse } from '../_data/reconciliation';

export const metadata: Metadata = {
   title: 'Reconciliation - Onreco',
};

export default async function Page() {
   let data: ReconcileResponse = { matches: [], totalPending: 0, totalOpenInvoices: 0 };
   try {
      data = await ReconcileService.getReconciliations();
   } catch (error) {
      if (error instanceof ApiError) {
         console.error('[ReconciliationPage] Failed to fetch reconciliations:', error.message);
      } else {
         console.error('[ReconciliationPage] Failed to fetch reconciliations:', error);
      }
   }

   return (
      <>
         <ReconcileStoreInitializer data={data} />
         <ReconcileClient />
      </>
   );
}

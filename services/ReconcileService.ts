import ApiClient from './ApiClient';
import type { ReconcileResponse } from '@/app/app/_data/reconciliation';

export default class ReconcileService {
   static async getReconciliations(): Promise<ReconcileResponse> {
      const response = await ApiClient.get<ReconcileResponse>('/reconcile');
      return response.data;
   }

   static async confirmMatch(journalEntryId: string, invoiceId: string): Promise<void> {
      await ApiClient.post<void, { journalEntryId: string; invoiceId: string }>(
         '/reconcile/confirm',
         { journalEntryId, invoiceId }
      );
   }
}

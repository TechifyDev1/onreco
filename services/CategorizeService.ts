import ApiClient from './ApiClient';
import type { PendingEntry, BatchSyncItem, BatchSyncResponse } from '@/app/app/_data/categorize';

export default class CategorizeService {
   static async getPendingEntries(): Promise<PendingEntry[]> {
      const response = await ApiClient.get<PendingEntry[]>('/categorize/pending');
      return response.data;
   }

   static async getFailedEntries(): Promise<PendingEntry[]> {
      const response = await ApiClient.get<PendingEntry[]>('/categorize/failed');
      return response.data;
   }

   static async batchSync(entries: BatchSyncItem[]): Promise<BatchSyncResponse> {
      const response = await ApiClient.post<BatchSyncResponse, { entries: BatchSyncItem[] }>(
         '/categorize/batch-sync',
         { entries }
      );
      return response.data;
   }
}

import { Transaction } from '@/app/app/_data/transactions';
import ApiClient from './ApiClient';

export class TransactionService {
   private static readonly transactionBasePath = '/transaction';

   static async getTransactions() {
      const transactionsResponse = await ApiClient.get<Transaction[]>(this.transactionBasePath);
      return transactionsResponse.data;
   }
}

import type { Metadata } from 'next';
import CategorizeClient from './CategorizeClient';
import AccountStoreInitializer from '@/providers/AccountStoreInitializer';
import AccountService from '@/services/AccountService';
import type { QuickBooksAccount } from '@/services/AccountService';

export const metadata: Metadata = {
   title: 'Categorize - Onreco',
};

export default async function Page() {
   let accounts: QuickBooksAccount[] = [];
   try {
      accounts = await AccountService.getOffsetAccounts();
   } catch (error) {
      console.error('[Categorize Page] Failed to fetch QB accounts:', error);
   }

   return (
      <>
         <AccountStoreInitializer accounts={accounts} />
         <CategorizeClient />
      </>
   );
}

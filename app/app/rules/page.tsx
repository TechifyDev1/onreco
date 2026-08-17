import type { Metadata } from 'next';
import RulesClientShell from '@/components/dashboard/rules/RulesClientShell';
import AccountStoreInitializer from '@/providers/AccountStoreInitializer';
import AccountService from '@/services/AccountService';
import type { QuickBooksAccount } from '@/services/AccountService';

export const metadata: Metadata = {
   title: 'Rules · Onreco',
   description:
      'Automate how Onreco categorizes and routes stablecoin transactions before they sync to QuickBooks.',
   robots: {
      index: false,
      follow: false,
   },
};

export default async function RulesPage() {
   let accounts: QuickBooksAccount[] = [];
   try {
      accounts = await AccountService.getOffsetAccounts();
   } catch (error) {
      console.error('[Rules Page] Failed to fetch QB accounts:', error);
   }

   return (
      <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
         <AccountStoreInitializer accounts={accounts} />
         <RulesClientShell />
      </div>
   );
}

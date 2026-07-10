import MobileBottomBar from '@/components/dashboard/MobileBottomBar';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import UserStoreInitializer from '@/providers/UserStoreInitializer';
import WalletStoreInitializer from '@/providers/WalletStoreInitializer';
import { ApiError } from '@/services/ApiError';
import UserService, { UserProfileState } from '@/services/UserService';
import WalletService from '@/services/WalletService';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { Integration } from './_data/integrations';
import { Wallet } from './_data/wallets';
import IntegrationService from '@/services/IntegrationService';
import IntegrationStoreInitializer from '@/providers/IntegrationStoreInitializer';
import { Transaction } from './_data/transactions';
import { TransactionService } from '@/services/TransactionService';
import TransactionStoreInitializer from '@/providers/TransactionStoreInitializer';

export default async function AppLayout({ children }: { children: ReactNode }) {
   const userProfileResult = await getUserProfileInTheServer();
   if (!userProfileResult.ok || !('userProfile' in userProfileResult)) {
      redirect('/login');
   }
   const userProfile = userProfileResult.userProfile;
   const integrationsResult = await getIntegrationsInTheServer();
   const walletsResult = await getWalletsInTheServer();
   const transactions = await getTransactionsInTheServer();
   console.log(transactions);
   return (
      <div className="min-h-screen bg-background text-on-surface">
         <UserStoreInitializer userProfile={userProfile} />
         <IntegrationStoreInitializer integrations={integrationsResult.ok ? integrationsResult.integrations : []} />
         <WalletStoreInitializer wallets={walletsResult.ok ? walletsResult.wallets : []} />
         <TransactionStoreInitializer transactions={transactions.ok ? transactions.transactions : []} />
         <Sidebar />
         <div className="lg:pl-64 flex flex-col min-h-screen">
            <Topbar />
            {/* Extra bottom padding on mobile so the floating bar doesn't cover content */}
            <main className="flex-1 px-4 md:px-8 py-6 md:py-8 pb-28 lg:pb-8 max-w-container-max w-full mx-auto">{children}</main>
         </div>
         <MobileBottomBar />
      </div>
   );
}

async function getUserProfileInTheServer(): Promise<GetUserProfileState> {
   try {
      const res = await UserService.getUserProfile();
      return {
         ok: true,
         userProfile: res,
      };
   } catch (error) {
      console.error(`[Server Layout] Failed to fetch user profile:`, error);
      if (error instanceof ApiError) {
         return {
            ok: false,
            message: error.message,
         };
      }
      return {
         ok: false,
         message: 'An unexpected error occoured',
      };
   }
}

async function getIntegrationsInTheServer(): Promise<GetIntegrationState> {
   try {
      const res = await IntegrationService.getSupportedIntegrations();
      return {
         ok: true,
         integrations: res,
      };
   } catch (error) {
      console.error(`[Server Layout] Failed to Integrations:`, error);
      if (error instanceof ApiError) {
         return {
            ok: false,
            message: error.message,
         };
      }
      return {
         ok: false,
         message: 'An unexpected error occured',
      };
   }
}

async function getWalletsInTheServer(): Promise<GetWalletState> {
   try {
      const res = await WalletService.getWallets();
      return {
         ok: true,
         wallets: res,
      };
   } catch (error) {
      console.error(`[Server Layout] Failed to fetch wallets:`, error);
      if (error instanceof ApiError) {
         return {
            ok: false,
            message: error.message,
         };
      }
      return {
         ok: false,
         message: 'An unexpected error occurred',
      };
   }
}

async function getTransactionsInTheServer(): Promise<GetTransactionState> {
   try {
      const res = await TransactionService.getTransactions();
      return { ok: true, transactions: res };
   } catch (error) {
      console.error(`[Server Layout] Failed to fetch transactions:`, error);
      if (error instanceof ApiError) {
         return {
            ok: false,
            message: error.message,
         };
      }
      return {
         ok: false,
         message: 'An Unknown error occured',
      };
   }
}
export type GetUserProfileState =
   | {
        ok: true;
        userProfile: UserProfileState;
     }
   | { ok: false; message: string };

export type GetIntegrationState = { ok: true; integrations: Integration[] } | { ok: false; message: string };

export type GetWalletState = { ok: true; wallets: Wallet[] } | { ok: false; message: string };

type GetTransactionState = { ok: true; transactions: Transaction[] } | { ok: false; message: string };

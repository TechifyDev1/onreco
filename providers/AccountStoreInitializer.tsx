'use client';
import type { QuickBooksAccount } from '@/services/AccountService';
import { useHydratedAccountStore } from './account-store';

export default function AccountStoreInitializer({ accounts }: { accounts: QuickBooksAccount[] }) {
   useHydratedAccountStore(accounts);
   return null;
}

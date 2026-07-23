'use client';
import type { QuickBooksAccount } from '@/services/AccountService';
import { useEffect } from 'react';
import { create } from 'zustand';

interface AccountStoreState {
   offsetAccounts: QuickBooksAccount[];
   setOffsetAccounts: (accounts: QuickBooksAccount[]) => void;
}

export const useAccountStore = create<AccountStoreState>((set) => ({
   offsetAccounts: [],

   setOffsetAccounts: (offsetAccounts) => set({ offsetAccounts }),
}));

export function useHydratedAccountStore(accounts: QuickBooksAccount[]) {
   const { setOffsetAccounts } = useAccountStore();
   useEffect(() => {
      setOffsetAccounts(accounts);
   }, [accounts, setOffsetAccounts]);
}

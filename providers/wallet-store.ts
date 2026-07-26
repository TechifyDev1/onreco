'use client';
import type { Wallet } from '@/app/app/_data/wallets';
import { useEffect } from 'react';
import { create } from 'zustand';

interface WalletStoreState {
   wallets: Wallet[];
   monitoring: Wallet[];
   paused: Wallet[];
   chainsCovered: number;
   setWallets: (wallets: Wallet[]) => void;
   addWallet: (wallet: Wallet) => void;
   removeWallet: (walletId: string) => void;
}

export const useWalletStore = create<WalletStoreState>((set) => ({
   wallets: [],
   monitoring: [],
   paused: [],
   chainsCovered: 0,

   setWallets: (wallets) =>
      set({
         wallets: wallets,
         monitoring: wallets.filter((wallet) => wallet.active),
         paused: wallets.filter((wallet) => !wallet.active),
         chainsCovered: new Set(wallets.flatMap((wallet) => wallet.monitoredCurrencies)).size,
      }),

   addWallet: (wallet) =>
      set((state) => {
         const next = [wallet, ...state.wallets];
         const monitoring = next.filter((w) => w.active);
         const paused = next.filter((w) => !w.active);
         const chainsCovered = new Set(monitoring.map((w) => w.chain)).size;
         return {
            wallets: next,
            monitoring,
            paused,
            chainsCovered,
         };
      }),

   removeWallet: (walletId) =>
      set((state) => {
         const next = state.wallets.filter((w) => w.id !== walletId);
         const monitoring = next.filter((w) => w.active);
         const paused = next.filter((w) => !w.active);
         const chainsCovered = new Set(monitoring.map((w) => w.chain)).size;
         return {
            wallets: next,
            monitoring,
            paused,
            chainsCovered,
         };
      }),
}));

export function useHydratedWalletStore(wallets: Wallet[]) {
   const { setWallets } = useWalletStore();
   useEffect(() => {
      setWallets(wallets);
   }, [wallets, setWallets]);
}

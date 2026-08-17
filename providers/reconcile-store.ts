'use client';
import type { ReconcileResponse } from '@/app/app/_data/reconciliation';
import { useEffect } from 'react';
import { create } from 'zustand';

interface ReconcileStoreState {
   matches: ReconcileResponse['matches'];
   totalPending: number;
   totalOpenInvoices: number;
   setData: (data: ReconcileResponse) => void;
}

export const useReconcileStore = create<ReconcileStoreState>((set) => ({
   matches: [],
   totalPending: 0,
   totalOpenInvoices: 0,

   setData: (data) =>
      set({
         matches: data.matches,
         totalPending: data.totalPending,
         totalOpenInvoices: data.totalOpenInvoices,
      }),
}));

export function useHydratedReconcileStore(data: ReconcileResponse) {
   const { setData } = useReconcileStore();
   useEffect(() => {
      setData(data);
   }, [data, setData]);
}

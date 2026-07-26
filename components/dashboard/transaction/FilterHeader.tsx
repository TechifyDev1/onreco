'use client';

import { useTransactionStore } from '@/providers/transaction-store';
import { useToastStore } from '@/providers/toast-provider';
import { Download } from 'lucide-react';

export default function FilterHeader() {
   const { transactions } = useTransactionStore();
   const { show } = useToastStore();
   if (transactions.length === 0) {
      return null;
   }
   return (
      <div className="flex items-center gap-2">
         <button
            type="button"
            onClick={() => show('CSV export is on the way!', 'coming')}
            className="btn-primary inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
         >
            <Download className="w-3.5 h-3.5" strokeWidth={2} />
            Export CSV
         </button>
      </div>
   );
}

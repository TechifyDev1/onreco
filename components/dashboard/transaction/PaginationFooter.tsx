'use client';

import { useTransactionStore } from '@/providers/transaction-store';

export default function PaginationFooter() {
   const { transactions } = useTransactionStore();
   return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-5 py-4 border-t border-outline-variant/10 text-xs text-on-surface-variant">
         {transactions.length === 0 ? (
            <span>Showing 0 of 0 transactions</span>
         ) : (
            <>
               <span>Showing 12 of 247 transactions</span>
               <div className="flex items-center gap-1">
                  <button type="button" className="px-2.5 py-1 rounded-md border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors">
                     Previous
                  </button>
                  <button type="button" className="px-2.5 py-1 rounded-md bg-primary-container text-on-primary-container font-semibold">
                     1
                  </button>
                  <button type="button" className="px-2.5 py-1 rounded-md border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors">
                     2
                  </button>
                  <button type="button" className="px-2.5 py-1 rounded-md border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors">
                     3
                  </button>
                  <button type="button" className="px-2.5 py-1 rounded-md border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors">
                     Next
                  </button>
               </div>
            </>
         )}
      </div>
   );
}

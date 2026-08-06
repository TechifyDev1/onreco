'use client';

import { useTransactionStore } from '@/providers/transaction-store';

export default function PaginationFooter() {
   const { transactions, filteredTransactions, currentPage, pageSize, totalPages, setPage } = useTransactionStore();
   if (transactions.length === 0) {
      return (
         <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-5 py-4 border-t border-outline-variant/10 text-xs text-on-surface-variant">
            <span>Showing 0 of 0 transactions</span>
         </div>
      );
   }
   const total = filteredTransactions.length;
   const start = (currentPage - 1) * pageSize + 1;
   const end = Math.min(currentPage * pageSize, total);
   const pages = pageNumbers(currentPage, totalPages);
   return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-5 py-4 border-t border-outline-variant/10 text-xs text-on-surface-variant">
         <span>
            Showing {start}–{end} of {total} transactions
         </span>
         <div className="flex items-center gap-1">
            <button
               type="button"
               disabled={currentPage === 1}
               onClick={() => setPage(currentPage - 1)}
               className="px-2.5 py-1 rounded-md border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors disabled:opacity-40 disabled:hover:border-outline-variant/20 disabled:hover:text-on-surface-variant"
            >
               Previous
            </button>
            {pages.map((p, i) =>
               p === '...' ? (
                  <span key={`ellipsis-${i}`} className="px-1 text-on-surface-variant">
                     …
                  </span>
               ) : (
                  <button
                     key={p}
                     type="button"
                     onClick={() => setPage(p)}
                     className={
                        'px-2.5 py-1 rounded-md transition-colors ' +
                        (p === currentPage
                           ? 'bg-primary-container text-on-primary-container font-semibold'
                           : 'border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40')
                     }
                  >
                     {p}
                  </button>
               )
            )}
            <button
               type="button"
               disabled={currentPage === totalPages}
               onClick={() => setPage(currentPage + 1)}
               className="px-2.5 py-1 rounded-md border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors disabled:opacity-40 disabled:hover:border-outline-variant/20 disabled:hover:text-on-surface-variant"
            >
               Next
            </button>
         </div>
      </div>
   );
}

function pageNumbers(current: number, total: number): (number | '...')[] {
   if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
   }
   const candidates = new Set<number>([1, total, current - 1, current, current + 1]);
   const sorted = [...candidates].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
   const result: (number | '...')[] = [];
   let prev = 0;
   for (const p of sorted) {
      if (p - prev > 1) {
         result.push('...');
      }
      result.push(p);
      prev = p;
   }
   return result;
}

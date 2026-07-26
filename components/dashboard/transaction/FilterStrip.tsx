'use client';
import { TX_FILTERS } from '@/app/app/_data/transactions';
import { useTransactionStore, type FilterKey } from '@/providers/transaction-store';

export default function FilterStrip() {
   const { transactions, activeFilter, setFilter } = useTransactionStore();
   if (transactions.length === 0) {
      return null;
   }
   return (
      <div role="tablist" aria-label="Transaction filters" className="flex items-center gap-1 p-1 rounded-lg bg-surface-container-low border border-outline-variant/10 w-fit">
         {TX_FILTERS.map((f) => {
            const key = f as FilterKey;
            const isActive = activeFilter === key;
            return (
               <button
                  key={f}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(key)}
                  className={
                     'px-3 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors ' +
                     (isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface')
                  }
               >
                  {f}
               </button>
            );
         })}
      </div>
   );
}

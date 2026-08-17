import FilterHeader from '@/components/dashboard/transaction/FilterHeader';
import FilterStrip from '@/components/dashboard/transaction/FilterStrip';
import TransactionBody from '@/components/dashboard/transaction/TransactionBody';
import PaginationFooter from '@/components/dashboard/transaction/PaginationFooter';
import TransactionStoreInitializer from '@/providers/TransactionStoreInitializer';
import { TransactionService } from '@/services/TransactionService';
import { ApiError } from '@/services/ApiError';
import { Transaction } from '@/app/app/_data/transactions';

export default async function Page() {
   let transactions: Transaction[] = [];
   try {
      transactions = await TransactionService.getTransactions();
   } catch (error) {
      if (error instanceof ApiError) {
         console.error('[TransactionsPage] Failed to fetch transactions:', error.message);
      } else {
         console.error('[TransactionsPage] Failed to fetch transactions:', error);
      }
   }

   return (
      <>
      <TransactionStoreInitializer transactions={transactions} />
      <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
         {/* Header */}
         <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
               <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">Transactions</h1>
               <p className="text-sm text-on-surface-variant mt-1">Every USDT and USDC transaction across your connected wallets. Categorized, reconciled, and synced to your accounting ledger.</p>
            </div>
            <FilterHeader />
         </header>

         {/* Filter strip */}
         <FilterStrip />

         {/* Table */}
         <section aria-label="All transactions" className="bg-glass rounded-xl border border-outline-variant/10 glow-top overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-sm">
                  <thead>
                     <tr className="text-left text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                        <th className="px-5 py-3 font-semibold">Date</th>
                        <th className="px-5 py-3 font-semibold">Direction</th>
                        <th className="px-5 py-3 font-semibold">Asset</th>
                        <th className="px-5 py-3 font-semibold text-right">Amount</th>
                        <th className="px-5 py-3 font-semibold text-right">USD</th>
                        <th className="px-5 py-3 font-semibold text-right">Gas Fee</th>
                        <th className="px-5 py-3 font-semibold hidden md:table-cell">Wallet</th>
                        <th className="px-5 py-3 font-semibold hidden lg:table-cell">Category</th>
                        <th className="px-5 py-3 font-semibold hidden xl:table-cell">Counterparty</th>
                        <th className="px-5 py-3 font-semibold">Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     <TransactionBody />
                  </tbody>
               </table>
            </div>

            {/* Pagination footer */}
            <PaginationFooter />
         </section>
      </div>
      </>
   );
}

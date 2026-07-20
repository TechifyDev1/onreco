'use client';
import { TX_STATUS_STYLES } from '@/app/app/_data/transactions';
import { useTransactionStore } from '@/providers/transaction-store';
import { ArrowDownLeft, ArrowUpRight, Copy, Receipt } from 'lucide-react';
import { useToastStore } from '@/providers/toast-provider';

export default function TransactionBody() {
   const { transactions } = useTransactionStore();
   const { show } = useToastStore();
   if (transactions.length === 0) {
      return (
         <tr>
            <td colSpan={9} className="px-5 py-20 text-center">
               <div className="flex flex-col items-center justify-center gap-3 max-w-sm mx-auto">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                     <Receipt className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <div>
                     <h3 className="text-base font-semibold text-on-surface">No transactions found</h3>
                     <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">Connect a wallet or configure integration to import on-chain history.</p>
                  </div>
                  <button
                     type="button"
                     className="btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity mt-2"
                  >
                     Add Wallet
                  </button>
               </div>
            </td>
         </tr>
      );
   }
   return transactions.map((tx) => {
      const isIn = tx.direction === 'RECEIVED';
      return (
         <tr key={tx.id} className="border-t border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
            <td className="px-5 py-4 text-xs text-on-surface-variant whitespace-nowrap">{new Date(tx.date).toLocaleDateString()}</td>
            <td className="px-5 py-4">
               <div className={'w-8 h-8 rounded-lg flex items-center justify-center ' + (isIn ? 'bg-primary/10 text-primary' : 'bg-secondary/15 text-secondary')}>
                  {isIn ? <ArrowDownLeft className="w-4 h-4" strokeWidth={2} /> : <ArrowUpRight className="w-4 h-4" strokeWidth={2} />}
               </div>
            </td>
            <td className="px-5 py-4 font-semibold text-on-surface">{tx.asset}</td>
            <td className="px-5 py-4 font-mono text-on-surface text-right whitespace-nowrap">{tx.amount}</td>
            <td className="px-5 py-4 font-mono text-on-surface text-right whitespace-nowrap">{tx.usd}</td>
            <td className="px-5 py-4 hidden md:table-cell text-on-surface-variant">{tx.wallet}</td>
            <td className="px-5 py-4 hidden lg:table-cell text-on-surface-variant">{tx.category}</td>
            <td className="px-5 py-4 hidden xl:table-cell font-mono text-xs max-w-37.5">
               <button
                  type="button"
                  onClick={() => {
                     navigator.clipboard.writeText(tx.counterparty);
                     show('Address copied to clipboard.', 'success');
                  }}
                  className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors w-full"
               >
                  <span className="truncate flex-1">{tx.counterparty}</span>
                  <Copy className="w-3 h-3 shrink-0" strokeWidth={1.75} />
               </button>
            </td>
            <td className="px-5 py-4">
               <span className={'inline-block px-2 py-1 rounded text-[10px] font-semibold tracking-wider uppercase ' + TX_STATUS_STYLES[tx.status]}>{tx.status}</span>
            </td>
         </tr>
      );
   });
}

'use client';

import { ArrowDownLeft, ArrowUpRight, ExternalLink, Inbox } from 'lucide-react';
import { useDashboardStore } from '@/providers/dashboard-store';
import type { SyncStatus } from '@/services/DashboardService';

const STATUS_STYLES: Record<SyncStatus, string> = {
   SYNCED: 'bg-primary/10 text-primary',
   PENDING: 'bg-secondary/15 text-secondary',
   FAILED: 'bg-tertiary-container/20 text-tertiary',
};

function formatRelativeTime(isoString: string): string {
   const diff = Date.now() - new Date(isoString).getTime();
   const mins = Math.floor(diff / 60_000);
   if (mins < 1) return 'Just now';
   if (mins < 60) return `${mins} min ago`;
   const hrs = Math.floor(mins / 60);
   if (hrs < 24) return `${hrs} hr ago`;
   if (hrs < 48) return 'Yesterday';
   return `${Math.floor(hrs / 24)}d ago`;
}

function shortAddress(addr: string): string {
   if (addr.length <= 12) return addr;
   return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function RecentTransactions() {
   const recentTransactions = useDashboardStore((s) => s.recentTransactions);

   return (
      <section
         aria-label="Recent transactions"
         className="bg-glass rounded-xl border border-outline-variant/10 glow-top overflow-hidden animate-fade-in"
      >
         <header className="flex items-center justify-between p-6 border-b border-outline-variant/10">
            <div>
               <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">
                  Recent Transactions
               </h2>
               <p className="text-sm text-on-surface-variant mt-1">
                  Latest USDT and USDC activity across connected wallets.
               </p>
            </div>
            {recentTransactions.length > 0 && (
               <a
                  href="/app/transactions"
                  className="text-xs font-semibold tracking-[0.05em] uppercase text-primary hover:underline"
               >
                  View all
               </a>
            )}
         </header>

         <div className="overflow-x-auto">
            <table className="w-full text-sm">
               <thead>
                  <tr className="text-left text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                     <th className="px-6 py-3 font-semibold">Type</th>
                     <th className="px-6 py-3 font-semibold">Asset</th>
                     <th className="px-6 py-3 font-semibold">Amount</th>
                     <th className="px-6 py-3 font-semibold hidden md:table-cell">Chain</th>
                     <th className="px-6 py-3 font-semibold hidden lg:table-cell">Tx Hash</th>
                     <th className="px-6 py-3 font-semibold">Status</th>
                     <th className="px-6 py-3 font-semibold hidden md:table-cell">Time</th>
                  </tr>
               </thead>
               <tbody>
                  {recentTransactions.length === 0 ? (
                     <tr>
                        <td colSpan={7} className="px-6 py-16 text-center">
                           <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                                 <Inbox className="w-5 h-5" strokeWidth={1.75} />
                              </div>
                              <p className="text-sm font-semibold text-on-surface">No recent transactions</p>
                              <p className="text-xs text-on-surface-variant">
                                 Connect a wallet or import manual entries to see transaction data here.
                              </p>
                           </div>
                        </td>
                     </tr>
                  ) : (
                     recentTransactions.map((tx) => {
                        const isIn = tx.type === 'RECEIVED';
                        return (
                           <tr
                              key={tx.id}
                              className="border-t border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors"
                           >
                              <td className="px-6 py-4">
                                 <div
                                    className={
                                       'w-8 h-8 rounded-lg flex items-center justify-center ' +
                                       (isIn ? 'bg-primary/10 text-primary' : 'bg-secondary/15 text-secondary')
                                    }
                                 >
                                    {isIn ? (
                                       <ArrowDownLeft className="w-4 h-4" strokeWidth={2} />
                                    ) : (
                                       <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                                    )}
                                 </div>
                              </td>
                              <td className="px-6 py-4 font-semibold text-on-surface">{tx.currency}</td>
                              <td className="px-6 py-4 font-mono text-on-surface">
                                 {Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell text-on-surface-variant">{tx.chain}</td>
                              <td className="px-6 py-4 hidden lg:table-cell font-mono text-xs text-on-surface-variant">
                                 <a
                                    href="#"
                                    className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                                    title={tx.txHash}
                                 >
                                    {shortAddress(tx.txHash)}
                                    <ExternalLink className="w-3 h-3" strokeWidth={1.75} />
                                 </a>
                              </td>
                              <td className="px-6 py-4">
                                 <span
                                    className={
                                       'inline-block px-2 py-1 rounded text-[10px] font-semibold tracking-[0.05em] uppercase ' +
                                       STATUS_STYLES[tx.syncStatus]
                                    }
                                 >
                                    {tx.syncStatus}
                                 </span>
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell text-xs text-on-surface-variant">
                                 {formatRelativeTime(tx.createdAt)}
                              </td>
                           </tr>
                        );
                     })
                  )}
               </tbody>
            </table>
         </div>
      </section>
   );
}

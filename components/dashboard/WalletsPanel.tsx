'use client';

import { Wallet2 } from 'lucide-react';
import { useDashboardStore } from '@/providers/dashboard-store';

export default function WalletsPanel() {
   const connectedWallets = useDashboardStore((s) => s.connectedWallets);
   const sortedWallets = [...connectedWallets].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
   );
   const monitoring = sortedWallets.filter((w) => w.active);

   return (
      <section
         aria-label="Connected wallets"
         className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10 flex flex-col h-full"
      >
         <header className="flex items-center justify-between mb-5">
            <div>
               <h2 className="text-[16px] leading-6 font-semibold tracking-tight text-on-surface">
                  Connected Wallets
               </h2>
               <p className="text-xs text-on-surface-variant mt-1">
                  {monitoring.length} monitoring &middot; read-only
               </p>
            </div>
            <a
               href="/app/wallets"
               className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface hover:border-primary/40 transition-colors text-xs font-semibold tracking-[0.05em] uppercase"
            >
               <Wallet2 className="w-3.5 h-3.5" strokeWidth={1.75} />
               Manage
            </a>
         </header>

         {sortedWallets.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-surface-container-low/20 rounded-lg border border-dashed border-outline-variant/10 min-h-[220px]">
               <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <Wallet2 className="w-5 h-5" strokeWidth={1.75} />
               </div>
               <p className="text-sm font-semibold text-on-surface">No connected wallets</p>
               <p className="text-xs text-on-surface-variant max-w-xs mt-1">
                  Connect read-only wallets to track and reconcile stablecoins.
               </p>
            </div>
         ) : (
            <ul className="flex flex-col divide-y divide-outline-variant/10">
               {sortedWallets.map((w) => (
                  <li
                     key={w.id}
                     className="py-3 first:pt-0 last:pb-0 flex items-center gap-3"
                  >
                     <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Wallet2 className="w-4 h-4" strokeWidth={1.75} />
                     </div>

                     <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                           <span className="text-sm font-semibold text-on-surface truncate">
                              {w.label || 'Untitled wallet'}
                           </span>
                           <span className="text-[10px] font-semibold tracking-[0.05em] uppercase text-on-surface-variant">
                              {w.chain}
                           </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                           <span className="font-mono text-xs text-on-surface-variant truncate">{w.address}</span>
                        </div>
                     </div>

                     <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                        <div className="flex gap-1">
                           {w.monitoredCurrencies.map((c) => (
                              <span
                                 key={c}
                                 className="px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-[0.05em] uppercase bg-surface-container-high text-on-surface"
                              >
                                 {c}
                              </span>
                           ))}
                        </div>
                        <span
                           className={
                              'text-[10px] font-semibold tracking-[0.05em] uppercase ' +
                              (w.active ? 'text-primary' : 'text-outline')
                           }
                        >
                           {w.active ? 'Monitoring' : 'Paused'}
                        </span>
                     </div>
                  </li>
               ))}
            </ul>
         )}
      </section>
   );
}

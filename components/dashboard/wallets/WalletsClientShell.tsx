'use client';

import { useState } from 'react';
import { Copy, ExternalLink, MoreVertical, Plus, Wallet as WalletIcon } from 'lucide-react';

import { useWalletStore } from '@/providers/wallet-store';
import { NETWORK_CHIP } from '@/app/app/_data/wallets';
import Stats from './Stats';
import AddWalletDialog from './AddWallet';
import WalletsPageHeader from './WalletsPageHeader';

export default function WalletsClientShell() {
   const { wallets } = useWalletStore();
   const [dialogOpen, setDialogOpen] = useState(false);

   const hasWallets = wallets.length > 0;
   const openDialog = () => setDialogOpen(true);

   return (
      <>
         <WalletsPageHeader onAddClick={openDialog} />
         <Stats />
         {hasWallets ? <WalletsGrid onAddClick={openDialog} /> : <EmptyState onAddClick={openDialog} />}
         <AddWalletDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </>
   );
}

function EmptyState({ onAddClick }: { onAddClick: () => void }) {
   return (
      <div className="bg-glass rounded-xl p-10 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-4 min-h-75">
         <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <WalletIcon className="w-6 h-6" strokeWidth={1.75} />
         </div>
         <div>
            <h3 className="text-base font-semibold text-on-surface">No connected wallets</h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-1.5 leading-relaxed">
               Link read-only wallets across supported chains. Onreco never stores private keys and only requires read access.
            </p>
         </div>
         <button
            type="button"
            onClick={onAddClick}
            className="btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity mt-1"
         >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            Add Wallet
         </button>
      </div>
   );
}

function WalletsGrid({ onAddClick }: { onAddClick: () => void }) {
   const { wallets } = useWalletStore();

   return (
      <section aria-label="Connected wallets" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
         {wallets.map((wallet) => (
            <article key={wallet.id} className="bg-glass rounded-xl p-5 md:p-6 glow-top border border-outline-variant/10 flex flex-col gap-4">
               <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                     <WalletIcon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                     <h3 className="text-base font-semibold text-on-surface truncate">{wallet.label || 'Untitled wallet'}</h3>
                     <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span
                           className={
                              'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase border ' +
                              (NETWORK_CHIP[wallet.chain] ?? 'bg-surface-container-high text-on-surface-variant border-outline-variant/20')
                           }
                        >
                           {wallet.chain}
                        </span>
                        {wallet.monitoredCurrencies.map((currency) => (
                           <span key={currency} className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-surface-container-high text-on-surface">
                              {currency}
                           </span>
                        ))}
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase text-on-surface-variant">
                           <span className={`w-1.5 h-1.5 rounded-full ${wallet.active ? 'bg-primary' : 'bg-outline'}`} />
                           {wallet.active ? 'monitoring' : 'paused'}
                        </span>
                     </div>
                  </div>
                  <button
                     type="button"
                     aria-label="More actions"
                     className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors shrink-0"
                  >
                     <MoreVertical className="w-4 h-4" strokeWidth={1.75} />
                  </button>
               </div>

               <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/10">
                  <span className="font-mono text-xs text-on-surface flex-1 truncate">{wallet.address}</span>
                  <button type="button" aria-label="Copy address" className="text-on-surface-variant/60 hover:text-primary transition-colors shrink-0">
                     <Copy className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </button>
                  <a href="#" aria-label="Open in block explorer" className="text-on-surface-variant/60 hover:text-primary transition-colors shrink-0">
                     <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </a>
               </div>

               <div className="pt-3 border-t border-outline-variant/10 flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Last sync · {wallet.lastSyncAt ? new Date(wallet.lastSyncAt).toLocaleDateString() : '—'}</span>
                  <span>
                     <span className="font-semibold text-on-surface">{wallet.transactionCount30d}</span> tx (30d)
                  </span>
               </div>
            </article>
         ))}

         <button
            type="button"
            onClick={onAddClick}
            className="hidden lg:flex flex-col items-center justify-center gap-2 min-h-65 rounded-xl border-2 border-dashed border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors"
         >
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center">
               <Plus className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <span className="text-sm font-semibold">Add a wallet</span>
            <span className="text-xs">Read-only · No private keys required</span>
         </button>
      </section>
   );
}

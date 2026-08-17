'use client';

import { useCallback, useEffect, useState } from 'react';
import {
   ArrowDownLeft,
   ArrowUpRight,
   ExternalLink,
   Loader2,
   RefreshCw,
   Send,
   Sparkles,
} from 'lucide-react';
import {
   CATEGORIZE_TABS,
   type BatchSyncItem,
   type CategorizeTab,
   type PendingEntry,
   TX_DIRECTION_STYLES,
} from '../_data/categorize';
import CategorizeService from '@/services/CategorizeService';
import { useAccountStore } from '@/providers/account-store';
import { ApiError } from '@/services/ApiError';
import { useToastStore } from '@/providers/toast-provider';

export default function CategorizeClient() {
   const [tab, setTab] = useState<CategorizeTab>('Pending');
   const [entries, setEntries] = useState<PendingEntry[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const offsetAccounts = useAccountStore((s) => s.offsetAccounts);

   const [selected, setSelected] = useState<Set<string>>(new Set());
   const [accountMap, setAccountMap] = useState<Map<string, string>>(new Map());
   const [syncing, setSyncing] = useState(false);
   const [syncResult, setSyncResult] = useState<{ synced: number; failed: number } | null>(null);
   const { show } = useToastStore();

   const fetchEntries = useCallback(async () => {
      setLoading(true);
      setError(null);
      setSyncResult(null);
      try {
         const data =
            tab === 'Pending'
               ? await CategorizeService.getPendingEntries()
               : await CategorizeService.getFailedEntries();
         setEntries(data);
         setSelected(new Set());
         setAccountMap(new Map());
      } catch (err) {
         const message = err instanceof ApiError ? err.message : 'Failed to load entries.';
         setError(message);
         show(message, 'error');
      } finally {
         setLoading(false);
      }
   }, [tab]);

   useEffect(() => {
      fetchEntries();
   }, [fetchEntries]);

   function toggleSelect(id: string) {
      setSelected((prev) => {
         const next = new Set(prev);
         if (next.has(id)) next.delete(id);
         else next.add(id);
         return next;
      });
   }

   function toggleSelectAll() {
      if (selected.size === entries.length) {
         setSelected(new Set());
      } else {
         setSelected(new Set(entries.map((e) => e.id)));
      }
   }

   function setAccount(entryId: string, accountId: string) {
      setAccountMap((prev) => {
         const next = new Map(prev);
         next.set(entryId, accountId);
         return next;
      });
   }

   function setAllAccounts(accountId: string) {
      setAccountMap((prev) => {
         const next = new Map(prev);
         for (const id of selected) {
            next.set(id, accountId);
         }
         return next;
      });
   }

   async function handleBatchSync() {
      const items: BatchSyncItem[] = [];
      for (const id of selected) {
         const accountId = accountMap.get(id);
         if (!accountId) continue;
         items.push({ journalEntryId: id, offsetAccountId: accountId });
      }
      if (items.length === 0) return;

      setSyncing(true);
      setSyncResult(null);
      try {
         const result = await CategorizeService.batchSync(items);
         setSyncResult({ synced: result.synced, failed: result.failed });
         if (result.failed === 0) {
            show(`${result.synced} transaction${result.synced === 1 ? '' : 's'} synced to QuickBooks.`, 'success');
         } else {
            show(`${result.synced} synced, ${result.failed} failed.`, 'error');
         }
         await fetchEntries();
      } catch (err) {
         const message = err instanceof ApiError ? err.message : 'Batch sync failed.';
         setError(message);
         show(message, 'error');
      } finally {
         setSyncing(false);
      }
   }

   const allSelected = entries.length > 0 && selected.size === entries.length;
   const someSelected = selected.size > 0 && !allSelected;
   const selectedWithoutAccount = [...selected].filter((id) => !accountMap.get(id)).length;
   const canSync = selected.size > 0 && selectedWithoutAccount === 0;

   return (
      <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
         <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
               <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
                  Categorize
               </h1>
               <p className="text-sm text-on-surface-variant mt-1">
                  Review pending transactions, assign a QuickBooks account, and sync them
                  to your ledger in bulk.
               </p>
            </div>
            <div className="flex items-center gap-2">
               <button
                  type="button"
                  onClick={fetchEntries}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-wider uppercase hover:border-primary/40 transition-colors disabled:opacity-50"
               >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} strokeWidth={2} />
                  Refresh
               </button>
               <button
                  type="button"
                  onClick={handleBatchSync}
                  disabled={!canSync || syncing}
                  className="btn-primary inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity disabled:opacity-60"
               >
                  {syncing ? (
                     <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2.5} />
                        Syncing…
                     </>
                  ) : (
                     <>
                        <Send className="w-3.5 h-3.5" strokeWidth={2} />
                        Sync {selected.size > 0 ? `(${selected.size})` : ''}
                     </>
                  )}
               </button>
            </div>
         </header>

         {/* Tabs */}
         <div
            role="tablist"
            aria-label="Entry status"
            className="flex items-center gap-1 p-1 rounded-lg bg-surface-container-low border border-outline-variant/10 w-fit"
         >
            {CATEGORIZE_TABS.map((t) => (
               <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={
                     'px-3 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors ' +
                     (tab === t
                        ? 'bg-primary-container text-on-primary-container'
                        : 'text-on-surface-variant hover:text-on-surface')
                  }
               >
                  {t}
               </button>
            ))}
         </div>

         {/* Sync result banner */}
         {syncResult && (
            <div
               className={
                  'rounded-lg border px-4 py-3 text-xs font-semibold ' +
                  (syncResult.failed === 0
                     ? 'border-primary/30 bg-primary/10 text-primary'
                     : 'border-tertiary-container/30 bg-tertiary-container/10 text-tertiary')
               }
            >
               {syncResult.synced} synced
               {syncResult.failed > 0 ? `, ${syncResult.failed} failed` : ''} — refresh to
               see updated status.
            </div>
         )}

         {/* Error */}
         {error && (
            <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-xs text-error">
               {error}
            </div>
         )}

         {/* Bulk account selector — appears when rows are selected */}
         {selected.size > 0 && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant/10">
               <span className="text-xs text-on-surface-variant shrink-0">
                  {selected.size} selected
               </span>
               <select
                  onChange={(e) => {
                     if (e.target.value) setAllAccounts(e.target.value);
                  }}
                  defaultValue=""
                  className="input bg-surface-container text-on-surface border-outline-variant/50 text-xs max-w-xs"
                   disabled={offsetAccounts.length === 0}
                >
                   <option value="" disabled>
                      {offsetAccounts.length === 0 ? 'No accounts available' : 'Set account for all…'}
                  </option>
                  {offsetAccounts.map((a) => (
                     <option key={a.id} value={a.id}>
                        {a.label} ({a.type})
                     </option>
                  ))}
               </select>
               {selectedWithoutAccount > 0 && (
                  <span className="text-[10px] text-tertiary">
                     {selectedWithoutAccount} row{selectedWithoutAccount === 1 ? '' : 's'} still need a category
                  </span>
               )}
            </div>
         )}

         {/* Table */}
         <section
            aria-label="Transactions"
            className="bg-glass rounded-xl border border-outline-variant/10 glow-top overflow-hidden"
         >
            <div className="overflow-x-auto">
               <table className="w-full text-sm">
                  <thead>
                     <tr className="text-left text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                        <th className="px-4 py-3 w-10">
                           <input
                              type="checkbox"
                              checked={allSelected}
                              ref={(el) => {
                                 if (el) el.indeterminate = someSelected;
                              }}
                              onChange={toggleSelectAll}
                              className="w-4 h-4 rounded border-outline-variant/40 bg-surface-container-high"
                           />
                        </th>
                        <th className="px-4 py-3 font-semibold">Date</th>
                        <th className="px-4 py-3 font-semibold">Direction</th>
                        <th className="px-4 py-3 font-semibold">Asset</th>
                        <th className="px-4 py-3 font-semibold text-right">Amount</th>
                        <th className="px-4 py-3 font-semibold hidden md:table-cell">
                           Chain
                        </th>
                        <th className="px-4 py-3 font-semibold hidden lg:table-cell">
                           Wallet
                        </th>
                        <th className="px-4 py-3 font-semibold hidden xl:table-cell">
                           Counterparty
                        </th>
                        <th className="px-4 py-3 font-semibold">Categorize as</th>
                        {tab === 'Failed' && (
                           <th className="px-4 py-3 font-semibold">Error</th>
                        )}
                     </tr>
                  </thead>
                  <tbody>
                     {loading ? (
                        <tr>
                           <td
                              colSpan={tab === 'Failed' ? 10 : 9}
                              className="px-5 py-20 text-center"
                           >
                              <div className="flex flex-col items-center justify-center gap-3">
                                 <Loader2
                                    className="w-6 h-6 text-primary animate-spin"
                                    strokeWidth={1.75}
                                 />
                                 <p className="text-xs text-on-surface-variant">
                                    Loading entries…
                                 </p>
                              </div>
                           </td>
                        </tr>
                     ) : entries.length === 0 ? (
                        <tr>
                           <td
                              colSpan={tab === 'Failed' ? 10 : 9}
                              className="px-5 py-20 text-center"
                           >
                              <div className="flex flex-col items-center justify-center gap-3 max-w-sm mx-auto">
                                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Sparkles className="w-6 h-6" strokeWidth={1.75} />
                                 </div>
                                 <div>
                                    <h3 className="text-base font-semibold text-on-surface">
                                       {tab === 'Pending'
                                          ? 'No pending entries'
                                          : 'No failed entries'}
                                    </h3>
                                    <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                                       {tab === 'Pending'
                                          ? 'All transactions have been synced to QuickBooks.'
                                          : 'No transactions have failed to sync.'}
                                    </p>
                                 </div>
                              </div>
                           </td>
                        </tr>
                     ) : (
                        entries.map((entry) => {
                           const isIn = entry.type === 'RECEIVED';
                           const isSelected = selected.has(entry.id);
                           const shortAddress = entry.walletAddress
                              ? `${entry.walletAddress.slice(0, 6)}…${entry.walletAddress.slice(-4)}`
                              : '—';
                           const shortCounterparty = entry.counterpartyAddress
                              ? `${entry.counterpartyAddress.slice(0, 6)}…${entry.counterpartyAddress.slice(-4)}`
                              : '—';
                           const txDate = new Date(entry.txDate).toLocaleDateString();
                           const assignedAccount = accountMap.get(entry.id) ?? '';

                           return (
                              <tr
                                 key={entry.id}
                                 className={
                                    'border-t border-outline-variant/10 transition-colors ' +
                                    (isSelected
                                       ? 'bg-primary/5'
                                       : 'hover:bg-surface-container-low/50')
                                 }
                              >
                                 <td className="px-4 py-3">
                                    <input
                                       type="checkbox"
                                       checked={isSelected}
                                       onChange={() => toggleSelect(entry.id)}
                                       className="w-4 h-4 rounded border-outline-variant/40 bg-surface-container-high"
                                    />
                                 </td>
                                 <td className="px-4 py-3 text-xs text-on-surface-variant whitespace-nowrap">
                                    {txDate}
                                 </td>
                                 <td className="px-4 py-3">
                                    <div
                                       className={
                                          'w-8 h-8 rounded-lg flex items-center justify-center ' +
                                          TX_DIRECTION_STYLES[entry.type]
                                       }
                                    >
                                       {isIn ? (
                                          <ArrowDownLeft className="w-4 h-4" strokeWidth={2} />
                                       ) : (
                                          <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                                       )}
                                    </div>
                                 </td>
                                 <td className="px-4 py-3 font-semibold text-on-surface">
                                    {entry.currency}
                                 </td>
                                 <td className="px-4 py-3 font-mono text-on-surface text-right whitespace-nowrap">
                                    {entry.amount}
                                 </td>
                                 <td className="px-4 py-3 hidden md:table-cell text-on-surface-variant text-xs">
                                    {entry.chain}
                                 </td>
                                 <td className="px-4 py-3 hidden lg:table-cell">
                                    <a
                                       href={`https://etherscan.io/address/${entry.walletAddress}`}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="inline-flex items-center gap-1 text-xs font-mono text-on-surface-variant hover:text-primary transition-colors"
                                    >
                                       <span className="truncate max-w-24">
                                          {shortAddress}
                                       </span>
                                       <ExternalLink
                                          className="w-3 h-3 shrink-0"
                                          strokeWidth={1.75}
                                       />
                                    </a>
                                 </td>
                                 <td className="px-4 py-3 hidden xl:table-cell font-mono text-xs">
                                    <span className="text-on-surface-variant">
                                       {shortCounterparty}
                                    </span>
                                 </td>
                                 <td className="px-4 py-3">
                                    <select
                                       value={assignedAccount}
                                       onChange={(e) =>
                                          setAccount(entry.id, e.target.value)
                                       }
                                       className="input bg-surface-container text-on-surface border-outline-variant/50 text-xs max-w-48"
                                        disabled={offsetAccounts.length === 0}
                                     >
                                        <option value="" disabled>
                                           {offsetAccounts.length === 0 ? 'No accounts' : 'Select…'}
                                       </option>
                                       {offsetAccounts.map((a) => (
                                          <option key={a.id} value={a.id}>
                                             {a.label} ({a.type})
                                          </option>
                                       ))}
                                    </select>
                                 </td>
                                 {tab === 'Failed' && (
                                    <td className="px-4 py-3 text-xs text-tertiary max-w-48 truncate">
                                       {entry.errorMessage ?? '—'}
                                    </td>
                                 )}
                              </tr>
                           );
                        })
                     )}
                  </tbody>
               </table>
            </div>
         </section>

         <style jsx>{`
            .input {
               width: 100%;
               background: var(--color-surface-container, #252525);
               border: 1px solid rgba(255, 255, 255, 0.22);
               border-radius: 0.5rem;
               padding: 0.5rem 0.75rem;
               font-size: 0.8125rem;
               color: var(--color-on-surface, #ffffff);
               outline: none;
               transition: border-color 0.15s;
            }
            .input:focus {
               border-color: var(--color-primary, #818cf8);
               box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary, #818cf8) 25%, transparent);
            }
            .input:disabled {
               opacity: 0.6;
               cursor: not-allowed;
            }
         `}</style>
      </div>
   );
}

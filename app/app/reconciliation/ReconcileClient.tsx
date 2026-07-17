'use client';

import { useCallback, useEffect, useState } from 'react';
import {
   AlertCircle,
   ArrowRight,
   CheckCircle2,
   CircleHelp,
   Clock,
   ExternalLink,
   Link2,
   Loader2,
   RefreshCw,
   Sparkles,
} from 'lucide-react';
import {
   confidenceStyle,
   confidenceLabel,
   type ReconcileMatch,
   type ReconcileResponse,
} from '../_data/reconciliation';
import ReconcileService from '@/services/ReconcileService';
import { useToastStore } from '@/providers/toast-provider';

export default function ReconcileClient() {
   const [data, setData] = useState<ReconcileResponse | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [confirmingId, setConfirmingId] = useState<string | null>(null);
   const { show } = useToastStore();

   const fetchData = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
         const result = await ReconcileService.getReconciliations();
         setData(result);
      } catch (err) {
         const message = err instanceof Error ? err.message : 'Failed to load reconciliations.';
         setError(message);
         show(message, 'error');
      } finally {
         setLoading(false);
      }
   }, [show]);

   useEffect(() => {
      fetchData();
   }, [fetchData]);

   async function handleConfirm(match: ReconcileMatch) {
      if (!match.invoice) return;
      setConfirmingId(match.journalEntryId);
      try {
         await ReconcileService.confirmMatch(match.journalEntryId, match.invoice.id);
         show(`Matched to ${match.invoice.docNumber ?? match.invoice.id}.`, 'success');
         await fetchData();
      } catch (err) {
         show(err instanceof Error ? err.message : 'Failed to confirm match.', 'error');
      } finally {
         setConfirmingId(null);
      }
   }

   const matches = data?.matches ?? [];
   const matched = matches.filter((m) => m.confidence >= 90).length;
   const needsReview = matches.filter((m) => m.confidence >= 50 && m.confidence < 90).length;
   const noMatch = matches.filter((m) => m.confidence < 50).length;

   return (
      <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
         <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
               <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
                  Reconciliation
               </h1>
               <p className="text-sm text-on-surface-variant mt-1">
                  Match incoming stablecoin payments to open QuickBooks invoices. Review
                  confidence scores and approve matches.
               </p>
            </div>
            <div className="flex items-center gap-2">
               <button
                  type="button"
                  onClick={fetchData}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-wider uppercase hover:border-primary/40 transition-colors disabled:opacity-50"
               >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} strokeWidth={2} />
                  Refresh
               </button>
            </div>
         </header>

         {/* Stat row */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile label="Pending" value={data?.totalPending ?? 0} accent="text-on-surface" />
            <StatTile label="Open invoices" value={data?.totalOpenInvoices ?? 0} accent="text-secondary" />
            <StatTile label="Strong matches" value={matched} accent="text-primary" />
            <StatTile label="Needs review" value={needsReview + noMatch} accent="text-tertiary" />
         </div>

         {/* Error */}
         {error && (
            <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-xs text-error">
               {error}
            </div>
         )}

         {/* Main grid */}
         <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <section aria-label="Match candidates" className="xl:col-span-8 flex flex-col gap-4">
               {loading ? (
                  <div className="bg-glass rounded-xl p-10 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-3 min-h-50">
                     <Loader2 className="w-6 h-6 text-primary animate-spin" strokeWidth={1.75} />
                     <p className="text-xs text-on-surface-variant">Loading reconciliations…</p>
                  </div>
               ) : matches.length === 0 ? (
                  <EmptyState />
               ) : (
                  matches.map((m) => (
                     <MatchCard
                        key={m.journalEntryId}
                        match={m}
                        confirming={confirmingId === m.journalEntryId}
                        onConfirm={() => handleConfirm(m)}
                     />
                  ))
               )}
            </section>

            {/* How it works */}
            <aside className="xl:col-span-4">
               <section className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10 sticky top-20">
                  <h2 className="text-[16px] leading-6 font-semibold tracking-tight text-on-surface mb-3">
                     How matching works
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
                     Onreco compares every pending stablecoin payment against your open
                     QuickBooks invoices and scores each pair.
                  </p>
                  <ul className="flex flex-col gap-3">
                     {[
                        { k: 'Amount', v: 'Exact or near-exact USD value match (up to 50 pts)', letter: 'A' },
                        { k: 'Timing', v: 'Payment within the invoice due window (up to 30 pts)', letter: 'T' },
                        { k: 'Base', v: 'Every open invoice gets a base score (20 pts)', letter: 'B' },
                     ].map(({ k, v, letter }) => (
                        <li key={k} className="flex items-start gap-3">
                           <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[10px] font-bold tracking-wider">{letter}</span>
                           </div>
                           <div>
                              <div className="text-sm font-semibold text-on-surface">{k}</div>
                              <div className="text-xs text-on-surface-variant leading-relaxed">{v}</div>
                           </div>
                        </li>
                     ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-outline-variant/10 flex flex-col gap-2">
                     <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span>90–100% — Strong match</span>
                     </div>
                     <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <span className="w-2 h-2 rounded-full bg-secondary" />
                        <span>70–89% — Good match</span>
                     </div>
                     <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <span className="w-2 h-2 rounded-full bg-tertiary" />
                        <span>Below 70% — Weak / no match</span>
                     </div>
                  </div>
               </section>
            </aside>
         </div>
      </div>
   );
}

function MatchCard({
   match,
   confirming,
   onConfirm,
}: {
   match: ReconcileMatch;
   confirming: boolean;
   onConfirm: () => void;
}) {
   const conf = confidenceStyle(match.confidence);
   const label = confidenceLabel(match.confidence);
   const shortAddress = match.walletAddress
      ? `${match.walletAddress.slice(0, 6)}…${match.walletAddress.slice(-4)}`
      : '—';
   const txDate = new Date(match.txDate).toLocaleDateString();

   return (
      <article className="bg-glass rounded-xl p-5 md:p-6 glow-top border border-outline-variant/10">
         <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Payment */}
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                     Wallet Payment
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-primary/10 text-primary">
                     {match.currency}
                  </span>
               </div>
               <div className="font-mono text-on-surface text-base">{match.amount}</div>
               <div className="flex items-center gap-2 mt-1 text-xs text-on-surface-variant">
                  <span className="font-mono">{shortAddress}</span>
                  <span>·</span>
                  <span>{match.chain}</span>
                  <span>·</span>
                  <span>{txDate}</span>
               </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex flex-col items-center gap-2 shrink-0">
               <ArrowRight className="w-5 h-5 text-on-surface-variant" strokeWidth={1.5} />
            </div>

            {/* Confidence */}
            <div className="md:w-28 flex md:flex-col items-center md:items-center gap-2 md:gap-1 shrink-0">
               <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                  Confidence
               </span>
               <span className={'inline-block px-2.5 py-1 rounded-md border font-mono text-sm font-semibold ' + conf}>
                  {match.confidence}%
               </span>
               <span className="text-[10px] text-on-surface-variant">{label}</span>
            </div>

            {/* Invoice */}
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                     Best Invoice Match
                  </span>
               </div>
               {!match.invoice ? (
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                     <CircleHelp className="w-4 h-4" strokeWidth={1.75} />
                     <span>No matching invoice found</span>
                  </div>
               ) : (
                  <>
                     <div className="font-mono text-on-surface text-base">
                        {match.invoice.docNumber ?? match.invoice.id}
                     </div>
                     <div className="flex items-center gap-2 mt-1 text-xs text-on-surface-variant">
                        <span>{match.invoice.customerName ?? 'Unknown customer'}</span>
                        <span>·</span>
                        <span className="font-mono">${match.invoice.totalAmount}</span>
                        <span>·</span>
                        <span>Due {match.invoice.dueDate ? new Date(match.invoice.dueDate).toLocaleDateString() : '—'}</span>
                        <a
                           href="#"
                           aria-label="Open invoice"
                           className="text-on-surface-variant hover:text-primary transition-colors"
                        >
                           <ExternalLink className="w-3 h-3" strokeWidth={1.75} />
                        </a>
                     </div>
                  </>
               )}
            </div>
         </div>

         {/* Action row */}
         {match.invoice && (
            <div className="mt-4 pt-4 border-t border-outline-variant/10 flex items-center gap-2">
               <button
                  type="button"
                  onClick={onConfirm}
                  disabled={confirming}
                  className="btn-primary px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 disabled:opacity-60"
               >
                  {confirming ? (
                     <Loader2 className="w-3 h-3 animate-spin" strokeWidth={2.5} />
                  ) : (
                     <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
                  )}
                  Approve Match
               </button>
            </div>
         )}
      </article>
   );
}

function StatTile({ label, value, accent }: { label: string; value: number; accent: string }) {
   return (
      <div className="bg-glass rounded-xl p-5 glow-top border border-outline-variant/10">
         <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
               {label}
            </span>
         </div>
         <div className={'text-[24px] leading-8 font-semibold tracking-tight ' + accent}>{value}</div>
      </div>
   );
}

function EmptyState() {
   return (
      <div className="bg-glass rounded-xl p-10 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-4 min-h-87.5">
         <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Link2 className="w-6 h-6" strokeWidth={1.75} />
         </div>
         <div>
            <h3 className="text-base font-semibold text-on-surface">No pending matches</h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-1.5 leading-relaxed">
               All stablecoin payments have been reconciled, or no open invoices exist
               in QuickBooks. Categorize pending transactions first.
            </p>
         </div>
      </div>
   );
}

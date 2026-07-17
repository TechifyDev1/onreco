'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, Loader2, Pause, Play, Plus, RefreshCw, Sparkles } from 'lucide-react';
import { useToastStore } from '@/providers/toast-provider';
import { useRuleStore } from '@/providers/rule-store';
import RuleService from '@/services/RuleService';
import { ApiError } from '@/services/ApiError';
import { type CreateRuleRequest, type Rule } from '@/app/app/_data/rules';
import RuleDialog from '@/app/app/rules/RuleDialog';
import DeleteConfirmDialog from '@/app/app/rules/DeleteConfirmDialog';
import { HowConditionsWork, RuleCard } from './_view';

export default function RulesClientShell() {
   const { rules, loading, error, setRules, addRule, updateRule, removeRule, setLoading, setError } = useRuleStore();
   const { show } = useToastStore();

   const [dialogOpen, setDialogOpen] = useState(false);
   const [editing, setEditing] = useState<Rule | null>(null);
   const [submitting, setSubmitting] = useState(false);
   const [fieldErrors, setFieldErrors] = useState<Record<string, string> | undefined>();
   const [deletingId, setDeletingId] = useState<string | null>(null);

   const fetchRules = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
         const list = await RuleService.getRules();
         setRules(list);
      } catch (err) {
         const message = err instanceof ApiError ? err.message : 'Failed to load rules.';
         setError(message);
         show(message, 'error');
      } finally {
         setLoading(false);
      }
   }, [setError, setLoading, setRules, show]);

   useEffect(() => {
      fetchRules();
   }, [fetchRules]);

   const stats = useMemo(() => {
      const total = rules.length;
      const active = rules.filter((r) => r.active).length;
      return { total, active, inactive: total - active };
   }, [rules]);

   const sortedRules = useMemo(() => [...rules].sort((a, b) => b.priority - a.priority), [rules]);

   function openCreate() {
      setEditing(null);
      setFieldErrors(undefined);
      setDialogOpen(true);
   }

   function openEdit(rule: Rule) {
      setEditing(rule);
      setFieldErrors(undefined);
      setDialogOpen(true);
   }

   function closeDialog() {
      if (submitting) return;
      setDialogOpen(false);
      setEditing(null);
      setFieldErrors(undefined);
   }

   async function handleSubmit(payload: CreateRuleRequest) {
      setSubmitting(true);
      setFieldErrors(undefined);
      try {
         if (editing) {
            const updated = await RuleService.updateRule(editing.id, payload);
            updateRule(updated);
            show(`Rule "${updated.name}" updated.`, 'success');
         } else {
            const created = await RuleService.createRule(payload);
            addRule(created);
            show(`Rule "${created.name}" created.`, 'success');
         }
         setDialogOpen(false);
         setEditing(null);
      } catch (err) {
         if (err instanceof ApiError) {
            setFieldErrors(err.fieldErrors);
            show(err.message, 'error');
         } else {
            show('Failed to save rule. Please try again.', 'error');
         }
      } finally {
         setSubmitting(false);
      }
   }

   async function toggleActive(rule: Rule) {
      try {
         const updated = await RuleService.updateRule(rule.id, {
            name: rule.name,
            walletId: rule.walletId,
            direction: rule.direction,
            counterpartyAddress: rule.counterpartyAddress,
            offsetAccountId: rule.offsetAccountId,
            priority: rule.priority,
            active: !rule.active,
         });
         updateRule(updated);
      } catch (err) {
         const message = err instanceof ApiError ? err.message : 'Failed to update rule.';
         show(message, 'error');
      }
   }

   async function confirmDelete() {
      if (!deletingId) return;
      const target = rules.find((r) => r.id === deletingId) ?? null;
      try {
         await RuleService.deleteRule(deletingId);
         removeRule(deletingId);
         setDeletingId(null);
         show(`Rule "${target?.name ?? ''}" deleted.`, 'success');
      } catch (err) {
         const message = err instanceof ApiError ? err.message : 'Failed to delete rule.';
         show(message, 'error');
      }
   }

   return (
      <>
         <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
               <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">Rules</h1>
               <p className="text-sm text-on-surface-variant mt-1">
                  Automate how Onreco categorizes and routes stablecoin transactions before they sync to QuickBooks. The first rule that matches a transaction wins.
               </p>
            </div>
            <button
               id="open-new-rule"
               type="button"
               onClick={openCreate}
               disabled={loading}
               className="btn-primary inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity disabled:opacity-60 self-start md:self-auto shrink-0"
            >
               <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
               New Rule
            </button>
         </header>

         <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatTile label="Total rules" value={stats.total} icon={Sparkles} accent="text-primary" />
            <StatTile label="Active" value={stats.active} icon={Play} accent="text-primary" />
            <StatTile label="Inactive" value={stats.inactive} icon={Pause} accent="text-on-surface-variant" />
         </div>

         {error && !loading && (
            <div className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 flex items-start gap-3">
               <AlertCircle className="w-4 h-4 text-error mt-0.5 shrink-0" strokeWidth={1.75} />
               <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-error">Failed to load rules</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{error}</div>
               </div>
               <button
                  type="button"
                  onClick={fetchRules}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-outline-variant/20 text-on-surface text-[10px] font-semibold tracking-wider uppercase hover:border-primary/40 transition-colors shrink-0"
               >
                  <RefreshCw className="w-3 h-3" strokeWidth={2} />
                  Retry
               </button>
            </div>
         )}

         <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <section aria-label="Rules" className="xl:col-span-8 flex flex-col gap-4">
               {loading ? (
                  <LoadingState />
               ) : sortedRules.length === 0 ? (
                  <EmptyState onAddClick={openCreate} />
               ) : (
                  sortedRules.map((rule) => <RuleCard key={rule.id} rule={rule} onToggleActive={() => toggleActive(rule)} onEdit={() => openEdit(rule)} onDelete={() => setDeletingId(rule.id)} />)
               )}
            </section>

            <aside className="xl:col-span-4 flex flex-col gap-6">
               <HowConditionsWork />
            </aside>
         </div>

         {dialogOpen && <RuleDialog initial={editing} submitting={submitting} fieldErrors={fieldErrors} onClose={closeDialog} onSubmit={handleSubmit} />}

         {deletingId && <DeleteConfirmDialog rule={rules.find((r) => r.id === deletingId) ?? null} onCancel={() => setDeletingId(null)} onConfirm={confirmDelete} />}
      </>
   );
}

function StatTile({ label, value, icon: Icon, accent }: { label: string; value: number; icon: typeof Sparkles; accent: string }) {
   return (
      <div className="bg-glass rounded-xl p-5 glow-top border border-outline-variant/10">
         <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">{label}</span>
            <div className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center ${accent}`}>
               <Icon className="w-4 h-4" strokeWidth={1.75} />
            </div>
         </div>
         <div className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface">{value}</div>
      </div>
   );
}

function LoadingState() {
   return (
      <div className="bg-glass rounded-xl p-10 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-3 min-h-50">
         <Loader2 className="w-6 h-6 text-primary animate-spin" strokeWidth={1.75} />
         <p className="text-xs text-on-surface-variant">Loading rules…</p>
      </div>
   );
}

function EmptyState({ onAddClick }: { onAddClick: () => void }) {
   return (
      <div className="bg-glass rounded-xl p-10 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-4 min-h-87.5">
         <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="w-6 h-6" strokeWidth={1.75} />
         </div>
         <div>
            <h3 className="text-base font-semibold text-on-surface">No automation rules yet</h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-1.5 leading-relaxed">
               Create a rule to map wallet, direction, and counterparty onto a QuickBooks journal entry. The first rule that matches a transaction wins.
            </p>
         </div>
         <button
            type="button"
            onClick={onAddClick}
            className="btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity mt-1"
         >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            Create Rule
         </button>
      </div>
   );
}

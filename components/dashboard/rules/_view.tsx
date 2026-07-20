'use client';

import {
  ArrowRight,
  CircleHelp,
  MoreVertical,
  Pause,
  Pencil,
  Play,
  Sparkles,
  Trash2,
} from 'lucide-react';
import type { Rule } from '@/app/app/_data/rules';
import {
  ActionVM,
  ConditionVM,
  buildAction,
  buildConditions,
  formatRelative,
} from './_view-models';

export function RuleCard({
  rule,
  onToggleActive,
  onEdit,
  onDelete,
}: {
  rule: Rule;
  onToggleActive: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const conditions: ConditionVM[] = buildConditions(rule);
  const action: ActionVM = buildAction(rule);

  return (
    <article className="bg-glass rounded-xl p-5 md:p-6 glow-top border border-outline-variant/10">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5" strokeWidth={1.75} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-on-surface">{rule.name}</h3>
            <span
              className={
                'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase ' +
                (rule.active
                  ? 'bg-primary/10 text-primary'
                  : 'bg-surface-container-high text-on-surface-variant')
              }
            >
              {rule.active ? 'Active' : 'Inactive'}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-surface-container-high text-on-surface-variant">
              Priority {rule.priority}
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">
            Routes matching transactions to QuickBooks accounts when synced.
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onToggleActive}
            aria-label={rule.active ? 'Pause rule' : 'Activate rule'}
            className={
              'w-9 h-9 rounded-lg flex items-center justify-center transition-colors ' +
              (rule.active
                ? 'text-primary bg-primary/10'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container')
            }
          >
            {rule.active ? <Pause className="w-4 h-4" strokeWidth={1.75} /> : <Play className="w-4 h-4" strokeWidth={1.75} />}
          </button>
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit rule"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <Pencil className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete rule"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="More actions"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <MoreVertical className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-3">
        <ConditionPanel conditions={conditions} />
        <Connector />
        <ActionPanel action={action} />
      </div>

      <div className="mt-4 pt-4 border-t border-outline-variant/10 flex items-center justify-between text-xs text-on-surface-variant gap-3">
        <span className="font-mono truncate" title={rule.id}>
          ID {rule.id}
        </span>
        <span>Updated {formatRelative(rule.updatedAt)}</span>
      </div>
    </article>
  );
}

function ConditionPanel({ conditions }: { conditions: ConditionVM[] }) {
  return (
    <div className="flex-1 rounded-lg bg-surface-container-low border border-outline-variant/10 p-3 flex flex-col gap-2">
      <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
        When
      </span>
      {conditions.length === 0 ? (
        <span className="text-xs text-on-surface-variant">Matches all transactions</span>
      ) : (
        <ul className="flex flex-wrap gap-1.5">
          {conditions.map((c, i) => {
            const CIcon = c.icon;
            return (
              <li
                key={i}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-container-high text-xs"
              >
                <CIcon className="w-3 h-3 text-on-surface-variant" strokeWidth={1.75} />
                <span className="text-on-surface-variant">{c.label}</span>
                <span className="font-mono text-on-surface">{c.value}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function ActionPanel({ action }: { action: ActionVM }) {
  return (
    <div className="flex-1 rounded-lg bg-primary/10 border border-primary/20 p-3 flex flex-col gap-2">
      <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-primary">
        Then
      </span>
      <ul className="flex flex-col gap-1.5">
        {action.entries.map((entry, i) => (
          <li
            key={i}
            className="inline-flex items-center gap-1.5 self-start px-2 py-1 rounded-md bg-primary/15 text-xs"
          >
            <span className="text-primary">{entry.label}</span>
            <span className="font-mono text-on-surface">{entry.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Connector() {
  return (
    <div className="md:flex md:items-center md:justify-center md:w-8 shrink-0">
      <ArrowRight className="hidden md:block w-4 h-4 text-on-surface-variant" strokeWidth={1.5} />
      <div className="md:hidden -my-1 flex justify-center">
        <ArrowRight className="w-4 h-4 text-on-surface-variant -rotate-90" strokeWidth={1.5} />
      </div>
    </div>
  );
}

export function HowConditionsWork() {
  const items: { k: string; v: string }[] = [
    { k: 'Wallet', v: 'Optional. If set, the rule only fires for transactions on that wallet.' },
    { k: 'Direction', v: 'Optional. RECEIVED or SENT. Leave empty to match both.' },
    { k: 'Counterparty', v: 'Optional. Paste the wallet address of the person or business you transact with.' },
    { k: 'Order', v: 'Rules are evaluated by priority (highest first). The first match wins.' },
    { k: 'Inactive', v: 'Inactive rules are stored but never evaluated.' },
  ];
  return (
    <section className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10">
      <header className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <CircleHelp className="w-4 h-4" strokeWidth={1.75} />
        </div>
        <h2 className="text-[16px] leading-6 font-semibold tracking-tight text-on-surface">
          How rules match
        </h2>
      </header>
      <ul className="flex flex-col gap-3">
        {items.map(({ k, v }) => (
          <li key={k} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[10px] font-bold tracking-wider">{k[0]}</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-on-surface">{k}</div>
              <div className="text-xs text-on-surface-variant leading-relaxed">{v}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

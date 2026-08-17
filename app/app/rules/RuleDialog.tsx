'use client';

import { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { RULE_DIRECTIONS, type CreateRuleRequest, type Rule, type RuleDirection } from '../_data/rules';
import WalletService from '@/services/WalletService';
import type { Wallet } from '@/app/app/_data/wallets';
import { useAccountStore } from '@/providers/account-store';
import type { QuickBooksAccount } from '@/services/AccountService';

type Props = {
  initial: Rule | null;
  submitting: boolean;
  /** Map of server field errors to display under each input. */
  fieldErrors?: Record<string, string>;
  onClose: () => void;
  onSubmit: (payload: CreateRuleRequest) => Promise<void> | void;
};

export default function RuleDialog({
  initial,
  submitting,
  fieldErrors,
  onClose,
  onSubmit,
}: Props) {
  const isEdit = !!initial;

  const [name, setName] = useState(initial?.name ?? '');
  const [walletId, setWalletId] = useState<string>(initial?.walletId ?? '');
  const [direction, setDirection] = useState<'' | RuleDirection>(
    initial?.direction ?? ''
  );
  const [counterpartyAddress, setCounterpartyAddress] = useState(
    initial?.counterpartyAddress ?? ''
  );
  const [offsetAccountId, setOffsetAccountId] = useState(
    initial?.offsetAccountId ?? ''
  );
  const [priority, setPriority] = useState<number>(initial?.priority ?? 0);
  const [active, setActive] = useState<boolean>(initial?.active ?? true);
  const [error, setError] = useState<string | null>(null);
  const offsetAccounts = useAccountStore((s) => s.offsetAccounts);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [walletsLoading, setWalletsLoading] = useState(true);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !submitting) onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, submitting]);

  useEffect(() => {
    let cancelled = false;

    async function loadWallets() {
      setWalletsLoading(true);
      try {
        const walletList = await WalletService.getWallets();
        if (!cancelled) {
          setWallets(walletList);
        }
      } catch {
        // Silently fail — wallet is optional
      } finally {
        if (!cancelled) setWalletsLoading(false);
      }
    }

    loadWallets();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
    // `open` is not a prop — this dialog is only mounted when open.
    // Keeping the effect for body-scroll lock consistent with the wallet dialog.
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !offsetAccountId.trim()) {
      setError('Name and offset account are required.');
      return;
    }
    setError(null);
    await onSubmit({
      name: name.trim(),
      walletId: walletId.trim() ? walletId.trim() : null,
      direction: direction === '' ? null : direction,
      counterpartyAddress: counterpartyAddress.trim() ? counterpartyAddress.trim() : null,
      offsetAccountId: offsetAccountId.trim(),
      priority,
      active,
    });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? 'Edit rule' : 'New rule'}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => !submitting && onClose()}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        <header className="px-6 py-5 border-b border-outline-variant/10 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-on-surface">
              {isEdit ? 'Edit rule' : 'New rule'}
            </h2>
            <p className="text-xs text-on-surface-variant mt-1">
              Set conditions that a transaction must meet for this rule to fire.
              Leave a field empty to match any value. The highest-priority match
              wins.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            disabled={submitting}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50 shrink-0"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          <Field label="Name" required error={fieldErrors?.name}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Treasury → Payroll"
              className="input"
              required
              disabled={submitting}
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Wallet (optional)" error={fieldErrors?.walletId}>
              <select
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                className="input"
                disabled={submitting || walletsLoading || wallets.length === 0}
              >
                <option value="">
                  {walletsLoading
                    ? 'Loading wallets…'
                    : wallets.length === 0
                    ? 'No wallets connected'
                    : 'Match any wallet'}
                </option>
                {wallets.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.label} ({w.chain})
                  </option>
                ))}
              </select>
              {wallets.length === 0 && !walletsLoading && (
                <p className="text-[10px] text-on-surface-variant mt-1">
                  You currently have no connected wallets.{' '}
                  <a href="/app/wallets" className="text-primary underline">
                    Connect a wallet
                  </a>{' '}
                  to use this option.
                </p>
              )}
            </Field>

            <Field label="Direction (optional)" error={fieldErrors?.direction}>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as '' | RuleDirection)}
                className="input"
                disabled={submitting}
              >
                <option value="">Any</option>
                {RULE_DIRECTIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field
            label="Counterparty address"
            error={fieldErrors?.counterpartyAddress}
          >
            <input
              type="text"
              value={counterpartyAddress}
              onChange={(e) => setCounterpartyAddress(e.target.value)}
              placeholder="0x… / T… / …"
              className="input font-mono"
              disabled={submitting}
            />
            <p className="text-[10px] text-on-surface-variant mt-1">
              Match transactions sent to or from this address. Paste the wallet
              address of the person or business you transact with.
            </p>
          </Field>

          <div className="h-px bg-outline-variant/10" />

          <AccountSelect
            label="Categorize as"
            value={offsetAccountId}
            accounts={offsetAccounts}
            error={fieldErrors?.offsetAccountId}
            disabled={submitting}
            onChange={setOffsetAccountId}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Priority" error={fieldErrors?.priority}>
              <input
                type="number"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="input"
                disabled={submitting}
              />
              <p className="text-[10px] text-on-surface-variant mt-1">
                Higher = evaluated first.
              </p>
            </Field>

            <Field label="Status">
              <label className="inline-flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  disabled={submitting}
                  className="w-4 h-4 rounded border-outline-variant/40 bg-surface-container-high disabled:opacity-50"
                />
                <span className="text-sm text-on-surface">Active</span>
              </label>
            </Field>
          </div>

          {error && (
            <div className="rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-xs text-error">
              {error}
            </div>
          )}
        </div>

        <footer className="px-6 py-4 border-t border-outline-variant/10 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container text-xs font-semibold tracking-wider uppercase transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2.5} />
                {isEdit ? 'Saving…' : 'Creating…'}
              </>
            ) : isEdit ? (
              'Save changes'
            ) : (
              'Create rule'
            )}
          </button>
        </footer>

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
      </form>
    </div>
  );
}

function AccountSelect({
  label,
  value,
  accounts,
  error,
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  accounts: QuickBooksAccount[];
  error?: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  const hasSelectedAccount = accounts.some((account) => account.id === value);

  return (
    <Field label={label} required error={error}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input bg-surface-container text-on-surface border-outline-variant/50"
        required
        disabled={disabled}
      >
        <option className="bg-surface-container text-on-surface" value="">
          {accounts.length === 0 ? 'No accounts available' : 'Select an account'}
        </option>
        {value && !hasSelectedAccount && (
          <option className="bg-surface-container text-on-surface" value={value}>
            Current account ({value})
          </option>
        )}
        {accounts.map((account) => (
          <option className="bg-surface-container text-on-surface" key={account.id} value={account.id}>
            {account.label} ({account.type})
          </option>
        ))}
      </select>
    </Field>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </span>
      {children}
      {error && <span className="text-[10px] text-error mt-0.5">{error}</span>}
    </label>
  );
}

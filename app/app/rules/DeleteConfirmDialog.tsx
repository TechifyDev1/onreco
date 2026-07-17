'use client';

import { useEffect } from 'react';
import type { Rule } from '../_data/rules';

type Props = {
  rule: Rule | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmDialog({ rule, onCancel, onConfirm }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  if (!rule) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-2xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-base font-semibold text-on-surface">Delete rule?</h2>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          <span className="font-semibold text-on-surface">{rule.name}</span> will
          be removed. Transactions that previously matched this rule will become
          unmatched and stay in your <em>Pending</em> state until a new rule is
          created.
        </p>
        <footer className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-error text-on-error text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            Delete rule
          </button>
        </footer>
      </div>
    </div>
  );
}

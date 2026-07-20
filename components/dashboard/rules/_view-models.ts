// Pure view-model helpers for the rules page.
// Derive display values from the backend `Rule` shape — no I/O, no hooks.

import {
  ArrowRight,
  GitBranch,
  Wallet as WalletIcon,
} from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import type { Rule } from '@/app/app/_data/rules';

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type ConditionVM = {
  icon: IconComponent;
  label: string;
  value: string;
};

export type ActionVM = {
  entries: { label: string; value: string }[];
};

/**
 * Build the "When" chain from the rule. Only emits chips for fields that
 * the backend actually evaluates (wallet / direction / counterparty).
 * If the rule has none of those set, returns [] so the UI can show
 * "Matches all transactions".
 */
export function buildConditions(rule: Rule): ConditionVM[] {
  const out: ConditionVM[] = [];

  if (rule.walletId) {
    out.push({
      icon: WalletIcon,
      label: 'Wallet',
      value: rule.walletLabel ?? rule.walletAddress ?? rule.walletId,
    });
  }

  if (rule.direction) {
    out.push({
      icon: ArrowRight,
      label: 'Direction',
      value: rule.direction === 'RECEIVED' ? 'Incoming' : 'Outgoing',
    });
  }

  if (rule.counterpartyAddress) {
    const addr = rule.counterpartyAddress;
    const truncated = addr.length > 12 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
    out.push({
      icon: GitBranch,
      label: 'Counterparty',
      value: truncated,
    });
  }

  return out;
}

/**
 * Build the "Then" chain. Currently this is the QB account mapping that
 * drives the journal entry: wallet side / offset side.
 */
export function buildAction(rule: Rule): ActionVM {
  return {
    entries: [
      { label: 'Offset account', value: rule.offsetAccountId },
    ],
  };
}

/** Lightweight, deterministic relative-time formatter. */
export function formatRelative(iso: string): string {
  if (!iso) return '—';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '—';
  const diff = Date.now() - then;
  if (diff < 0) return 'just now';

  const sec = Math.floor(diff / 1000);
  if (sec < 45) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} day${day === 1 ? '' : 's'} ago`;
  return new Date(iso).toLocaleDateString();
}

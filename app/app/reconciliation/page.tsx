'use client'

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Clock,
  ExternalLink,
  Flag,
  Link2,
  Sparkles,
  XCircle,
} from 'lucide-react'
import { useSimulationStore } from '@/providers/simulation-store'
import { MATCHES, type Decision } from '../_data/reconciliation'

function confidenceStyle(c: number) {
  if (c >= 90) return 'bg-primary/15 text-primary border-primary/30'
  if (c >= 70) return 'bg-secondary/20 text-secondary border-secondary/30'
  return 'bg-tertiary-container/20 text-tertiary border-tertiary-container/30'
}

function decisionBadge(d: Decision) {
  if (d === 'approved')
    return {
      icon: CheckCircle2,
      label: 'Approved',
      cls: 'bg-primary/10 text-primary',
    }
  if (d === 'rejected')
    return {
      icon: XCircle,
      label: 'Rejected',
      cls: 'bg-tertiary-container/20 text-tertiary',
    }
  if (d === 'flagged')
    return {
      icon: Flag,
      label: 'Flagged',
      cls: 'bg-secondary/15 text-secondary',
    }
  return {
    icon: Clock,
    label: 'Pending',
    cls: 'bg-surface-container-high text-on-surface-variant',
  }
}

export default function Page() {
  const { isEmptySimulated } = useSimulationStore()
  const visibleMatches = isEmptySimulated ? [] : MATCHES

  const stats = [
    {
      label: 'Matched',
      value: isEmptySimulated ? '0' : '184',
      icon: Link2,
      accent: 'text-primary',
    },
    {
      label: 'Unmatched',
      value: isEmptySimulated ? '0' : '12',
      icon: AlertCircle,
      accent: 'text-secondary',
    },
    {
      label: 'Pending Review',
      value: isEmptySimulated ? '0' : '7',
      icon: Clock,
      accent: 'text-on-surface',
    },
    {
      label: 'Rejected',
      value: isEmptySimulated ? '0' : '3',
      icon: XCircle,
      accent: 'text-tertiary',
    },
  ]

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
            Reconciliation
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Match incoming USDT and USDC payments to open invoices. Approve,
            reject, or flag for review.
          </p>
        </div>
        {!isEmptySimulated && (
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant">
                Auto-match threshold
              </span>
              <span className="font-mono text-on-surface">85%</span>
            </div>
            <button
              type="button"
              className="btn-primary inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
              Run Match
            </button>
          </div>
        )}
      </header>

      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, accent }) => (
          <div
            key={label}
            className="bg-glass rounded-xl p-5 glow-top border border-outline-variant/10"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                {label}
              </span>
              <div
                className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center ${accent}`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.75} />
              </div>
            </div>
            <div className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface">
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Match list */}
        <section
          aria-label="Match candidates"
          className="xl:col-span-8 flex flex-col gap-4"
        >
          {visibleMatches.length === 0 ? (
            <div className="bg-glass rounded-xl p-10 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-4 min-h-87.5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Link2 className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-on-surface">
                  No pending matches
                </h3>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-1.5 leading-relaxed">
                  All stablecoin payments have been successfully reconciled or
                  no invoices are open. Import invoices or run a match scan to
                  find candidates.
                </p>
              </div>
              <button
                type="button"
                className="btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity mt-1"
              >
                Import Invoices
              </button>
            </div>
          ) : (
            visibleMatches.map((m) => {
              const conf = confidenceStyle(m.confidence)
              const dec = decisionBadge(m.decision)
              const DecIcon = dec.icon
              return (
                <article
                  key={m.id}
                  className="bg-glass rounded-xl p-5 md:p-6 glow-top border border-outline-variant/10"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Payment */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                          Wallet Payment
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-primary/10 text-primary">
                          {m.payment.asset}
                        </span>
                      </div>
                      <div className="font-mono text-on-surface text-base">
                        {m.payment.amount}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-on-surface-variant">
                        <span className="font-mono">{m.payment.usd}</span>
                        <span>·</span>
                        <span>{m.payment.wallet}</span>
                        <span>·</span>
                        <span>{m.payment.time}</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex flex-col items-center gap-2 shrink-0">
                      <ArrowRight
                        className="w-5 h-5 text-on-surface-variant"
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Confidence */}
                    <div className="md:w-24 flex md:flex-col items-center md:items-center gap-2 md:gap-1 shrink-0">
                      <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                        Confidence
                      </span>
                      <span
                        className={
                          'inline-block px-2.5 py-1 rounded-md border font-mono text-sm font-semibold ' +
                          conf
                        }
                      >
                        {m.confidence}%
                      </span>
                    </div>

                    {/* Invoice */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                          Potential Match
                        </span>
                      </div>
                      {m.invoice.id === '—' ? (
                        <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                          <CircleHelp className="w-4 h-4" strokeWidth={1.75} />
                          <span>No match found</span>
                        </div>
                      ) : (
                        <>
                          <div className="font-mono text-on-surface text-base">
                            {m.invoice.id}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-on-surface-variant">
                            <span>{m.invoice.customer}</span>
                            <span>·</span>
                            <span className="font-mono">
                              {m.invoice.amount}
                            </span>
                            <span>·</span>
                            <span>Due {m.invoice.due}</span>
                            <a
                              href="#"
                              aria-label="Open invoice"
                              className="text-on-surface-variant hover:text-primary transition-colors"
                            >
                              <ExternalLink
                                className="w-3 h-3"
                                strokeWidth={1.75}
                              />
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="mt-4 pt-4 border-t border-outline-variant/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <span
                      className={
                        'inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold tracking-wider uppercase ' +
                        dec.cls
                      }
                    >
                      <DecIcon className="w-3 h-3" strokeWidth={2.5} />
                      {dec.label}
                    </span>
                    <div className="sm:ml-auto flex items-center gap-2">
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-wider uppercase hover:border-primary/40 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-wider uppercase hover:border-primary/40 transition-colors inline-flex items-center gap-1.5"
                      >
                        <Flag className="w-3 h-3" strokeWidth={2} />
                        Flag
                      </button>
                      <button
                        type="button"
                        className="btn-primary px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
                        Approve
                      </button>
                    </div>
                  </div>
                </article>
              )
            })
          )}
        </section>

        {/* How it works */}
        <aside className="xl:col-span-4">
          <section className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10 sticky top-20">
            <h2 className="text-[16px] leading-6 font-semibold tracking-tight text-on-surface mb-3">
              How matching works
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
              Onreco compares every incoming stablecoin payment against your
              open invoices. We score the match by amount, customer wallet, and
              timing, then surface the best candidates for your review.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { k: 'Amount', v: 'Exact or near-exact USD value match' },
                { k: 'Counterparty', v: 'Wallet has paid this invoice before' },
                { k: 'Timing', v: 'Payment within the invoice due window' },
              ].map(({ k, v }) => (
                <li key={k} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold tracking-wider">
                      {k[0]}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-on-surface">
                      {k}
                    </div>
                    <div className="text-xs text-on-surface-variant leading-relaxed">
                      {v}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-outline-variant/10">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <Sparkles
                  className="w-3.5 h-3.5 text-primary"
                  strokeWidth={2}
                />
                <span>Auto-approve at 95% confidence is on</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

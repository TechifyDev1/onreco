'use client'

import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  ExternalLink,
  Filter,
  Receipt,
} from 'lucide-react'
import { useSimulationStore } from '@/providers/simulation-store'
import {
  TRANSACTIONS,
  TX_FILTERS,
  TX_STATUS_STYLES,
} from '../_data/transactions'

export default function Page() {
  const { isEmptySimulated } = useSimulationStore()
  const visibleTxs = isEmptySimulated ? [] : TRANSACTIONS

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
            Transactions
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Every USDT and USDC transaction across your connected wallets.
            Categorized, reconciled, and synced to your accounting ledger.
          </p>
        </div>
        {!isEmptySimulated && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-wider uppercase hover:border-primary/40 transition-colors"
            >
              <Filter className="w-3.5 h-3.5" strokeWidth={1.75} />
              Filter
            </button>
            <button
              type="button"
              className="btn-primary inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" strokeWidth={2} />
              Export CSV
            </button>
          </div>
        )}
      </header>

      {/* Filter strip */}
      {!isEmptySimulated && (
        <div
          role="tablist"
          aria-label="Transaction filters"
          className="flex items-center gap-1 p-1 rounded-lg bg-surface-container-low border border-outline-variant/10 w-fit"
        >
          {TX_FILTERS.map((f, i) => {
            const active = i === 0
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active}
                className={
                  'px-3 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors ' +
                  (active
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface-variant hover:text-on-surface')
                }
              >
                {f}
              </button>
            )
          })}
        </div>
      )}

      {/* Table */}
      <section
        aria-label="All transactions"
        className="bg-glass rounded-xl border border-outline-variant/10 glow-top overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Direction</th>
                <th className="px-5 py-3 font-semibold">Asset</th>
                <th className="px-5 py-3 font-semibold text-right">Amount</th>
                <th className="px-5 py-3 font-semibold text-right">USD</th>
                <th className="px-5 py-3 font-semibold hidden md:table-cell">
                  Wallet
                </th>
                <th className="px-5 py-3 font-semibold hidden lg:table-cell">
                  Category
                </th>
                <th className="px-5 py-3 font-semibold hidden xl:table-cell">
                  Counterparty
                </th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleTxs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 max-w-sm mx-auto">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Receipt className="w-6 h-6" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-on-surface">
                          No transactions found
                        </h3>
                        <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                          Connect a wallet or configure integration to import
                          on-chain history.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity mt-2"
                      >
                        Add Wallet
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                visibleTxs.map((tx) => {
                  const isIn = tx.direction === 'in'
                  return (
                    <tr
                      key={tx.id}
                      className="border-t border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors"
                    >
                      <td className="px-5 py-4 text-xs text-on-surface-variant whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="px-5 py-4">
                        <div
                          className={
                            'w-8 h-8 rounded-lg flex items-center justify-center ' +
                            (isIn
                              ? 'bg-primary/10 text-primary'
                              : 'bg-secondary/15 text-secondary')
                          }
                        >
                          {isIn ? (
                            <ArrowDownLeft
                              className="w-4 h-4"
                              strokeWidth={2}
                            />
                          ) : (
                            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-on-surface">
                        {tx.asset}
                      </td>
                      <td className="px-5 py-4 font-mono text-on-surface text-right whitespace-nowrap">
                        {tx.amount}
                      </td>
                      <td className="px-5 py-4 font-mono text-on-surface text-right whitespace-nowrap">
                        {tx.usd}
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell text-on-surface-variant">
                        {tx.wallet}
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell text-on-surface-variant">
                        {tx.category}
                      </td>
                      <td className="px-5 py-4 hidden xl:table-cell font-mono text-xs">
                        <a
                          href="#"
                          className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors"
                        >
                          {tx.counterparty}
                          <ExternalLink
                            className="w-3 h-3"
                            strokeWidth={1.75}
                          />
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={
                            'inline-block px-2 py-1 rounded text-[10px] font-semibold tracking-wider uppercase ' +
                            TX_STATUS_STYLES[tx.status]
                          }
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-5 py-4 border-t border-outline-variant/10 text-xs text-on-surface-variant">
          {isEmptySimulated ? (
            <span>Showing 0 of 0 transactions</span>
          ) : (
            <>
              <span>Showing 12 of 247 transactions</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-md border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-md bg-primary-container text-on-primary-container font-semibold"
                >
                  1
                </button>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-md border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors"
                >
                  2
                </button>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-md border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors"
                >
                  3
                </button>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-md border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

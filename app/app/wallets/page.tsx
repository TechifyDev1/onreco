'use client'

import type { Metadata } from 'next'
import {
  CircleHelp,
  Copy,
  ExternalLink,
  MoreVertical,
  Pause,
  Play,
  Plus,
  Wallet as WalletIcon,
} from 'lucide-react'
import { useSimulationStore } from '@/providers/simulation-store'
import {
  NETWORK_CHIP,
  SUPPORTED_NETWORKS,
  WALLETS,
  type Network,
  type WalletStatus,
} from '../_data/wallets'

const STATUS_DOT: Record<WalletStatus, string> = {
  monitoring: 'bg-primary',
  paused: 'bg-outline',
}

export default function Page() {
  const { isEmptySimulated } = useSimulationStore()
  const visibleWallets = isEmptySimulated ? [] : WALLETS

  const monitoring = visibleWallets.filter(
    (w) => w.status === 'monitoring'
  ).length
  const paused = visibleWallets.filter((w) => w.status === 'paused').length
  const totalTx = visibleWallets.reduce((acc, w) => acc + w.transactions30d, 0)
  const chains = new Set(
    visibleWallets
      .filter((w) => w.status === 'monitoring')
      .map((w) => w.network)
  ).size

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
            Wallets
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Connect and monitor wallets across Tron, Solana, Base, and other
            supported networks. Onreco never holds private keys.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Add Wallet
        </button>
      </header>

      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Monitoring',
            value: String(monitoring),
            icon: WalletIcon,
            accent: 'text-primary',
          },
          {
            label: 'Paused',
            value: String(paused),
            icon: Pause,
            accent: 'text-on-surface-variant',
          },
          {
            label: 'Transactions (30d)',
            value: String(totalTx),
            icon: Play,
            accent: 'text-primary',
          },
          {
            label: 'Chains covered',
            value: String(chains),
            icon: ExternalLink,
            accent: 'text-primary',
          },
        ].map(({ label, value, icon: Icon, accent }) => (
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

      {/* Wallet grid */}
      {visibleWallets.length === 0 ? (
        <div className="bg-glass rounded-xl p-10 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-4 min-h-75">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <WalletIcon className="w-6 h-6" strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-on-surface">
              No connected wallets
            </h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-1.5 leading-relaxed">
              Link read-only wallets across supported chains. Onreco never
              stores private keys and only requires read access.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity mt-1"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            Add Wallet
          </button>
        </div>
      ) : (
        <section
          aria-label="Connected wallets"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {visibleWallets.map((w) => (
            <article
              key={w.id}
              className="bg-glass rounded-xl p-5 md:p-6 glow-top border border-outline-variant/10 flex flex-col gap-4"
            >
              {/* Title row */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <WalletIcon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-on-surface truncate">
                    {w.label}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={
                        'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase border ' +
                        NETWORK_CHIP[w.network]
                      }
                    >
                      {w.network}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase text-on-surface-variant">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[w.status]}`}
                      />
                      {w.status}
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

              {/* Address */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/10">
                <span className="font-mono text-xs text-on-surface flex-1 truncate">
                  {w.address}
                </span>
                <button
                  type="button"
                  aria-label="Copy address"
                  className="text-on-surface-variant/60 hover:text-primary transition-colors shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" strokeWidth={1.75} />
                </button>
                <a
                  href="#"
                  aria-label="Open in block explorer"
                  className="text-on-surface-variant/60 hover:text-primary transition-colors shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
                </a>
              </div>

              {/* Asset chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {w.assets.map((a) => (
                  <span
                    key={a}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-surface-container-high text-on-surface"
                  >
                    {a}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-outline-variant/10 flex items-center justify-between text-xs text-on-surface-variant">
                <span>Last sync · {w.lastSync}</span>
                <span>
                  <span className="font-semibold text-on-surface">
                    {w.transactions30d}
                  </span>{' '}
                  tx (30d)
                </span>
              </div>
            </article>
          ))}

          {/* Add wallet tile */}
          <button
            type="button"
            className="hidden lg:flex flex-col items-center justify-center gap-2 min-h-65 rounded-xl border-2 border-dashed border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center">
              <Plus className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <span className="text-sm font-semibold">Add a wallet</span>
            <span className="text-xs">
              Read-only · No private keys required
            </span>
          </button>
        </section>
      )}

      {/* Supported networks */}
      <section className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10">
        <header className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <CircleHelp className="w-4 h-4" strokeWidth={1.75} />
          </div>
          <div>
            <h2 className="text-[16px] leading-6 font-semibold tracking-tight text-on-surface">
              Supported networks
            </h2>
            <p className="text-xs text-on-surface-variant">
              Onreco monitors activity on these chains. New chains roll out as
              demand grows.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SUPPORTED_NETWORKS.map((n) => (
            <div
              key={n.name}
              className="rounded-lg bg-surface-container-low border border-outline-variant/10 p-4 flex items-center justify-between"
            >
              <span className="text-sm font-semibold text-on-surface">
                {n.name}
              </span>
              {n.status === 'active' ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-primary/10 text-primary">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-surface-container-high text-on-surface-variant">
                  Coming soon
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

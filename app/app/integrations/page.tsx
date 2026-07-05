'use client'

import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
  Settings,
  Sparkles,
  Plug,
} from 'lucide-react'
import { useSimulationStore } from '@/providers/simulation-store'
import {
  INTEGRATIONS,
  type Integration,
  type IntegrationStatus,
} from '../_data/integrations'

const STATUS_PILL: Record<
  IntegrationStatus,
  { label: string; cls: string; icon: typeof CheckCircle2 }
> = {
  connected: {
    label: 'Connected',
    cls: 'bg-primary/10 text-primary',
    icon: CheckCircle2,
  },
  disconnected: {
    label: 'Disconnected',
    cls: 'bg-surface-container-high text-on-surface-variant',
    icon: Clock,
  },
  error: {
    label: 'Error',
    cls: 'bg-tertiary-container/20 text-tertiary',
    icon: AlertCircle,
  },
  soon: {
    label: 'Coming soon',
    cls: 'bg-surface-container-high text-on-surface-variant',
    icon: Sparkles,
  },
}

function StatusPill({ status }: { status: IntegrationStatus }) {
  const p = STATUS_PILL[status]
  const Icon = p.icon
  return (
    <span
      className={
        'inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold tracking-wider uppercase ' +
        p.cls
      }
    >
      <Icon className="w-3 h-3" strokeWidth={2.5} />
      {p.label}
    </span>
  )
}

function IntegrationCard({ i }: { i: Integration }) {
  const isConnected = i.status === 'connected'
  return (
    <article className="bg-glass rounded-xl p-5 md:p-6 glow-top border border-outline-variant/10 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className={
            'w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold shrink-0 ' +
            i.monogramBg +
            ' ' +
            i.monogramFg
          }
        >
          {i.monogram}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-on-surface">
              {i.name}
            </h3>
            <StatusPill status={i.status} />
          </div>
          {i.detail && (
            <p className="text-xs text-on-surface-variant mt-1">{i.detail}</p>
          )}
        </div>
      </div>

      {/* Blurb */}
      <p className="text-sm text-on-surface-variant leading-relaxed">
        {i.blurb}
      </p>

      {/* Footer */}
      <div className="mt-auto pt-3 border-t border-outline-variant/10 flex items-center justify-between gap-3">
        <div className="text-xs text-on-surface-variant">
          {isConnected && i.lastSync ? (
            <span>Last sync · {i.lastSync}</span>
          ) : i.status === 'soon' ? (
            <span>On our roadmap</span>
          ) : (
            <span>Not connected</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-wider uppercase hover:border-primary/40 transition-colors inline-flex items-center gap-1.5"
              >
                <Settings className="w-3 h-3" strokeWidth={1.75} />
                Configure
              </button>
              <a
                href="#"
                className="btn-primary px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
              >
                Open
                <ExternalLink className="w-3 h-3" strokeWidth={2} />
              </a>
            </>
          ) : i.status === 'soon' ? (
            <button
              type="button"
              disabled
              className="px-3 py-1.5 rounded-lg border border-outline-variant/15 text-on-surface-variant/60 text-xs font-semibold tracking-wider uppercase cursor-not-allowed"
            >
              Notify me
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
            >
              <Plus className="w-3 h-3" strokeWidth={2.5} />
              Connect
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Page() {
  const { isEmptySimulated } = useSimulationStore()

  const allList = INTEGRATIONS
  const connectedList = isEmptySimulated
    ? []
    : allList.filter((i) => i.status === 'connected')

  // In empty state, we treat previously connected integrations (like QuickBooks Online) as disconnected so they show up in available.
  const availableList = allList.filter((i) => {
    if (isEmptySimulated) {
      return i.status !== 'soon'
    }
    return i.status === 'disconnected' || i.status === 'error'
  })

  // We adjust the status if empty simulated is active so QBO doesn't say "Connected"
  const adjustedAvailableList = availableList.map((i) => {
    if (isEmptySimulated && i.status === 'connected') {
      return { ...i, status: 'disconnected' as IntegrationStatus }
    }
    return i
  })

  const soonList = allList.filter((i) => i.status === 'soon')

  const connected = connectedList.length
  const available = adjustedAvailableList.filter(
    (i) => i.status === 'disconnected'
  ).length
  const errors = isEmptySimulated
    ? 0
    : allList.filter((i) => i.status === 'error').length
  const soon = soonList.length

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
            Integrations
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Connect your accounting platform, bank, and other tools. Onreco
            pushes categorized stablecoin activity wherever your team already
            works.
          </p>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-on-surface-variant hover:text-primary transition-colors"
        >
          Request an integration
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
        </a>
      </header>

      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Connected',
            value: String(connected),
            icon: CheckCircle2,
            accent: 'text-primary',
          },
          {
            label: 'Available',
            value: String(available),
            icon: Plus,
            accent: 'text-primary',
          },
          {
            label: 'Errors',
            value: String(errors),
            icon: AlertCircle,
            accent: 'text-tertiary',
          },
          {
            label: 'Coming soon',
            value: String(soon),
            icon: Sparkles,
            accent: 'text-on-surface-variant',
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

      {/* Connected */}
      <section
        aria-label="Connected integrations"
        className="flex flex-col gap-4"
      >
        <header className="flex items-center justify-between">
          <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">
            Connected
          </h2>
          <span className="text-xs text-on-surface-variant">
            {connected} active
          </span>
        </header>
        {connectedList.length === 0 ? (
          <div className="bg-glass rounded-xl p-8 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-3 min-h-45">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Plug className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                No connected integrations
              </p>
              <p className="text-xs text-on-surface-variant max-w-xs mt-1">
                Connect QuickBooks, Xero, or other tools below to start syncing
                your ledger.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {connectedList.map((i) => (
              <IntegrationCard key={i.id} i={i} />
            ))}
          </div>
        )}
      </section>

      {/* Available */}
      {adjustedAvailableList.length > 0 && (
        <section
          aria-label="Available integrations"
          className="flex flex-col gap-4 mt-2"
        >
          <header className="flex items-center justify-between">
            <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">
              Available
            </h2>
            <span className="text-xs text-on-surface-variant">
              {adjustedAvailableList.length} ready to connect
            </span>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {adjustedAvailableList.map((i) => (
              <IntegrationCard key={i.id} i={i} />
            ))}
          </div>
        </section>
      )}

      {/* Coming soon */}
      {soonList.length > 0 && (
        <section
          aria-label="Coming soon integrations"
          className="flex flex-col gap-4 mt-2"
        >
          <header className="flex items-center justify-between">
            <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">
              Coming soon
            </h2>
            <span className="text-xs text-on-surface-variant">
              Notify me when ready
            </span>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {soonList.map((i) => (
              <IntegrationCard key={i.id} i={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

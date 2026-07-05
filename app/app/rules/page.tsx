'use client'

import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Flag,
  History,
  Lightbulb,
  MoreVertical,
  Pause,
  Play,
  Plus,
  Sparkles,
} from 'lucide-react'
import { useSimulationStore } from '@/providers/simulation-store'
import { RULES, RULE_SUGGESTIONS } from '../_data/rules'

export default function Page() {
  const { isEmptySimulated } = useSimulationStore()
  const visibleRules = isEmptySimulated ? [] : RULES

  const stats = [
    {
      label: 'Active Rules',
      value: isEmptySimulated ? '0' : '3',
      icon: Sparkles,
      accent: 'text-primary',
    },
    {
      label: 'Categorized (30d)',
      value: isEmptySimulated ? '0' : '204',
      icon: CheckCircle2,
      accent: 'text-primary',
    },
    {
      label: 'Auto-matched',
      value: isEmptySimulated ? '0' : '184',
      icon: History,
      accent: 'text-primary',
    },
    {
      label: 'Flagged',
      value: isEmptySimulated ? '0' : '3',
      icon: Flag,
      accent: 'text-secondary',
    },
  ]

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
            Rules
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Automate how Onreco categorizes, routes, and flags stablecoin
            transactions. The more rules you add, the less manual review your
            team has to do.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          New Rule
        </button>
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
        {/* Active rules */}
        <section
          aria-label="Active rules"
          className="xl:col-span-8 flex flex-col gap-4"
        >
          {visibleRules.length === 0 ? (
            <div className="bg-glass rounded-xl p-10 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-4 min-h-87.5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-on-surface">
                  No automation rules yet
                </h3>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-1.5 leading-relaxed">
                  Create rules to automatically categorize and route
                  transactions. You can also start with one of our suggestions.
                </p>
              </div>
              <button
                type="button"
                className="btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity mt-1"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                Create Rule
              </button>
            </div>
          ) : (
            visibleRules.map((rule) => (
              <article
                key={rule.id}
                className="bg-glass rounded-xl p-5 md:p-6 glow-top border border-outline-variant/10"
              >
                {/* Title row */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-on-surface">
                        {rule.name}
                      </h3>
                      {rule.status === 'paused' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-surface-container-high text-on-surface-variant">
                          <Pause className="w-2.5 h-2.5" strokeWidth={2.5} />
                          Paused
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {rule.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      aria-label={
                        rule.status === 'active'
                          ? 'Pause rule'
                          : 'Activate rule'
                      }
                      className={
                        'w-9 h-9 rounded-lg flex items-center justify-center transition-colors ' +
                        (rule.status === 'active'
                          ? 'text-primary bg-primary/10'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container')
                      }
                    >
                      {rule.status === 'active' ? (
                        <Pause className="w-4 h-4" strokeWidth={1.75} />
                      ) : (
                        <Play className="w-4 h-4" strokeWidth={1.75} />
                      )}
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

                {/* Condition → Action chain */}
                <div className="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-3">
                  <div className="flex-1 rounded-lg bg-surface-container-low border border-outline-variant/10 p-3 flex flex-col gap-2">
                    <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                      When
                    </span>
                    <ul className="flex flex-wrap gap-1.5">
                      {rule.conditions.map((c, i) => {
                        const CIcon = c.icon
                        return (
                          <li
                            key={i}
                            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-container-high text-xs"
                          >
                            <CIcon
                              className="w-3 h-3 text-on-surface-variant"
                              strokeWidth={1.75}
                            />
                            <span className="text-on-surface-variant">
                              {c.label}
                            </span>
                            <span className="font-mono text-on-surface">
                              {c.value}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <div className="md:flex md:items-center md:justify-center md:w-8 shrink-0">
                    <ArrowRight
                      className="hidden md:block w-4 h-4 text-on-surface-variant"
                      strokeWidth={1.5}
                    />
                    <div className="md:hidden -my-1 flex justify-center">
                      <ArrowRight
                        className="w-4 h-4 text-on-surface-variant -rotate-90"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <div className="flex-1 rounded-lg bg-primary/10 border border-primary/20 p-3 flex flex-col gap-2">
                    <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-primary">
                      Then
                    </span>
                    <div className="inline-flex items-center gap-1.5 self-start px-2 py-1 rounded-md bg-primary/15 text-xs">
                      <span className="text-primary">{rule.action.label}</span>
                      <span className="font-mono text-on-surface">
                        {rule.action.value}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-outline-variant/10 flex items-center justify-between text-xs text-on-surface-variant">
                  <span>
                    Triggered{' '}
                    <span className="font-semibold text-on-surface">
                      {rule.triggered}
                    </span>{' '}
                    times
                  </span>
                  <span>Last run · {rule.lastRun}</span>
                </div>
              </article>
            ))
          )}
        </section>

        {/* Sidebar */}
        <aside className="xl:col-span-4 flex flex-col gap-6">
          <section className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10">
            <header className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center">
                <Lightbulb className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="text-[16px] leading-6 font-semibold tracking-tight text-on-surface">
                  Suggested for you
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Common rules for stablecoin accounting teams.
                </p>
              </div>
            </header>
            <ul className="flex flex-col gap-2">
              {RULE_SUGGESTIONS.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant/10"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-on-surface truncate">
                      {s.name}
                    </div>
                    <div className="text-xs text-on-surface-variant truncate">
                      {s.description}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 px-2.5 py-1.5 rounded-md border border-primary/30 text-primary text-[10px] font-semibold tracking-wider uppercase hover:bg-primary/10 transition-colors"
                  >
                    Enable
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10">
            <header className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <CircleHelp className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <h2 className="text-[16px] leading-6 font-semibold tracking-tight text-on-surface">
                How conditions work
              </h2>
            </header>
            <ul className="flex flex-col gap-3">
              {[
                {
                  k: 'Match',
                  v: 'Every transaction is checked against every active rule in order.',
                },
                {
                  k: 'Order',
                  v: 'First match wins. Reorder rules to control priority.',
                },
                {
                  k: 'Audit',
                  v: 'Every rule-triggered change is logged with the rule name and timestamp.',
                },
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
          </section>
        </aside>
      </div>
    </div>
  )
}

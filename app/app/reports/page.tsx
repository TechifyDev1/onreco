'use client'

import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  History,
  Play,
  Plus,
  Repeat,
  Sparkles,
} from 'lucide-react'
import { useSimulationStore } from '@/providers/simulation-store'

type Format = 'CSV' | 'PDF' | 'XLSX'
type Cadence = 'On demand' | 'Monthly' | 'Weekly' | 'Quarterly'

type Report = {
  id: string
  name: string
  blurb: string
  formats: Format[]
  cadence: Cadence
  lastRun: string
  lastFormat: Format
}

const REPORTS: Report[] = [
  {
    id: 'r1',
    name: 'Monthly Stablecoin Activity',
    blurb:
      'All USDT and USDC transactions for the period, with categorization, direction, and counterparty.',
    formats: ['CSV', 'PDF', 'XLSX'],
    cadence: 'Monthly',
    lastRun: 'Oct 1, 2025',
    lastFormat: 'PDF',
  },
  {
    id: 'r2',
    name: 'Categorization Summary',
    blurb:
      'Aggregate counts and totals by category. Useful for finance reviews and budget reconciliation.',
    formats: ['CSV', 'XLSX'],
    cadence: 'Monthly',
    lastRun: 'Oct 1, 2025',
    lastFormat: 'CSV',
  },
  {
    id: 'r3',
    name: 'Reconciliation Report',
    blurb:
      'Every matched, unmatched, and rejected invoice-to-payment pairing with confidence scores.',
    formats: ['CSV', 'PDF'],
    cadence: 'On demand',
    lastRun: 'Sep 28, 2025',
    lastFormat: 'CSV',
  },
  {
    id: 'r4',
    name: 'Audit Trail Export',
    blurb:
      'Full on-chain audit log: every rule trigger, manual override, and sync event with timestamps.',
    formats: ['CSV', 'PDF'],
    cadence: 'On demand',
    lastRun: 'Sep 25, 2025',
    lastFormat: 'PDF',
  },
  {
    id: 'r5',
    name: 'Tax-ready Transaction Log',
    blurb:
      'Pre-formatted transaction log with cost basis and fiat equivalent for tax filing.',
    formats: ['CSV', 'PDF'],
    cadence: 'Quarterly',
    lastRun: 'Sep 30, 2025',
    lastFormat: 'PDF',
  },
]

const FORMAT_ICON: Record<Format, typeof FileText> = {
  CSV: FileSpreadsheet,
  PDF: FileText,
  XLSX: FileSpreadsheet,
}

const CADENCE_ICON: Record<Cadence, typeof Play> = {
  'On demand': Play,
  Monthly: Calendar,
  Weekly: Repeat,
  Quarterly: Calendar,
}

const RECENT_EXPORTS = [
  {
    report: 'Monthly Stablecoin Activity',
    format: 'PDF' as Format,
    when: '2 min ago',
    size: '184 KB',
  },
  {
    report: 'Categorization Summary',
    format: 'CSV' as Format,
    when: '18 min ago',
    size: '12 KB',
  },
  {
    report: 'Reconciliation Report',
    format: 'CSV' as Format,
    when: '1 hr ago',
    size: '47 KB',
  },
  {
    report: 'Audit Trail Export',
    format: 'PDF' as Format,
    when: 'Yesterday',
    size: '612 KB',
  },
  {
    report: 'Tax-ready Transaction Log',
    format: 'PDF' as Format,
    when: '3 days ago',
    size: '1.2 MB',
  },
]

function ReportCard({ r }: { r: Report }) {
  const CadenceIcon = CADENCE_ICON[r.cadence]
  return (
    <article className="bg-glass rounded-xl p-5 md:p-6 glow-top border border-outline-variant/10 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5" strokeWidth={1.75} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-on-surface">{r.name}</h3>
          <p className="text-xs text-on-surface-variant mt-1">{r.blurb}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-container-low border border-outline-variant/10 text-xs text-on-surface-variant">
          <CadenceIcon className="w-3 h-3" strokeWidth={1.75} />
          {r.cadence}
        </span>
        {r.formats.map((f) => {
          const FIcon = FORMAT_ICON[f]
          return (
            <span
              key={f}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-container-low border border-outline-variant/10 text-xs text-on-surface-variant"
            >
              <FIcon className="w-3 h-3" strokeWidth={1.75} />
              {f}
            </span>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-3 border-t border-outline-variant/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <span className="text-xs text-on-surface-variant">
          Last run · {r.lastRun} · {r.lastFormat}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-wider uppercase hover:border-primary/40 transition-colors inline-flex items-center gap-1.5"
          >
            <Download className="w-3 h-3" strokeWidth={1.75} />
            Download
          </button>
          <button
            type="button"
            className="btn-primary px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            <Play className="w-3 h-3" strokeWidth={2.5} />
            Run now
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Page() {
  const { isEmptySimulated } = useSimulationStore()

  const visibleReports = isEmptySimulated ? [] : REPORTS
  const visibleExports = isEmptySimulated ? [] : RECENT_EXPORTS

  const stats = [
    {
      label: 'Generated (30d)',
      value: isEmptySimulated ? '0' : '32',
      icon: FileText,
      accent: 'text-primary',
    },
    {
      label: 'Last generated',
      value: isEmptySimulated ? '—' : '2 min ago',
      icon: Clock,
      accent: 'text-primary',
    },
    {
      label: 'Scheduled',
      value: isEmptySimulated ? '0' : '5',
      icon: Calendar,
      accent: 'text-primary',
    },
    {
      label: 'Exports',
      value: isEmptySimulated ? 'None' : 'CSV · PDF',
      icon: Download,
      accent: 'text-primary',
    },
  ]

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
            Reports
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Generate audit-ready reports for accountants, tax advisors, and
            finance leadership. Export to CSV or PDF, or schedule recurring
            deliveries.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-wider uppercase hover:border-primary/40 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
          Schedule report
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
            <div className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface truncate">
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Report templates */}
        <section
          aria-label="Report templates"
          className="xl:col-span-8 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">
              Templates
            </h2>
            {!isEmptySimulated && (
              <div
                role="tablist"
                aria-label="Report type"
                className="hidden md:flex items-center gap-1 p-1 rounded-lg bg-surface-container-low border border-outline-variant/10"
              >
                {['All', 'Scheduled', 'On demand'].map((f, i) => {
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
          </div>

          {visibleReports.length === 0 ? (
            <div className="bg-glass rounded-xl p-10 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-4 min-h-87.5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FileText className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-on-surface">
                  No report templates available
                </h3>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-1.5 leading-relaxed">
                  Create a custom report template to extract specific
                  transaction sub-sets, tax statements, or system logs.
                </p>
              </div>
              <button
                type="button"
                className="btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity mt-1"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                Create Template
              </button>
            </div>
          ) : (
            visibleReports.map((r) => <ReportCard key={r.id} r={r} />)
          )}
        </section>

        {/* Recent exports sidebar */}
        <aside className="xl:col-span-4">
          <section className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10 sticky top-20">
            <header className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <History className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="text-[16px] leading-6 font-semibold tracking-tight text-on-surface">
                  Recent exports
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Files generated in the last 30 days.
                </p>
              </div>
            </header>

            {visibleExports.length === 0 ? (
              <div className="py-8 text-center text-xs text-on-surface-variant border-t border-outline-variant/10">
                No recent exports. Generated files will appear here.
              </div>
            ) : (
              <ul className="flex flex-col">
                {visibleExports.map((e, i) => {
                  const FIcon = FORMAT_ICON[e.format]
                  return (
                    <li
                      key={i}
                      className="flex items-center gap-3 py-3 border-t border-outline-variant/10 first:border-t-0"
                    >
                      <div className="w-8 h-8 rounded-md bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0">
                        <FIcon className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-on-surface truncate">
                          {e.report}
                        </div>
                        <div className="text-xs text-on-surface-variant">
                          {e.format} · {e.size} · {e.when}
                        </div>
                      </div>
                      <a
                        href="#"
                        aria-label="Download"
                        className="text-on-surface-variant hover:text-primary transition-colors shrink-0"
                      >
                        <Download className="w-4 h-4" strokeWidth={1.75} />
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}

            <div className="mt-5 pt-5 border-t border-outline-variant/10">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <Sparkles
                  className="w-3.5 h-3.5 text-primary"
                  strokeWidth={2}
                />
                <span>
                  Need a custom report? Use Rules to filter what gets exported.
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import {
  Bell,
  Building2,
  Camera,
  CreditCard,
  Download,
  KeyRound,
  Mail,
  Plus,
  Receipt,
  ShieldCheck,
  Trash2,
  User,
  UserCog,
  Users,
} from 'lucide-react'

import PlaceholderPage, {
  makePageMetadata,
} from '@/components/dashboard/PlaceholderPage'
import { ReactNode } from 'react'
import SectionCard from '@/components/dashboard/settings/SectionCard'
import SectionHeading from '@/components/dashboard/settings/SectionHeading'
import Field from '@/components/dashboard/settings/Field'
import Toggle from '@/components/dashboard/settings/Toggle'

export const metadata: Metadata = {
  ...makePageMetadata('settings'),
  title: 'Settings | Onreco',
}

type Section = {
  id: string
  label: string
  icon: typeof Building2
  blurb: string
}

const SECTIONS: Section[] = [
  {
    id: 'profile',
    label: 'Your Profile',
    icon: User,
    blurb: 'Your name, email, and personal preferences.',
  },
  {
    id: 'organization',
    label: 'Organization',
    icon: Building2,
    blurb: 'Workspace name, default currency, and accounting preferences.',
  },
  {
    id: 'team',
    label: 'Team Members',
    icon: Users,
    blurb: 'Invite teammates and assign roles.',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    blurb: 'Choose what Onreco emails you about.',
  },
  {
    id: 'security',
    label: 'Security',
    icon: ShieldCheck,
    blurb: 'Two-factor auth, sessions, and API keys.',
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: CreditCard,
    blurb: 'Current plan, invoices, and payment method.',
  },
]

type TeamMember = {
  name: string
  email: string
  role: 'Owner' | 'Admin' | 'Accountant' | 'Viewer'
  lastActive: string
}

const TEAM: TeamMember[] = [
  {
    name: 'John Doe',
    email: 'john@acme.com',
    role: 'Owner',
    lastActive: 'Now',
  },
  {
    name: 'Sarah Chen',
    email: 'sarah@acme.com',
    role: 'Admin',
    lastActive: '12 min ago',
  },
  {
    name: 'Marcus Wright',
    email: 'marcus@acme.com',
    role: 'Accountant',
    lastActive: '2 hr ago',
  },
  {
    name: 'Aisha Patel',
    email: 'aisha@acme.com',
    role: 'Viewer',
    lastActive: 'Yesterday',
  },
]

const ROLE_STYLES: Record<TeamMember['role'], string> = {
  Owner: 'bg-primary/10 text-primary',
  Admin: 'bg-secondary/15 text-secondary',
  Accountant: 'bg-surface-container-high text-on-surface',
  Viewer: 'bg-surface-container-high text-on-surface-variant',
}

export default function Page() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Header */}
      <header>
        <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
          Settings
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Manage your workspace, team, and integrations. Changes save
          automatically.
        </p>
      </header>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Section nav rail (xl+) */}
        <aside className="hidden xl:block xl:col-span-3">
          <nav
            aria-label="Settings sections"
            className="sticky top-20 bg-glass rounded-xl p-3 glow-top border border-outline-variant/10"
          >
            <ul className="flex flex-col gap-1">
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                  >
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                    <span className="font-medium">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Sections */}
        <div className="xl:col-span-9 flex flex-col gap-6">
          {/* Your Profile */}
          <SectionCard id="profile">
            <SectionHeading
              icon={User}
              title="Your Profile"
              blurb="How you appear to teammates and in notifications."
            />

            {/* Avatar + identity row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6 pb-6 border-b border-outline-variant/10">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full bg-primary-container/30 border-2 border-primary-container/50 flex items-center justify-center text-primary text-xl font-bold">
                  JD
                </div>
                <button
                  type="button"
                  aria-label="Change avatar"
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-container border-2 border-surface-container-lowest text-on-primary-container flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Camera className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-on-surface">
                    John Doe
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-[0.05em] uppercase bg-primary/10 text-primary">
                    Owner
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1">
                  john@acme.com
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Member since September 2025 · Acme Corp
                </p>
              </div>
            </div>

            {/* Editable fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Field label="Full Name" value="John Doe" />
              <Field
                label="Email"
                hint="Used for sign-in and notifications."
                value="john@acme.com"
              />
              <Field
                label="Display Name"
                hint="Shown to teammates in lists and comments. Leave blank to use your full name."
                value=""
                placeholder="JD"
              />
              <Field
                label="Role Title"
                hint="Optional. Shown alongside your name across the app."
                value=""
                placeholder="Founder · CEO"
              />
            </div>

            {/* Personal preferences */}
            <div className="pt-5 border-t border-outline-variant/10">
              <h3 className="text-sm font-semibold text-on-surface mb-3">
                Preferences
              </h3>
              <div>
                <Toggle
                  label="Show my activity to teammates"
                  description="When enabled, teammates can see which transactions you've categorized and which rules you've created."
                  defaultChecked
                />
                <Toggle
                  label="Compact tables"
                  description="Reduces row padding in transactions, wallets, and reports tables for higher information density."
                />
                <Toggle
                  label="Use 24-hour time"
                  description="Affects timestamps throughout the dashboard."
                />
              </div>
            </div>
          </SectionCard>

          {/* Organization */}
          <SectionCard id="organization">
            <SectionHeading
              icon={Building2}
              title="Organization"
              blurb="Workspace identity and accounting preferences."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Workspace Name" value="Acme Corp" />
              <Field label="Default Currency" value="USD" suffix="USD" />
              <Field label="Fiscal Year Start" value="January 1" />
              <Field label="Time Zone" value="America/New_York" />
            </div>

            <div className="mt-6 pt-5 border-t border-outline-variant/10">
              <h3 className="text-sm font-semibold text-on-surface mb-3">
                Stablecoin Defaults
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Default Asset" value="USDT" />
                <Field
                  label="Dust Threshold"
                  hint="Transactions under this amount are flagged for manual review."
                  value="$0.50"
                />
              </div>
            </div>
          </SectionCard>

          {/* Team */}
          <SectionCard id="team">
            <SectionHeading
              icon={Users}
              title="Team Members"
              blurb="Invite teammates and assign roles."
            />
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-on-surface-variant">
                {TEAM.length} members · 3 seats remaining
              </span>
              <button
                type="button"
                className="btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-[0.05em] uppercase hover:opacity-90 transition-opacity"
              >
                <Plus className="w-3 h-3" strokeWidth={2.5} />
                Invite
              </button>
            </div>
            <ul className="flex flex-col">
              {TEAM.map((m, i) => (
                <li
                  key={m.email}
                  className="flex items-center gap-3 py-3 border-t border-outline-variant/10 first:border-t-0"
                >
                  <div className="w-9 h-9 rounded-full bg-primary-container/30 border border-primary-container/50 flex items-center justify-center text-primary text-xs font-semibold shrink-0">
                    {m.name
                      .split(' ')
                      .map((p) => p[0])
                      .join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-on-surface truncate">
                      {m.name}
                    </div>
                    <div className="text-xs text-on-surface-variant truncate">
                      {m.email}
                    </div>
                  </div>
                  <span
                    className={
                      'hidden sm:inline-flex items-center px-2 py-1 rounded text-[10px] font-semibold tracking-[0.05em] uppercase ' +
                      ROLE_STYLES[m.role]
                    }
                  >
                    {m.role}
                  </span>
                  <span className="hidden md:inline text-xs text-on-surface-variant w-24 text-right">
                    {m.lastActive}
                  </span>
                  <button
                    type="button"
                    aria-label="Manage member"
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors shrink-0"
                  >
                    <UserCog className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                  {i !== 0 && (
                    <button
                      type="button"
                      aria-label="Remove member"
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-tertiary hover:bg-tertiary-container/10 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.75} />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Notifications */}
          <SectionCard id="notifications">
            <SectionHeading
              icon={Bell}
              title="Notifications"
              blurb="Choose what Onreco emails you about."
            />
            <div>
              <Toggle
                label="Reconciliation needs review"
                description="When a transaction can't be auto-matched or has low confidence."
                defaultChecked
              />
              <Toggle
                label="Sync failures"
                description="When an integration sync fails or returns an error."
                defaultChecked
              />
              <Toggle
                label="Large inflows"
                description="When a single incoming transaction exceeds $10,000."
                defaultChecked
              />
              <Toggle
                label="Weekly summary"
                description="A Monday-morning digest of categorized transactions, syncs, and rule activity."
              />
              <Toggle
                label="Product updates"
                description="New features, integrations, and important changes."
              />
            </div>
          </SectionCard>

          {/* Security */}
          <SectionCard id="security">
            <SectionHeading
              icon={ShieldCheck}
              title="Security"
              blurb="Two-factor authentication, sessions, and API keys."
            />

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-surface-container-low border border-outline-variant/10">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <KeyRound className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-on-surface">
                      Two-Factor Authentication
                    </div>
                    <div className="text-xs text-on-surface-variant mt-1">
                      Required for all team members. Authenticator app or SMS.
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold tracking-[0.05em] uppercase bg-primary/10 text-primary shrink-0">
                  Enabled
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-surface-container-low border border-outline-variant/10">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-on-surface">
                      Active Sessions
                    </div>
                    <div className="text-xs text-on-surface-variant mt-1">
                      2 devices · Last activity 2 min ago
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-[0.05em] uppercase hover:border-primary/40 transition-colors shrink-0"
                >
                  Manage
                </button>
              </div>

              <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-surface-container-low border border-outline-variant/10">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <KeyRound className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-on-surface">
                      API Keys
                    </div>
                    <div className="text-xs text-on-surface-variant mt-1">
                      Programmatic access to your stablecoin accounting data.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-primary px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-[0.05em] uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-3 h-3" strokeWidth={2.5} />
                  Create Key
                </button>
              </div>
            </div>

            {/* Danger zone */}
            <div className="mt-6 pt-5 border-t border-outline-variant/10">
              <h3 className="text-sm font-semibold text-tertiary mb-3">
                Danger Zone
              </h3>
              <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-tertiary-container/10 border border-tertiary-container/30">
                <div>
                  <div className="text-sm font-semibold text-on-surface">
                    Delete workspace
                  </div>
                  <div className="text-xs text-on-surface-variant mt-1">
                    Permanently delete all transactions, wallets, rules, and
                    integrations. This cannot be undone.
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg border border-tertiary/40 text-tertiary text-xs font-semibold tracking-[0.05em] uppercase hover:bg-tertiary/10 transition-colors shrink-0"
                >
                  Delete
                </button>
              </div>
            </div>
          </SectionCard>

          {/* Billing */}
          <SectionCard id="billing">
            <SectionHeading
              icon={CreditCard}
              title="Billing"
              blurb="Current plan, payment method, and invoices."
            />

            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Plan card */}
              <div className="flex-1 rounded-xl bg-surface-container-low border border-primary/20 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                    Current Plan
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-[0.05em] uppercase bg-primary/15 text-primary">
                    Growth
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
                    $149
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    / month
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-2">
                  Up to 10 wallets · 5 team seats · Unlimited transactions.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn-primary px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-[0.05em] uppercase hover:opacity-90 transition-opacity"
                  >
                    Upgrade
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-[0.05em] uppercase hover:border-primary/40 transition-colors"
                  >
                    Manage plan
                  </button>
                </div>
              </div>

              {/* Payment method */}
              <div className="flex-1 rounded-xl bg-surface-container-low border border-outline-variant/10 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                    Payment Method
                  </span>
                  <CreditCard
                    className="w-4 h-4 text-on-surface-variant"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-primary-container/30 border border-primary/30 flex items-center justify-center text-primary text-[10px] font-bold tracking-wider">
                    VISA
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-on-surface font-mono">
                      •••• •••• •••• 4242
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      Expires 04 / 28
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-4 px-3 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-[0.05em] uppercase hover:border-primary/40 transition-colors"
                >
                  Update card
                </button>
              </div>
            </div>

            {/* Recent invoices */}
            <div className="pt-5 border-t border-outline-variant/10">
              <h3 className="text-sm font-semibold text-on-surface mb-3">
                Recent Invoices
              </h3>
              <ul className="flex flex-col">
                {[
                  { date: 'Oct 1, 2025', amount: '$149.00', status: 'Paid' },
                  { date: 'Sep 1, 2025', amount: '$149.00', status: 'Paid' },
                  { date: 'Aug 1, 2025', amount: '$149.00', status: 'Paid' },
                ].map((inv) => (
                  <li
                    key={inv.date}
                    className="flex items-center gap-3 py-3 border-t border-outline-variant/10 first:border-t-0"
                  >
                    <Receipt
                      className="w-4 h-4 text-on-surface-variant shrink-0"
                      strokeWidth={1.75}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-on-surface">
                        {inv.date}
                      </div>
                    </div>
                    <span className="text-sm font-mono text-on-surface">
                      {inv.amount}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-semibold tracking-[0.05em] uppercase bg-primary/10 text-primary">
                      {inv.status}
                    </span>
                    <a
                      href="#"
                      aria-label="Download invoice"
                      className="text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <Download className="w-4 h-4" strokeWidth={1.75} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}

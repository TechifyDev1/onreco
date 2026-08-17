import type { Metadata } from 'next';
import { HelpCircle, ShieldCheck, User } from 'lucide-react';

import EmailVerificationSection from '@/components/dashboard/settings/EmailVerificationSection';
import SupportSection from '@/components/dashboard/settings/SupportSection';
import UserProfileSection from '@/components/dashboard/settings/UserProfileSection';

export const metadata: Metadata = {
   title: 'Settings | Onreco',
};

export default function Page() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <header>
        <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
          Settings
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Manage your profile, workspace, team, and integrations.
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Section nav rail (xl+) */}
        <aside className="hidden xl:block xl:col-span-3">
          <nav
            aria-label="Settings sections"
            className="sticky top-20 bg-glass rounded-xl p-3 glow-top border border-outline-variant/10"
          >
            <ul className="flex flex-col gap-1">
              <li>
                <a
                  href="#profile"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                >
                  <User className="w-4.5 h-4.5" strokeWidth={1.75} />
                  <span className="font-medium">Your Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="#verification"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                >
                  <ShieldCheck className="w-4.5 h-4.5" strokeWidth={1.75} />
                  <span className="font-medium">Email Verification</span>
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                >
                  <HelpCircle className="w-4.5 h-4.5" strokeWidth={1.75} />
                  <span className="font-medium">Support</span>
                </a>
              </li>
              {/* TODO: uncomment when sections are ready
              <li>
                <a href="#organization" className="...">
                  <Building2 ... /> Organization
                </a>
              </li>
              <li>
                <a href="#team" className="...">
                  <Users ... /> Team Members
                </a>
              </li>
              <li>
                <a href="#notifications" className="...">
                  <Bell ... /> Notifications
                </a>
              </li>
              <li>
                <a href="#security" className="...">
                  <ShieldCheck ... /> Security
                </a>
              </li>
              <li>
                <a href="#billing" className="...">
                  <CreditCard ... /> Billing
                </a>
              </li>
              */}
            </ul>
          </nav>
        </aside>

        {/* Sections */}
        <div className="xl:col-span-9 flex flex-col gap-6">
          <UserProfileSection />
          <EmailVerificationSection />
          <SupportSection />

          {/* TODO: uncomment when sections are ready
          <SectionCard id="organization">
            <SectionHeading icon={Building2} title="Organization" blurb="Workspace identity and accounting preferences." />
            ... organization fields ...
          </SectionCard>

          <SectionCard id="team">
            <SectionHeading icon={Users} title="Team Members" blurb="Invite teammates and assign roles." />
            ... team members list ...
          </SectionCard>

          <SectionCard id="notifications">
            <SectionHeading icon={Bell} title="Notifications" blurb="Choose what Onreco emails you about." />
            ... notification toggles ...
          </SectionCard>

          <SectionCard id="security">
            <SectionHeading icon={ShieldCheck} title="Security" blurb="Two-factor authentication, sessions, and API keys." />
            ... security options + danger zone ...
          </SectionCard>

          <SectionCard id="billing">
            <SectionHeading icon={CreditCard} title="Billing" blurb="Current plan, payment method, and invoices." />
            ... plan card, payment method, invoices ...
          </SectionCard>
          */}
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import RulesClientShell from '@/components/dashboard/rules/RulesClientShell';

export const metadata: Metadata = {
   title: 'Rules · Onreco',
   description:
      'Automate how Onreco categorizes and routes stablecoin transactions before they sync to QuickBooks.',
   robots: {
      index: false,
      follow: false,
   },
};

export default function RulesPage() {
   return (
      <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
         <RulesClientShell />
      </div>
   );
}

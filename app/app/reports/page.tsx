import { Construction } from 'lucide-react';

export const metadata = {
   title: 'Reports · Onreco',
   description: 'Audit-ready reports for accountants, tax advisors, and finance leadership.',
};

export default function ReportsPage() {
   return (
      <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
         <header>
            <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
               Reports
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
               Generate audit-ready reports for accountants, tax advisors, and
               finance leadership.
            </p>
         </header>

         <div className="bg-glass rounded-xl p-10 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-4 min-h-[28rem]">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
               <Construction className="w-7 h-7" strokeWidth={1.75} />
            </div>
            <div>
               <h2 className="text-lg font-semibold text-on-surface">Coming Soon</h2>
               <p className="text-sm text-on-surface-variant max-w-md mx-auto mt-2 leading-relaxed">
                  We&apos;re building exportable reports with CSV, PDF, and XLSX support — including
                  monthly activity summaries, categorization breakdowns, reconciliation audits,
                  and tax-ready transaction logs. Stay tuned.
               </p>
            </div>
         </div>
      </div>
   );
}

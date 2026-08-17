import type { Metadata } from 'next';
import ReportsClient from './ReportsClient';
import ReportsService from '@/services/ReportsService';
import { ApiError } from '@/services/ApiError';
import { DEFAULT_REPORTS, ReportTypeDescriptor } from '../_data/reports';

export const metadata: Metadata = {
   title: 'Reports - Onreco',
};

export default async function ReportsPage() {
   let reports: ReportTypeDescriptor[] = DEFAULT_REPORTS;
   try {
      reports = await ReportsService.getReportTypes();
   } catch (error) {
      if (error instanceof ApiError) {
         console.error('[ReportsPage] Failed to fetch report types:', error.message);
      } else {
         console.error('[ReportsPage] Failed to fetch report types:', error);
      }
   }

   return (
      <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
         <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
               <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">Reports</h1>
               <p className="text-sm text-on-surface-variant mt-1">Generate audit-ready reports for accountants, tax advisors, and finance leadership.</p>
            </div>
         </header>

         <ReportsClient reports={reports} />
      </div>
   );
}

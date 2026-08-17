'use client';

import { useState } from 'react';
import { BarChart3, Calendar, FileSpreadsheet, FileText, Table2, type LucideIcon } from 'lucide-react';
import ReportsService from '@/services/ReportsService';
import { FORMAT_LABELS, ReportFormat, ReportTypeDescriptor } from '@/app/app/_data/reports';

const FORMAT_ICONS: Record<ReportFormat, LucideIcon> = {
   CSV: Table2,
   XLSX: FileSpreadsheet,
   PDF: FileText,
};

function currentMonth(): string {
   const now = new Date();
   return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function monthRange(month: string): { from: string; to: string } {
   const [year, mon] = month.split('-').map(Number);
   const from = new Date(Date.UTC(year, mon - 1, 1));
   const to = new Date(Date.UTC(year, mon, 0));
   const iso = (date: Date) => date.toISOString().slice(0, 10);
   return { from: iso(from), to: iso(to) };
}

function formatMonthLabel(month: string): string {
   const [year, mon] = month.split('-').map(Number);
   return new Date(Date.UTC(year, mon - 1, 1)).toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
   });
}

export default function ReportsClient({ reports }: { reports: ReportTypeDescriptor[] }) {
   const [month, setMonth] = useState(currentMonth);
   const maxMonth = currentMonth();
   const { from, to } = monthRange(month);

   return (
      <div className="flex flex-col gap-4">
         <div className="flex flex-wrap items-center gap-3 bg-glass rounded-xl border border-outline-variant/10 glow-top px-4 py-3">
            <label htmlFor="report-period" className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
               <Calendar className="w-4 h-4" strokeWidth={1.75} />
               Period
            </label>
            <input
               id="report-period"
               type="month"
               value={month}
               max={maxMonth}
               onChange={(event) => setMonth(event.target.value)}
               className="bg-surface-container-low border border-outline-variant/20 rounded-lg px-3 py-1.5 text-xs text-on-surface outline-none focus:border-primary/40 [color-scheme:dark]"
            />
            <span className="text-xs text-on-surface-variant ml-auto">Reports include transactions for {formatMonthLabel(month)}.</span>
         </div>

         {reports.length === 0 ? (
            <div className="bg-glass rounded-xl p-10 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-4 min-h-[20rem]">
               <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                  <BarChart3 className="w-6 h-6" strokeWidth={1.75} />
               </div>
               <div>
                  <h2 className="text-base font-semibold text-on-surface">No reports available</h2>
                  <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">No report types are configured. Please try again later.</p>
               </div>
            </div>
         ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
               {reports.map((report) => {
                  const Icon = report.formats.length > 0 ? FORMAT_ICONS[report.formats[0]] : BarChart3;
                  return (
                     <article key={report.type} className="bg-glass rounded-xl border border-outline-variant/10 glow-top p-5 flex flex-col gap-4">
                        <div className="flex items-start justify-between gap-3">
                           <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                              <Icon className="w-5 h-5" strokeWidth={1.75} />
                           </div>
                           <span className="inline-block px-2 py-1 rounded text-[10px] font-semibold tracking-[0.08em] uppercase bg-surface-container-low border border-outline-variant/20 text-on-surface-variant">
                              {report.cadence}
                           </span>
                        </div>

                        <div>
                           <h2 className="text-base font-semibold text-on-surface leading-snug">{report.name}</h2>
                           <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">{report.blurb}</p>
                        </div>

                        <div className="mt-auto flex flex-wrap gap-2">
                           {report.formats.map((format, index) => {
                              const FormatIcon = FORMAT_ICONS[format];
                              const href = ReportsService.getReportUrl(report.type, format, from, to);
                              const className =
                                 index === 0
                                    ? 'btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity'
                                    : 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant text-xs font-semibold tracking-wider uppercase border border-outline-variant/20 hover:bg-surface-container-low/50 hover:text-on-surface transition-colors';
                              return (
                                 <a key={format} href={href} className={className}>
                                    <FormatIcon className="w-3.5 h-3.5" strokeWidth={2} />
                                    {FORMAT_LABELS[format]}
                                 </a>
                              );
                           })}
                        </div>
                     </article>
                  );
               })}
            </div>
         )}
      </div>
   );
}

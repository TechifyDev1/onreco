export type ReportType = 'STABLECOIN_ACTIVITY' | 'CATEGORIZATION_SUMMARY' | 'TAX_LOG';
export type ReportFormat = 'CSV' | 'XLSX' | 'PDF';
export type ReportCadence = 'Monthly' | 'Quarterly';

export type ReportTypeDescriptor = {
   type: ReportType;
   name: string;
   blurb: string;
   formats: ReportFormat[];
   cadence: ReportCadence;
};

export const DEFAULT_REPORTS: ReportTypeDescriptor[] = [
   {
      type: 'STABLECOIN_ACTIVITY',
      name: 'Monthly Stablecoin Activity',
      blurb: 'All USDT and USDC transactions for the period, with categorization, direction, and counterparty.',
      formats: ['CSV', 'PDF', 'XLSX'],
      cadence: 'Monthly',
   },
   {
      type: 'CATEGORIZATION_SUMMARY',
      name: 'Categorization Summary',
      blurb: 'Aggregate counts and totals by category. Useful for finance reviews and budget reconciliation.',
      formats: ['CSV', 'PDF', 'XLSX'],
      cadence: 'Monthly',
   },
   {
      type: 'TAX_LOG',
      name: 'Tax-ready Transaction Log',
      blurb: 'Pre-formatted transaction log with cost basis and fiat equivalent for tax filing.',
      formats: ['CSV', 'PDF'],
      cadence: 'Monthly',
   },
];

export const FORMAT_LABELS: Record<ReportFormat, string> = {
   CSV: 'CSV',
   XLSX: 'Excel',
   PDF: 'PDF',
};

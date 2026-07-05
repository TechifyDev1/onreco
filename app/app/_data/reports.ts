export type ReportFormat = "CSV" | "PDF" | "XLSX";
export type ReportCadence = "On demand" | "Monthly" | "Weekly" | "Quarterly";

export type Report = {
    id: string;
    name: string;
    blurb: string;
    formats: ReportFormat[];
    cadence: ReportCadence;
    lastRun: string;
    lastFormat: ReportFormat;
};

export const REPORTS: Report[] = [
    {
        id: "r1",
        name: "Monthly Stablecoin Activity",
        blurb: "All USDT and USDC transactions for the period, with categorization, direction, and counterparty.",
        formats: ["CSV", "PDF", "XLSX"],
        cadence: "Monthly",
        lastRun: "Oct 1, 2025",
        lastFormat: "PDF",
    },
    {
        id: "r2",
        name: "Categorization Summary",
        blurb: "Aggregate counts and totals by category. Useful for finance reviews and budget reconciliation.",
        formats: ["CSV", "XLSX"],
        cadence: "Monthly",
        lastRun: "Oct 1, 2025",
        lastFormat: "CSV",
    },
    {
        id: "r3",
        name: "Reconciliation Report",
        blurb: "Every matched, unmatched, and rejected invoice-to-payment pairing with confidence scores.",
        formats: ["CSV", "PDF"],
        cadence: "On demand",
        lastRun: "Sep 28, 2025",
        lastFormat: "CSV",
    },
    {
        id: "r4",
        name: "Audit Trail Export",
        blurb: "Full on-chain audit log: every rule trigger, manual override, and sync event with timestamps.",
        formats: ["CSV", "PDF"],
        cadence: "On demand",
        lastRun: "Sep 25, 2025",
        lastFormat: "PDF",
    },
    {
        id: "r5",
        name: "Tax-ready Transaction Log",
        blurb: "Pre-formatted transaction log with cost basis and fiat equivalent for tax filing.",
        formats: ["CSV", "PDF"],
        cadence: "Quarterly",
        lastRun: "Sep 30, 2025",
        lastFormat: "PDF",
    },
];

export const RECENT_EXPORTS: {
    report: string;
    format: ReportFormat;
    when: string;
    size: string;
}[] = [
    { report: "Monthly Stablecoin Activity", format: "PDF", when: "2 min ago", size: "184 KB" },
    { report: "Categorization Summary", format: "CSV", when: "18 min ago", size: "12 KB" },
    { report: "Reconciliation Report", format: "CSV", when: "1 hr ago", size: "47 KB" },
    { report: "Audit Trail Export", format: "PDF", when: "Yesterday", size: "612 KB" },
    { report: "Tax-ready Transaction Log", format: "PDF", when: "3 days ago", size: "1.2 MB" },
];

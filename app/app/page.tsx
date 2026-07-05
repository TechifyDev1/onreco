import type { Metadata } from "next";

import ActivityChart from "@/components/dashboard/ActivityChart";
import QuickBooksPanel from "@/components/dashboard/QuickBooksPanel";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import StatsRow from "@/components/dashboard/StatsRow";
import WalletsPanel from "@/components/dashboard/WalletsPanel";

export const metadata: Metadata = {
    title: "Dashboard | Onreco Stablecoin Accounting",
    description:
        "Monitor USDT and USDC transactions, reconciliation status, and QuickBooks or Xero sync in one place.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6 md:gap-8">
            {/* Page header */}
            <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                <div>
                    <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
                        Dashboard
                    </h1>
                    <p className="text-sm text-on-surface-variant mt-1">
                        Your stablecoin accounting, reconciliation, and QuickBooks or
                        Xero sync at a glance.
                    </p>
                </div>
                <div className="text-xs text-on-surface-variant">
                    {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            </header>

            {/* KPI row */}
            <StatsRow />

            {/* Chart + side panel grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <ActivityChart />
                </div>
                <div>
                    <QuickBooksPanel />
                </div>
            </div>

            {/* Transactions + wallets grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <RecentTransactions />
                </div>
                <div>
                    <WalletsPanel />
                </div>
            </div>
        </div>
    );
}

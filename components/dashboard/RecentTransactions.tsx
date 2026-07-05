"use client";

import { ArrowDownLeft, ArrowUpRight, ExternalLink, Inbox } from "lucide-react";
import { useSimulationStore } from "@/providers/simulation-store";

type TxStatus = "Synced" | "Pending" | "Reconciled" | "Needs Review";

type Tx = {
    id: string;
    type: "in" | "out";
    asset: "USDT" | "USDC";
    amount: string;
    usd: string;
    counterparty: string;
    hash: string;
    time: string;
    category: string;
    status: TxStatus;
};

const TXS: Tx[] = [
    {
        id: "tx_01",
        type: "in",
        asset: "USDT",
        amount: "12,500.00",
        usd: "$12,500.00",
        counterparty: "0x9a2c…f31e",
        hash: "0x7a8b…c9d0",
        time: "2 min ago",
        category: "Customer Payment",
        status: "Reconciled",
    },
    {
        id: "tx_02",
        type: "out",
        asset: "USDC",
        amount: "1,240.50",
        usd: "$1,240.50",
        counterparty: "0x14ad…88b2",
        hash: "0x4f12…7e9c",
        time: "18 min ago",
        category: "Vendor Payout",
        status: "Synced",
    },
    {
        id: "tx_03",
        type: "in",
        asset: "USDT",
        amount: "8,000.00",
        usd: "$8,000.00",
        counterparty: "0x77fe…2c01",
        hash: "0x2bd5…af83",
        time: "1 hr ago",
        category: "Customer Payment",
        status: "Pending",
    },
    {
        id: "tx_04",
        type: "out",
        asset: "USDT",
        amount: "320.00",
        usd: "$320.00",
        counterparty: "0xa1d3…9e44",
        hash: "0x9c40…1b27",
        time: "3 hr ago",
        category: "Operating Expense",
        status: "Needs Review",
    },
    {
        id: "tx_05",
        type: "in",
        asset: "USDC",
        amount: "22,400.00",
        usd: "$22,400.00",
        counterparty: "0x3bc1…07de",
        hash: "0xee15…34aa",
        time: "Yesterday",
        category: "Customer Payment",
        status: "Reconciled",
    },
];

const STATUS_STYLES: Record<TxStatus, string> = {
    Synced: "bg-primary/10 text-primary",
    Pending: "bg-secondary/15 text-secondary",
    Reconciled: "bg-primary/10 text-primary",
    "Needs Review": "bg-tertiary-container/20 text-tertiary",
};

function shortHash(h: string) {
    return h;
}

export default function RecentTransactions() {
    const { isEmptySimulated } = useSimulationStore();
    const visibleTxs = isEmptySimulated ? [] : TXS;

    return (
        <section
            aria-label="Recent transactions"
            className="bg-glass rounded-xl border border-outline-variant/10 glow-top overflow-hidden animate-fade-in"
        >
            <header className="flex items-center justify-between p-6 border-b border-outline-variant/10">
                <div>
                    <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">
                        Recent Transactions
                    </h2>
                    <p className="text-sm text-on-surface-variant mt-1">
                        Latest USDT and USDC activity across connected wallets.
                    </p>
                </div>
                {!isEmptySimulated && (
                    <a
                        href="/app/transactions"
                        className="text-xs font-semibold tracking-[0.05em] uppercase text-primary hover:underline"
                    >
                        View all
                    </a>
                )}
            </header>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                            <th className="px-6 py-3 font-semibold">Type</th>
                            <th className="px-6 py-3 font-semibold">Asset</th>
                            <th className="px-6 py-3 font-semibold">Amount</th>
                            <th className="px-6 py-3 font-semibold">USD</th>
                            <th className="px-6 py-3 font-semibold hidden md:table-cell">
                                Category
                            </th>
                            <th className="px-6 py-3 font-semibold hidden lg:table-cell">
                                Counterparty
                            </th>
                            <th className="px-6 py-3 font-semibold">Status</th>
                            <th className="px-6 py-3 font-semibold hidden md:table-cell">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleTxs.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                                            <Inbox className="w-5 h-5" strokeWidth={1.75} />
                                        </div>
                                        <p className="text-sm font-semibold text-on-surface">No recent transactions</p>
                                        <p className="text-xs text-on-surface-variant">
                                            Connect a wallet or import manual entries to see transaction data here.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            visibleTxs.map((tx) => {
                                const isIn = tx.type === "in";
                                return (
                                    <tr
                                        key={tx.id}
                                        className="border-t border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div
                                                className={
                                                    "w-8 h-8 rounded-lg flex items-center justify-center " +
                                                    (isIn
                                                        ? "bg-primary/10 text-primary"
                                                        : "bg-secondary/15 text-secondary")
                                                }
                                            >
                                                {isIn ? (
                                                    <ArrowDownLeft
                                                        className="w-4 h-4"
                                                        strokeWidth={2}
                                                    />
                                                ) : (
                                                    <ArrowUpRight
                                                        className="w-4 h-4"
                                                        strokeWidth={2}
                                                    />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-on-surface">
                                            {tx.asset}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-on-surface">
                                            {tx.amount}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-on-surface">
                                            {tx.usd}
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell text-on-surface-variant">
                                            {tx.category}
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell font-mono text-xs text-on-surface-variant">
                                            <a
                                                href="#"
                                                className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                                                title={tx.hash}
                                            >
                                                {shortHash(tx.counterparty)}
                                                <ExternalLink
                                                    className="w-3 h-3"
                                                    strokeWidth={1.75}
                                                />
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={
                                                    "inline-block px-2 py-1 rounded text-[10px] font-semibold tracking-[0.05em] uppercase " +
                                                    STATUS_STYLES[tx.status]
                                                }
                                            >
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell text-xs text-on-surface-variant">
                                            {tx.time}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}


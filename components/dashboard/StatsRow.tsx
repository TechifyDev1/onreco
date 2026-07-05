"use client";

import {
    ArrowDownLeft,
    ArrowUpRight,
    CheckCircle2,
    RefreshCw,
    TrendingUp,
} from "lucide-react";
import { useSimulationStore } from "@/providers/simulation-store";

const STATS = [
    {
        id: "inflow",
        label: "Inflow (30d)",
        value: "$184,250.00",
        emptyValue: "$0.00",
        delta: "+12.4%",
        emptyDelta: "0.0%",
        deltaPositive: true,
        icon: ArrowDownLeft,
        accent: "text-primary",
    },
    {
        id: "outflow",
        label: "Outflow (30d)",
        value: "$62,930.50",
        emptyValue: "$0.00",
        delta: "-3.1%",
        emptyDelta: "0.0%",
        deltaPositive: true,
        icon: ArrowUpRight,
        accent: "text-secondary",
    },
    {
        id: "recon",
        label: "Reconciliation Rate",
        value: "98.6%",
        emptyValue: "0.0%",
        delta: "+0.4%",
        emptyDelta: "0.0%",
        deltaPositive: true,
        icon: CheckCircle2,
        accent: "text-primary",
    },
    {
        id: "sync",
        label: "Pending Sync",
        value: "7",
        emptyValue: "0",
        delta: "Ready to push",
        emptyDelta: "No entries",
        deltaPositive: true,
        icon: RefreshCw,
        accent: "text-secondary",
    },
];

export default function StatsRow() {
    const { isEmptySimulated } = useSimulationStore();

    return (
        <section
            aria-label="Key metrics"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
            {STATS.map(({ label, value, emptyValue, delta, emptyDelta, deltaPositive, icon: Icon, accent }) => (
                <div
                    key={label}
                    className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10"
                >
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                            {label}
                        </span>
                        <div
                            className={`w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center ${accent}`}
                        >
                            <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface">
                            {isEmptySimulated ? emptyValue : value}
                        </span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-on-surface-variant">
                        <TrendingUp
                            className={
                                "w-3.5 h-3.5 " +
                                (isEmptySimulated
                                    ? "text-on-surface-variant/40"
                                    : deltaPositive
                                    ? "text-primary"
                                    : "text-secondary")
                            }
                            strokeWidth={2}
                        />
                        <span
                            className={
                                isEmptySimulated
                                    ? "text-on-surface-variant/60 font-medium"
                                    : deltaPositive
                                    ? "text-primary font-medium"
                                    : "text-secondary font-medium"
                            }
                        >
                            {isEmptySimulated ? emptyDelta : delta}
                        </span>
                    </div>
                </div>
            ))}
        </section>
    );
}


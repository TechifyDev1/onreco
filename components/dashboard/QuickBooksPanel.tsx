"use client";

import { CheckCircle2, ExternalLink, RefreshCw, XCircle } from "lucide-react";
import { useSimulationStore } from "@/providers/simulation-store";

export default function QuickBooksPanel() {
    const { isEmptySimulated } = useSimulationStore();

    return (
        <section
            aria-label="QuickBooks integration"
            className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10"
        >
            <header className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-base">
                    QB
                </div>
                <div className="flex-1">
                    <h2 className="text-[16px] leading-6 font-semibold tracking-tight text-on-surface">
                        QuickBooks Online
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                        {isEmptySimulated ? "No ledger connected" : "Connected · Acme Corp Ledger"}
                    </p>
                </div>
                {isEmptySimulated ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold tracking-[0.05em] uppercase bg-surface-container-high text-on-surface-variant">
                        <XCircle className="w-3 h-3" strokeWidth={2.5} />
                        Disconnected
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-semibold tracking-[0.05em] uppercase bg-primary/10 text-primary">
                        <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
                        Connected
                    </span>
                )}
            </header>

            <dl className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <dt className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                        Last Sync
                    </dt>
                    <dd className="text-sm font-mono text-on-surface mt-1">
                        {isEmptySimulated ? "—" : "2 min ago"}
                    </dd>
                </div>
                <div>
                    <dt className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                        Pushed (30d)
                    </dt>
                    <dd className="text-sm font-mono text-on-surface mt-1">
                        {isEmptySimulated ? "0 entries" : "142 entries"}
                    </dd>
                </div>
                <div>
                    <dt className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                        Chart of Accounts
                    </dt>
                    <dd className="text-sm text-on-surface mt-1">
                        {isEmptySimulated ? "—" : "Stablecoin · USDT/USDC"}
                    </dd>
                </div>
                <div>
                    <dt className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                        Reconciliation
                    </dt>
                    <dd className="text-sm text-on-surface mt-1">
                        {isEmptySimulated ? "—" : "Auto · 98.6%"}
                    </dd>
                </div>
            </dl>

            <div className="flex gap-2">
                {isEmptySimulated ? (
                    <button
                        type="button"
                        className="btn-primary flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-[0.05em] uppercase hover:opacity-90 transition-opacity"
                    >
                        Connect QuickBooks
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            className="btn-primary flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-[0.05em] uppercase hover:opacity-90 transition-opacity"
                        >
                            <RefreshCw className="w-3.5 h-3.5" strokeWidth={2} />
                            Sync Now
                        </button>
                        <a
                            href="#"
                            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-colors text-xs font-semibold tracking-[0.05em] uppercase"
                        >
                            Open
                            <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </a>
                    </>
                )}
            </div>
        </section>
    );
}


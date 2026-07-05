"use client";

import { Copy, Wallet2, Plus } from "lucide-react";
import { useSimulationStore } from "@/providers/simulation-store";

type Wallet = {
    id: string;
    label: string;
    address: string;
    network: "Tron" | "Ethereum" | "Solana" | "Base";
    assets: string[];
    status: "Monitoring" | "Paused";
};

const WALLETS: Wallet[] = [
    {
        id: "w_01",
        label: "Treasury Main",
        address: "0x9a2c…f31e",
        network: "Ethereum",
        assets: ["USDT", "USDC"],
        status: "Monitoring",
    },
    {
        id: "w_02",
        label: "Payables",
        address: "TX7nQ…aB2k",
        network: "Tron",
        assets: ["USDT"],
        status: "Monitoring",
    },
    {
        id: "w_03",
        label: "Customer Inflows",
        address: "0x14ad…88b2",
        network: "Base",
        assets: ["USDC"],
        status: "Monitoring",
    },
    {
        id: "w_04",
        label: "Legacy",
        address: "7xK9p…3mQ",
        network: "Solana",
        assets: ["USDC"],
        status: "Paused",
    },
];

export default function WalletsPanel() {
    const { isEmptySimulated } = useSimulationStore();
    const visibleWallets = isEmptySimulated ? [] : WALLETS;

    return (
        <section
            aria-label="Connected wallets"
            className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10 flex flex-col h-full"
        >
            <header className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-[16px] leading-6 font-semibold tracking-tight text-on-surface">
                        Connected Wallets
                    </h2>
                    <p className="text-xs text-on-surface-variant mt-1">
                        {visibleWallets.filter((w) => w.status === "Monitoring").length}{" "}
                        monitoring &middot; read-only
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface hover:border-primary/40 transition-colors text-xs font-semibold tracking-[0.05em] uppercase"
                >
                    <Wallet2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                    Add
                </button>
            </header>

            {visibleWallets.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-surface-container-low/20 rounded-lg border border-dashed border-outline-variant/10 min-h-[220px]">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                        <Wallet2 className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <p className="text-sm font-semibold text-on-surface">No connected wallets</p>
                    <p className="text-xs text-on-surface-variant max-w-xs mt-1">
                        Connect read-only wallets to track and reconcile stablecoins.
                    </p>
                </div>
            ) : (
                <ul className="flex flex-col divide-y divide-outline-variant/10">
                    {visibleWallets.map((w) => (
                        <li
                            key={w.id}
                            className="py-3 first:pt-0 last:pb-0 flex items-center gap-3"
                        >
                            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <Wallet2 className="w-4 h-4" strokeWidth={1.75} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-on-surface truncate">
                                        {w.label}
                                    </span>
                                    <span className="text-[10px] font-semibold tracking-[0.05em] uppercase text-on-surface-variant">
                                        {w.network}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="font-mono text-xs text-on-surface-variant truncate">
                                        {w.address}
                                    </span>
                                    <button
                                        type="button"
                                        aria-label="Copy address"
                                        className="text-on-surface-variant/60 hover:text-primary transition-colors shrink-0"
                                    >
                                        <Copy className="w-3 h-3" strokeWidth={1.75} />
                                    </button>
                                </div>
                            </div>

                            <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                                <div className="flex gap-1">
                                    {w.assets.map((a) => (
                                        <span
                                            key={a}
                                            className="px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-[0.05em] uppercase bg-surface-container-high text-on-surface"
                                        >
                                            {a}
                                        </span>
                                    ))}
                                </div>
                                <span
                                    className={
                                        "text-[10px] font-semibold tracking-[0.05em] uppercase " +
                                        (w.status === "Monitoring"
                                            ? "text-primary"
                                            : "text-outline")
                                    }
                                >
                                    {w.status}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}


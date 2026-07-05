import type { Metadata } from "next";
import type { ComponentType } from "react";
import { ArrowLeft, Construction } from "lucide-react";
import Link from "next/link";

import {
    BarChart3,
    Link2,
    Plug,
    Receipt,
    Settings,
    Sparkles,
    Wallet2,
} from "lucide-react";

type Variant = {
    title: string;
    blurb: string;
    icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};

const VARIANTS: Record<string, Variant> = {
    transactions: {
        title: "Transactions",
        blurb: "Browse, filter, and reconcile every USDT and USDC transaction across connected wallets.",
        icon: Receipt,
    },
    reconciliation: {
        title: "Reconciliation",
        blurb: "Match incoming stablecoin payments to open invoices with confidence scoring. Approve, reject, or flag for review.",
        icon: Link2,
    },
    rules: {
        title: "Rules",
        blurb: "Create automation rules so Onreco categorizes and routes every transaction the way your team already works.",
        icon: Sparkles,
    },
    wallets: {
        title: "Wallets",
        blurb: "Add, monitor, or pause wallets across Tron, Solana, Base, and other supported networks. Onreco never holds private keys.",
        icon: Wallet2,
    },
    integrations: {
        title: "Integrations",
        blurb: "Connect QuickBooks, Xero, and other accounting platforms. View connection status and last sync health.",
        icon: Plug,
    },
    reports: {
        title: "Reports",
        blurb: "Generate audit-ready reports for accountants, tax advisors, and finance leadership. Export to CSV or PDF.",
        icon: BarChart3,
    },
    settings: {
        title: "Settings",
        blurb: "Manage organization details, Chart of Accounts, integrations, team access, notifications, and security.",
        icon: Settings,
    },
};

export function makePageMetadata(slug: keyof typeof VARIANTS): Metadata {
    const v = VARIANTS[slug];
    return {
        title: `${v.title} | Onreco`,
        description: v.blurb,
        robots: { index: false, follow: false },
    };
}

export default function PlaceholderPage({ slug }: { slug: keyof typeof VARIANTS }) {
    const v = VARIANTS[slug];
    const Icon = v.icon;

    return (
        <div className="flex flex-col gap-6 md:gap-8">
            <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                <div>
                    <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
                        {v.title}
                    </h1>
                    <p className="text-sm text-on-surface-variant mt-1">{v.blurb}</p>
                </div>
                <Link
                    href="/app"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.05em] uppercase text-on-surface-variant hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
                    Back to Overview
                </Link>
            </header>

            <section className="bg-glass rounded-xl p-10 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-4 min-h-[420px]">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <div>
                    <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">
                        {v.title} is coming soon
                    </h2>
                    <p className="text-sm text-on-surface-variant mt-2 max-w-md mx-auto">
                        The {v.title.toLowerCase()} experience is being designed.
                        You&apos;ll find it here once it ships.
                    </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/20 text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                    <Construction className="w-3 h-3" strokeWidth={2} />
                    In design
                </div>
            </section>
        </div>
    );
}
import {
    BarChart3,
    LayoutDashboard,
    Link2,
    Plug,
    Receipt,
    Settings,
    Sparkles,
    Tags,
    Wallet2,
} from "lucide-react";
import type { ComponentType } from "react";

export type NavItem = {
    href: string;
    label: string;
    icon: ComponentType<{ className?: string; strokeWidth?: number }>;
    /** Short label used in the mobile bottom bar (must fit in 64px). */
    short: string;
    exact?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
    { href: "/app", label: "Overview", short: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/app/transactions", label: "Transactions", short: "Activity", icon: Receipt },
    { href: "/app/categorize", label: "Categorize", short: "Categorize", icon: Tags },
    { href: "/app/reconciliation", label: "Reconciliation", short: "Reconcile", icon: Link2 },
    { href: "/app/rules", label: "Rules", short: "Rules", icon: Sparkles },
    { href: "/app/wallets", label: "Wallets", short: "Wallets", icon: Wallet2 },
    { href: "/app/integrations", label: "Integrations", short: "Connect", icon: Plug },
    { href: "/app/reports", label: "Reports", short: "Reports", icon: BarChart3 },
    { href: "/app/settings", label: "Settings", short: "Settings", icon: Settings },
];

export function isNavActive(
    pathname: string | null,
    href: string,
    exact?: boolean
) {
    if (!pathname) return false;
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
}
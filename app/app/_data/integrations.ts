export type IntegrationStatus = "connected" | "disconnected" | "error" | "soon";

export type Integration = {
    id: string;
    name: string;
    blurb: string;
    monogram: string;
    monogramBg: string;
    monogramFg: string;
    status: IntegrationStatus;
    lastSync?: string;
    detail?: string;
};

export const INTEGRATIONS: Integration[] = [
    {
        id: "i1",
        name: "QuickBooks Online",
        blurb: "Sync categorized stablecoin transactions into your Chart of Accounts automatically.",
        monogram: "QB",
        monogramBg: "bg-[#2ca01c]/20",
        monogramFg: "text-[#2ca01c]",
        status: "connected",
        lastSync: "2 min ago",
        detail: "Acme Corp Ledger",
    },
    {
        id: "i2",
        name: "Xero",
        blurb: "Push journal entries and reconciliation data into your Xero organization.",
        monogram: "X",
        monogramBg: "bg-[#13b5ea]/20",
        monogramFg: "text-[#13b5ea]",
        status: "connected",
        lastSync: "Yesterday",
        detail: "Acme Holdings · AU",
    },
    {
        id: "i3",
        name: "NetSuite",
        blurb: "Connect your NetSuite GL for high-volume stablecoin transaction sync.",
        monogram: "NS",
        monogramBg: "bg-surface-container-high",
        monogramFg: "text-on-surface",
        status: "disconnected",
    },
    {
        id: "i4",
        name: "FreshBooks",
        blurb: "Sync expenses and income to FreshBooks for small-team accounting.",
        monogram: "FB",
        monogramBg: "bg-[#0075dd]/20",
        monogramFg: "text-[#0075dd]",
        status: "disconnected",
    },
    {
        id: "i5",
        name: "Zoho Books",
        blurb: "Send categorized stablecoin entries to your Zoho Books ledger.",
        monogram: "ZB",
        monogramBg: "bg-[#e42527]/20",
        monogramFg: "text-[#e42527]",
        status: "disconnected",
    },
    {
        id: "i6",
        name: "Stripe",
        blurb: "Reconcile Stripe payouts against on-chain stablecoin payments.",
        monogram: "S",
        monogramBg: "bg-[#635bff]/20",
        monogramFg: "text-[#635bff]",
        status: "soon",
    },
    {
        id: "i7",
        name: "Plaid",
        blurb: "Link bank accounts to auto-match fiat off-ramp transfers with stablecoin activity.",
        monogram: "P",
        monogramBg: "bg-surface-container-high",
        monogramFg: "text-on-surface",
        status: "soon",
    },
];

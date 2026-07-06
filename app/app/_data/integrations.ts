export interface Integration {
    slug: string;
    name: string;
    picUrl?: string;
    blurb: string;
    available: boolean;
    connected: boolean;
    connectedAt?: string;
}

export const INTEGRATIONS: Integration[] = [
    {
        slug: "quickbooks",
        name: "QuickBooks Online",
        picUrl: "https://logo.clearbit.com/quickbooks.intuit.com",
        blurb: "Sync categorized stablecoin transactions into your Chart of Accounts automatically.",
        available: true,
        connected: true,
        connectedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    },
    {
        slug: "xero",
        name: "Xero",
        picUrl: "https://logo.clearbit.com/xero.com",
        blurb: "Push journal entries and reconciliation data into your Xero organization.",
        available: true,
        connected: true,
        connectedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        slug: "netsuite",
        name: "NetSuite",
        picUrl: "https://logo.clearbit.com/netsuite.com",
        blurb: "Connect your NetSuite GL for high-volume stablecoin transaction sync.",
        available: true,
        connected: false,
    },
    {
        slug: "freshbooks",
        name: "FreshBooks",
        picUrl: "https://logo.clearbit.com/freshbooks.com",
        blurb: "Sync expenses and income to FreshBooks for small-team accounting.",
        available: true,
        connected: false,
    },
    {
        slug: "zoho-books",
        name: "Zoho Books",
        picUrl: "https://logo.clearbit.com/zoho.com",
        blurb: "Send categorized stablecoin entries to your Zoho Books ledger.",
        available: true,
        connected: false,
    },
    {
        slug: "stripe",
        name: "Stripe",
        picUrl: "https://logo.clearbit.com/stripe.com",
        blurb: "Reconcile Stripe payouts against on-chain stablecoin payments.",
        available: false,
        connected: false,
    },
    {
        slug: "plaid",
        name: "Plaid",
        picUrl: "https://logo.clearbit.com/plaid.com",
        blurb: "Link bank accounts to auto-match fiat off-ramp transfers with stablecoin activity.",
        available: false,
        connected: false,
    },
];
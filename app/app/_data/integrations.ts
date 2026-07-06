export type Integration = {
  name: string;
  slug: string;
  available: boolean;
  connected: boolean;
  connectedAt?: string | null;
  picUrl: string;
  blurb: string;
};

export const INTEGRATIONS: Integration[] = [
  {
    name: "QuickBooks Online",
    slug: "quickbooks",
    available: true,
    connected: true,
    connectedAt: "2026-07-05T15:07:38Z",
    picUrl: "https://res.cloudinary.com/dvpkp0u9u/image/upload/v1783261709/quickbooks-seeklogo_xstkqg.png",
    blurb: "Sync categorized stablecoin transactions into your Chart of Accounts automatically.",
  },
  {
    name: "Xero",
    slug: "xero",
    available: true,
    connected: true,
    connectedAt: "2026-07-04T15:07:38Z",
    picUrl: "https://res.cloudinary.com/dvpkp0u9u/image/upload/v1783261709/quickbooks-seeklogo_xstkqg.png",
    blurb: "Push journal entries and reconciliation data into your Xero organization.",
  },
  {
    name: "NetSuite",
    slug: "netsuite",
    available: true,
    connected: false,
    picUrl: "https://res.cloudinary.com/dvpkp0u9u/image/upload/v1783261709/quickbooks-seeklogo_xstkqg.png",
    blurb: "Connect your NetSuite GL for high-volume stablecoin transaction sync.",
  },
  {
    name: "FreshBooks",
    slug: "freshbooks",
    available: true,
    connected: false,
    picUrl: "https://res.cloudinary.com/dvpkp0u9u/image/upload/v1783261709/quickbooks-seeklogo_xstkqg.png",
    blurb: "Sync expenses and income to FreshBooks for small-team accounting.",
  },
  {
    name: "Zoho Books",
    slug: "zoho",
    available: true,
    connected: false,
    picUrl: "https://res.cloudinary.com/dvpkp0u9u/image/upload/v1783261709/quickbooks-seeklogo_xstkqg.png",
    blurb: "Send categorized stablecoin entries to your Zoho Books ledger.",
  },
  {
    name: "Stripe",
    slug: "stripe",
    available: false,
    connected: false,
    picUrl: "https://res.cloudinary.com/dvpkp0u9u/image/upload/v1783261709/quickbooks-seeklogo_xstkqg.png",
    blurb: "Reconcile Stripe payouts against on-chain stablecoin payments.",
  },
  {
    name: "Plaid",
    slug: "plaid",
    available: false,
    connected: false,
    picUrl: "https://res.cloudinary.com/dvpkp0u9u/image/upload/v1783261709/quickbooks-seeklogo_xstkqg.png",
    blurb: "Link bank accounts to auto-match fiat off-ramp transfers with stablecoin activity.",
  },
];

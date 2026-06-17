import { Wallet, Radar, Network, CheckCheck } from "lucide-react";

const steps = [
  {
    n: 1,
    icon: Wallet,
    title: "Connect Your Wallet",
    body: "Connect via MetaMask or paste a public wallet address. Onreco uses read-only access. Your private keys stay private.",
  },
  {
    n: 2,
    icon: Radar,
    title: "Onreco Detects Transactions",
    body: "Onreco monitors your wallets on Tron, Solana, and Base and automatically detects every incoming and outgoing USDT and USDC transaction.",
  },
  {
    n: 3,
    icon: Network,
    title: "Categorize & Match",
    body: "Transactions are categorized using your rules, matched to open invoices, and organized into clean journal entries ready for review.",
  },
  {
    n: 4,
    icon: CheckCheck,
    title: "Sync to QuickBooks or Xero",
    body: "Approve the entries and Onreco pushes them directly to your QuickBooks Online or Xero account. Stablecoin bookkeeping, done.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 md:px-8 py-24 bg-surface border-b border-outline-variant/10">
      <div className="max-w-container-max mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] leading-10 font-semibold tracking-tight text-on-surface mb-4">
            How Stablecoin Accounting Works with Onreco
          </h2>
          <p className="text-[18px] leading-7 text-on-surface-variant max-w-2xl mx-auto">
            From wallet connection to reconciled books in four steps. No spreadsheets, no manual journal entries.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-outline-variant/20 -z-10 -translate-y-1/2" />

          {steps.map(({ n, icon: Icon, title, body }) => (
            <div
              key={n}
              className="bg-surface-container rounded-xl p-6 border border-outline-variant/20 relative z-10 flex flex-col items-center text-center"
            >
              {/* Step number bubble */}
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mb-4 ring-4 ring-surface">
                {n}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-surface-container-high flex items-center justify-center mb-4 text-on-surface">
                <Icon className="w-8 h-8" />
              </div>

              <h4 className="text-[20px] leading-7 font-semibold text-on-surface mb-2">
                {title}
              </h4>
              <p className="text-sm text-on-surface-variant leading-5">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

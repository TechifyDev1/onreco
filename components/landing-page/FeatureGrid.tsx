import { Filter, RefreshCw, FileCheck } from "lucide-react";

const features = [
  {
    icon: Filter,
    title: "Automatic Transaction Detection",
    body: "Onreco monitors your wallets on Base and Solana and automatically identifies every USDT and USDC transaction. No manual imports. No missed entries.",
  },
  {
    icon: RefreshCw,
    title: "QuickBooks & Xero Sync",
    body: "Detected stablecoin transactions are categorized and pushed directly into your existing Chart of Accounts in QuickBooks Online or Xero automatically.",
  },
  {
    icon: FileCheck,
    title: "Reconciliation & Invoice Matching",
    body: "Onreco matches incoming stablecoin payments to open invoices and generates audit-ready journal entries with on-chain transaction hashes attached as memos.",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="px-4 md:px-8 py-20 bg-surface-container-lowest border-b border-outline-variant/10">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-glass rounded-xl p-8 glow-top hover:bg-surface-container-high/50 transition-colors duration-300 flex flex-col"
            >
              {/* Icon badge */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary shrink-0">
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-[20px] leading-7 font-semibold text-on-surface mb-3">
                {title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-5">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

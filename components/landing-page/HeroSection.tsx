import { Play } from "lucide-react";
import Link from "next/link";
import ComingSoonButton from "@/components/shared/ComingSoonButton";

export default function HeroSection() {
  const transactionSample = [
    {
      token: "USDC",
      tokenBg: "bg-[#2775CA]/20 text-[#2775CA]",
      label: "Invoice Payment",
      addr: "0x4a…9f2b",
      amount: "+ 5,000.00",
      status: "QuickBooks: Synced",
    },
    {
      token: "USDT",
      tokenBg: "bg-[#26A17B]/20 text-[#26A17B]",
      label: "Contractor Payroll",
      addr: "0x7c…e4d1",
      amount: "- 1,250.00",
      status: "QuickBooks: Synced",
    },
  ];
  return (
    <section
      className="px-4 md:px-8 py-24 max-w-container-max mx-auto relative h-screen flex justify-center items-center"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(180,197,255,0.10) 0%, transparent 70%)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div className="flex flex-col gap-6 z-10">
          <h1 className="text-[48px] leading-14 font-bold tracking-tight text-on-surface">
            Automate Stablecoin Accounting{" "}
            <span className="text-primary">for QuickBooks.</span>
          </h1>

          <p className="text-[18px] leading-7 text-on-surface-variant max-w-lg">
            Onreco monitors your wallets on Base. Every USDC and USDT transaction is detected, categorized, matched to invoices, and synced to QuickBooks without manual entry.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/signup"
              className="btn-primary text-on-primary-container text-base font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-center cursor-pointer"
            >
              Get Started
            </Link>
            <ComingSoonButton
              message="Demo video will be available soon!"
              className="flex items-center justify-center gap-2 bg-surface-variant border border-outline-variant/30 text-on-surface text-base font-medium px-6 py-3 rounded-lg hover:bg-surface-bright transition-colors text-center cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              See How It Works
            </ComingSoonButton>
          </div>
        </div>

        {/* Right: dashboard card */}
        <div className="relative z-10 hidden lg:block">
          <div className="bg-glass rounded-xl p-6 glow-top shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
            {/* Header row */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/20">
              <span className="text-[12px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                Live Stablecoin Transactions
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-crypto-amber animate-pulse" />
                <span className="text-[10px] font-semibold tracking-[0.08em] text-crypto-amber">
                  Syncing…
                </span>
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-4">
              {transactionSample.map((row) => (
                <div
                  key={row.addr}
                  className="flex justify-between items-center bg-surface/50 p-3 rounded-lg border border-outline-variant/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold ${row.tokenBg}`}
                    >
                      {row.token}
                    </div>
                    <div>
                      <div className="text-sm text-on-surface">{row.label}</div>
                      <div className="text-[10px] font-semibold tracking-[0.08em] text-outline">
                        {row.addr}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-on-surface">{row.amount}</div>
                    <div className="text-[10px] font-semibold tracking-[0.08em] text-outline">
                      {row.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

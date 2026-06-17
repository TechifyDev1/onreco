import { Wallet, Shield, BookOpen, Calculator } from "lucide-react";
import { SVGProps } from "react";

const SolanaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M0 3.75h19.5l4.5 4.5H4.5L0 3.75zm24 6.5H4.5L0 14.75h19.5l4.5-4.5zM0 21.25h19.5l4.5-4.5H4.5L0 21.25z" />
  </svg>
);

const TronIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.5 16.5L12 21.75 1.5 16.5 12 2.25l10.5 14.25zM12 5.25L4.5 15.5l7.5 3.75 7.5-3.75L12 5.25z" />
  </svg>
);

const BaseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="5" fill="currentColor" />
  </svg>
);

const RainbowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...props}>
    <path d="M4 18a8 8 0 0 1 16 0" />
    <path d="M7 18a5 5 0 0 1 10 0" />
    <path d="M10 18a2 2 0 0 1 4 0" />
  </svg>
);

const CoinbaseWalletIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" fill="#0b1326" />
  </svg>
);

const integrations = [
  { label: "Tron", icon: TronIcon },
  { label: "Solana", icon: SolanaIcon },
  { label: "Base", icon: BaseIcon },
  { label: "MetaMask", icon: Wallet },
  { label: "Trust Wallet", icon: Shield },
  { label: "Coinbase Wallet", icon: CoinbaseWalletIcon },
  { label: "Rainbow", icon: RainbowIcon },
  { label: "QuickBooks", icon: BookOpen },
  { label: "Xero", icon: Calculator },
];

export default function IntegrationBar() {
  return (
    <section id="integrations" className="px-4 md:px-8 py-12 bg-surface-container border-y border-outline-variant/10">
      <div className="max-w-container-max mx-auto text-center">
        <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant mb-8">
          Supported Wallets, Blockchains &amp; Accounting Software
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
          {integrations.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-on-surface">
              <Icon className="w-8 h-8" />
              <span className="text-2xl font-bold">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

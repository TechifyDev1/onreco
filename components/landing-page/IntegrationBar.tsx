import { BookOpen } from "lucide-react";
import { SVGProps } from "react";

const BaseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="5" fill="currentColor" />
  </svg>
);

const USDCIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <circle cx="12" cy="12" r="11" fill="#2775CA" />
    <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" fontFamily="sans-serif">$</text>
  </svg>
);

const USDTIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <circle cx="12" cy="12" r="11" fill="#26A17B" />
    <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" fontFamily="sans-serif">$</text>
  </svg>
);

const integrations = [
  { label: "Base", icon: BaseIcon },
  { label: "USDC", icon: USDCIcon },
  { label: "USDT", icon: USDTIcon },
  { label: "QuickBooks", icon: BookOpen },
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

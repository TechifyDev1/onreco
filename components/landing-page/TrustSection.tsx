import { ShieldCheck, History, Building } from "lucide-react";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Read-Only Wallet Access",
    body: "Onreco never requests private keys or signing permissions. Connect via MetaMask or a public address. Your funds are always under your control.",
  },
  {
    icon: History,
    title: "Full On-Chain Audit Trail",
    body: "Every stablecoin accounting entry includes the original transaction hash, block explorer link, and wallet metadata ready for auditors and tax advisors.",
  },
  {
    icon: Building,
    title: "Multi-Wallet Monitoring",
    body: "Track USDT and USDC activity across multiple wallets and entities. Ideal for accountants and bookkeepers managing several clients or subsidiaries.",
  },
];

const securityStats = [
  { label: "API Access", value: "Read-Only", highlight: true },
  { label: "Data Encryption", value: "AES-256", highlight: false },
  { label: "Uptime SLA", value: "99.99%", highlight: false },
  { label: "Audit Logs", value: "Retained Indefinitely", highlight: false },
];

export default function TrustSection() {
  return (
    <section id="security-trust" className="px-4 md:px-8 py-24 bg-surface-container-lowest border-b border-outline-variant/10">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy + bullet list */}
          <div>
            <h2 className="text-[32px] leading-10 font-semibold tracking-tight text-on-surface mb-6">
              Built for Accountants and Web3 Founders
            </h2>
            <p className="text-[18px] leading-7 text-on-surface-variant mb-8">
              Onreco is designed for finance professionals who need accurate stablecoin bookkeeping. Read-only access, full audit logs, and multi-wallet support included.
            </p>

            <div className="flex flex-col gap-6">
              {trustPoints.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[20px] leading-7 font-semibold text-on-surface mb-1">
                      {title}
                    </h4>
                    <p className="text-sm text-on-surface-variant leading-5">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: security profile card */}
          <div>
            <div className="bg-glass rounded-xl p-8 glow-top shadow-2xl border border-outline-variant/20">
              {/* Card header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-outline-variant/20">
                <ShieldCheck className="w-12 h-12 text-primary" />
                <span className="text-[20px] leading-7 font-semibold text-on-surface">
                  Security Profile Active
                </span>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-4">
                {securityStats.map(({ label, value, highlight }) => (
                  <div key={label} className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant">{label}</span>
                    {highlight ? (
                      <span className="text-primary font-mono bg-primary/10 px-2 py-1 rounded text-xs">
                        {value}
                      </span>
                    ) : (
                      <span className="text-on-surface font-mono">{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

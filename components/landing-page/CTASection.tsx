import Link from "next/link";

export default function CTASection() {
  return (
    <section className="px-4 md:px-8 py-16 bg-surface relative overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-[32px] leading-10 font-semibold tracking-tight text-on-surface mb-6">
          Stop entering stablecoin transactions by hand.
        </h2>
        <p className="text-base text-on-surface-variant mb-10">
          Create your free account to start automating stablecoin bookkeeping, reconciliation, and QuickBooks or Xero sync, so your team can focus on what matters.
        </p>
        <Link
          href="/signup"
          className="btn-primary text-on-primary-container text-base font-medium px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 cursor-pointer inline-block"
        >
          Get Started Free
        </Link>
      </div>
    </section>
  );
}

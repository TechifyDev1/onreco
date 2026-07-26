import NavBar from "@/components/landing-page/nav-bar/NavBar";
import HeroSection from "@/components/landing-page/HeroSection";
import IntegrationBar from "@/components/landing-page/IntegrationBar";
import FeatureGrid from "@/components/landing-page/FeatureGrid";
import HowItWorks from "@/components/landing-page/HowItWorks";
import TrustSection from "@/components/landing-page/TrustSection";
import CTASection from "@/components/landing-page/CTASection";
import Footer from "@/components/landing-page/Footer";




export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Onreco",
    "description": "Connect your wallet once. Onreco auto-detects, categorizes, and syncs USDT and USDC transactions into QuickBooks and Xero automatically.",
    "applicationCategory": "BusinessApplication, FinanceApplication",
    "operatingSystem": "All",
    "url": `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "localhost:3000"}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "featureList": [
      "Automated stablecoin bookkeeping",
      "Real-time transaction detection on Tron, Solana, and Base",
      "Direct sync to QuickBooks and Xero",
      "Automated journal entries and reconciliation",
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar />
      <main className="grow">
        <HeroSection />
        <IntegrationBar />
        <FeatureGrid />
        <HowItWorks />
        <TrustSection />
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">Support Onreco</h2>
            <p className="mt-2 text-on-surface-variant">If Onreco has saved you time, consider buying us a coffee.</p>
          </div>
          <iframe
            src="https://myhappr.com/embed/onreco"
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            style={{ borderRadius: '12px' }}
            title="Support Onreco"
          />
        </section>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
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
    "url": `https://${process.env.VERCEL_URL}`,
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
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
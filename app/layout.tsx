import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Toast from "@/components/shared/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: "Stablecoin Accounting for QuickBooks & Xero | Onreco",
  description:
    "Automate stablecoin accounting with Onreco. Detect USDT and USDC transactions, reconcile payments, categorize activity, and sync directly to QuickBooks and Xero.",
  keywords: [
    // Core
    "stablecoin accounting",
    "stablecoin accounting software",
    "stablecoin bookkeeping",
    "stablecoin bookkeeping software",
    "stablecoin reconciliation",
    "stablecoin transaction tracking",
    "stablecoin transaction monitoring",

    // QuickBooks
    "QuickBooks crypto integration",
    "QuickBooks stablecoin integration",
    "QuickBooks USDT accounting",
    "QuickBooks USDC accounting",
    "QuickBooks crypto bookkeeping",
    "QuickBooks stablecoin bookkeeping",

    // Xero
    "Xero crypto integration",
    "Xero stablecoin integration",
    "Xero USDT accounting",
    "Xero USDC accounting",
    "Xero crypto bookkeeping",
    "Xero stablecoin bookkeeping",

    // Stablecoins
    "USDT accounting",
    "USDT bookkeeping",
    "USDT reconciliation",
    "USDT transaction tracking",
    "USDC accounting",
    "USDC bookkeeping",
    "USDC reconciliation",
    "USDC transaction tracking",

    // Automation
    "automated bookkeeping",
    "bookkeeping automation",
    "accounting automation",
    "crypto bookkeeping automation",
    "crypto accounting automation",
    "automated journal entries",
    "automatic journal entries",
    "automated transaction categorization",

    // Reconciliation
    "crypto reconciliation",
    "automated reconciliation",
    "transaction reconciliation",
    "wallet reconciliation",
    "stablecoin payment reconciliation",

    // Wallet Monitoring
    "wallet transaction monitoring",
    "wallet transaction sync",
    "wallet accounting automation",
    "crypto wallet accounting",
    "blockchain transaction accounting",
    "on-chain transaction accounting",

    // Payroll
    "stablecoin payroll",
    "crypto payroll accounting",
    "stablecoin salary payments",
    "contractor payments in USDT",
    "contractor payments in USDC",

    // Audience
    "web3 accounting",
    "web3 bookkeeping",
    "accounting for web3 startups",
    "crypto startup accounting",
    "startup bookkeeping automation",

    // Networks
    "Tron stablecoin accounting",
    "Tron USDT accounting",
    "Solana stablecoin accounting",
    "Solana USDC accounting",
    "Base blockchain accounting",
    "Base stablecoin accounting",

    // Problems
    "manual bookkeeping automation",
    "month end reconciliation",
    "invoice matching automation",
    "transaction categorization software",
    "accounting workflow automation",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stablecoin Accounting for QuickBooks & Xero | Onreco",
    description:
      "Connect your wallet. Onreco detects USDT and USDC transactions on Tron, Solana, and Base, then syncs them directly to QuickBooks or Xero.",
    type: "website",
    url: `https://${process.env.VERCEL_URL}`,
    siteName: "Onreco",
    images: [
      {
        url: "/onreco_banner.jpg",
        width: 1200,
        height: 630,
        alt: "Onreco - Stablecoin Accounting, Automated",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onreco | Stablecoin Accounting, Automated",
    description:
      "Stop entering stablecoin transactions by hand. Onreco automates bookkeeping, reconciliation, and QuickBooks/Xero sync for USDT and USDC.",
    images: ["/onreco_banner.jpg"],
  },
  verification: {
    google: "jjegQ2Hi3U5KA2rTXyOj3vbCCzWUGW-cTwBSKUaWz3c",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-on-surface`}
      >
        <Toast />
        {children}
      </body>
    </html>
  );
}
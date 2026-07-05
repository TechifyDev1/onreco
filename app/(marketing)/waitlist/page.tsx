import NavBar from '@/components/landing-page/nav-bar/NavBar'
import Footer from '@/components/landing-page/Footer'
import WaitlistForm from '@/components/shared/WaitlistForm'
import Link from 'next/link'
import { Sparkles, ArrowLeft } from 'lucide-react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join the Waitlist | Onreco Stablecoin Accounting',
  description:
    'Get early access to Onreco automated stablecoin bookkeeping, reconciliation, and QuickBooks or Xero sync for USDT and USDC.',
  keywords: [
    'Onreco waitlist',
    'stablecoin bookkeeping early access',
    'automated crypto accounting beta',
    'QuickBooks stablecoin automation',
    'Xero stablecoin automation',
  ],
  alternates: {
    canonical: '/waitlist',
  },
  openGraph: {
    title:
      'Join the Onreco Waitlist - Stablecoin Accounting for QuickBooks & Xero',
    description:
      'Onreco automates stablecoin bookkeeping for USDT and USDC on Tron, Solana, and Base. Join the waitlist for early access.',
    type: 'website',
    images: [
      {
        url: '/onreco_banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Onreco Waitlist - Stablecoin Accounting, Automated',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join the Onreco Waitlist - Stablecoin Accounting, Automated',
    description:
      'Stop entering stablecoin transactions by hand. Join the Onreco waitlist for automated bookkeeping and QuickBooks or Xero sync.',
    images: ['/onreco_banner.jpg'],
  },
}

export default function WaitlistPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <NavBar />
      <main
        className="grow flex justify-center items-center px-4 py-16 md:py-24 relative"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(180,197,255,0.10) 0%, transparent 70%)',
        }}
      >
        <div className="w-full max-w-md relative z-10">
          <div className="bg-glass rounded-xl p-8 glow-top shadow-2xl">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/20 border border-primary/30 text-primary">
                <Sparkles className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-on-surface">
                Get Early Access to Stablecoin Accounting Automation
              </h1>
              <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
                Onreco automatically detects USDT and USDC transactions on Tron,
                Solana, and Base - and syncs them to QuickBooks or Xero. Join
                the waitlist and be first in line.
              </p>
            </div>

            {/* Form */}
            <WaitlistForm variant="stacked" />

            {/* Trust note */}
            <p className="text-center text-xs text-outline mt-5">
              No credit card required. Unsubscribe at any time.
            </p>
          </div>

          {/* Back to home */}
          <div className="flex justify-center mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

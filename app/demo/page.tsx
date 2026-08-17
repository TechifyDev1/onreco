import type { Metadata } from 'next'
import Link from 'next/link'
import { Play } from 'lucide-react'

import NavBar from '@/components/landing-page/nav-bar/NavBar'
import Footer from '@/components/landing-page/Footer'

export const metadata: Metadata = {
  title: 'Product Demo | Onreco Stablecoin Accounting for QuickBooks & Xero',
  description:
    'Watch Onreco in action. See how to connect wallets, sync USDT and USDC transactions to QuickBooks and Xero, automate reconciliation, and generate reports.',
  alternates: {
    canonical: '/demo',
  },
  openGraph: {
    title: 'Product Demo | Onreco Stablecoin Accounting',
    description:
      'Watch how Onreco automates stablecoin accounting, wallet connection, reconciliation, and QuickBooks/Xero sync.',
    type: 'website',
    url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'localhost:3000'}/demo`,
    siteName: 'Onreco',
  },
}

const demos = [
  {
    title: 'Sign Up & Email Verification',
    description: 'Create your Onreco account and verify your email to get started.',
    url: 'https://res.cloudinary.com/dvpkp0u9u/video/upload/v1786968012/signup_and_email_verification_jhce3k.webm',
    step: 1,
  },
  {
    title: 'Connect Your Wallet',
    description: 'Add a wallet address or connect via MetaMask to start monitoring transactions.',
    url: 'https://res.cloudinary.com/dvpkp0u9u/video/upload/v1786968011/wallet_connection_rcskt4.webm',
    step: 2,
  },
  {
    title: 'Connect QuickBooks',
    description: 'Link your QuickBooks Online account to enable automatic journal entry sync.',
    url: 'https://res.cloudinary.com/dvpkp0u9u/video/upload/v1786968022/connection_quickbooks_i0kxaw.webm',
    step: 3,
  },
  {
    title: 'Connect Xero',
    description: 'Link your Xero account to sync stablecoin transactions directly to your books.',
    url: 'https://res.cloudinary.com/dvpkp0u9u/video/upload/v1786968013/xero_connection_dxla0w.webm',
    step: 4,
  },
  {
    title: 'Performing a Transaction',
    description: 'See how Onreco automatically detects and categorizes USDT and USDC transactions.',
    url: 'https://res.cloudinary.com/dvpkp0u9u/video/upload/v1786968008/performing_a_transaction_pgq3va.webm',
    step: 5,
  },
  {
    title: 'Creating Categorization Rules',
    description: 'Set up rules to automatically categorize transactions by wallet, token, or amount.',
    url: 'https://res.cloudinary.com/dvpkp0u9u/video/upload/v1786968008/creating_rule_ls1pk4.webm',
    step: 6,
  },
  {
    title: 'Review Reconciliation',
    description: 'Match wallet transactions against your accounting records with ease.',
    url: 'https://res.cloudinary.com/dvpkp0u9u/video/upload/v1786968026/check_reconciliation_njhfzi.webm',
    step: 7,
  },
  {
    title: 'Confirm Transactions',
    description: 'Review and confirm categorized transactions before syncing to QuickBooks or Xero.',
    url: 'https://res.cloudinary.com/dvpkp0u9u/video/upload/v1786968045/confirm_transactions_seas8m.webm',
    step: 8,
  },
  {
    title: 'Export Reports',
    description: 'Generate and download reports of your stablecoin accounting activity.',
    url: 'https://res.cloudinary.com/dvpkp0u9u/video/upload/v1786968009/report_exporting_paocze.webm',
    step: 9,
  },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <NavBar />

      <main className="grow">
        {/* Hero */}
        <section className="px-4 md:px-8 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="max-w-container-max mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Play className="w-3.5 h-3.5 text-primary fill-current" />
              <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-primary">
                Product Demo
              </span>
            </div>
            <h1 className="text-[36px] md:text-[48px] leading-[1.1] font-bold tracking-tight text-on-surface mb-4">
              See Onreco in Action
            </h1>
            <p className="text-[18px] leading-7 text-on-surface-variant max-w-2xl mx-auto">
              Watch how Onreco automates stablecoin accounting from wallet connection
              to reconciled books. Nine short videos covering the full workflow.
            </p>
          </div>
        </section>

        {/* Video grid */}
        <section className="px-4 md:px-8 pb-24">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demos.map((demo) => (
                <div
                  key={demo.step}
                  className="bg-glass rounded-xl overflow-hidden glow-top border border-outline-variant/10 flex flex-col"
                >
                  {/* Video */}
                  <div className="relative bg-surface-container aspect-video">
                    <video
                      src={demo.url}
                      controls
                      preload="metadata"
                      className="w-full h-full object-cover"
                      poster=""
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                        {demo.step}
                      </span>
                      <h3 className="text-[16px] leading-6 font-semibold text-on-surface">
                        {demo.title}
                      </h3>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-5">
                      {demo.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <h2 className="text-[24px] md:text-[32px] leading-10 font-semibold tracking-tight text-on-surface mb-4">
                Ready to automate your stablecoin accounting?
              </h2>
              <p className="text-base text-on-surface-variant mb-8 max-w-lg mx-auto">
                Create your free account and start syncing USDT and USDC transactions
                to QuickBooks or Xero in minutes.
              </p>
              <Link
                href="/signup"
                className="btn-primary text-on-primary-container text-base font-medium px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 cursor-pointer inline-block"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

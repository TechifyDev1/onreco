import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Check,
  GitMerge,
  ShieldCheck,
  UserPlus,
  Wallet,
} from 'lucide-react'

import NavBar from '@/components/auth/NavBar'
import Footer from '@/components/landing-page/Footer'
import SignupForm from '@/components/auth/SignupForm'

export const metadata: Metadata = {
  title:
    'Create Your Onreco Account | Stablecoin Accounting for QuickBooks & Xero',
  description:
    'Create your Onreco account to automate stablecoin accounting, transaction categorization, reconciliation, and QuickBooks or Xero synchronization for USDT and USDC.',
  keywords: [
    'stablecoin accounting',
    'stablecoin bookkeeping',
    'stablecoin reconciliation',
    'QuickBooks crypto integration',
    'Xero crypto integration',
    'USDT accounting',
    'USDC accounting',
    'automated bookkeeping',
    'wallet transaction monitoring',
    'crypto bookkeeping automation',
  ],
  alternates: {
    canonical: '/signup',
  },
  openGraph: {
    title:
      'Create Your Onreco Account | Stablecoin Accounting for QuickBooks & Xero',
    description:
      'Sign up for Onreco and automate stablecoin accounting, USDT and USDC transaction categorization, reconciliation, and QuickBooks or Xero synchronization.',
    type: 'website',
    url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'localhost:3000'}/signup`,
    siteName: 'Onreco',
    images: [
      {
        url: '/onreco_banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Onreco Sign Up - Stablecoin Accounting for QuickBooks & Xero',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Create Your Onreco Account | Stablecoin Accounting for QuickBooks & Xero',
    description:
      'Sign up for Onreco and automate stablecoin accounting, USDT and USDC transaction categorization, reconciliation, and QuickBooks or Xero synchronization.',
    images: ['/onreco_banner.jpg'],
  },
}

const BENEFITS = [
  'Stablecoin accounting automation',
  'QuickBooks & Xero integration',
  'USDT and USDC transaction tracking',
  'Automated reconciliation workflows',
]

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <NavBar />

      <main
        className="grow flex items-center justify-center px-4 py-12 md:py-16 relative"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)',
        }}
      >
        <div className="w-full max-w-250 grid md:grid-cols-2 overflow-hidden rounded-xl border border-outline-variant/10 shadow-2xl bg-glass glow-top">
          {/* Left Side: Marketing / Atmosphere */}
          <div className="hidden md:flex flex-col justify-between p-12 bg-surface-container-low relative overflow-hidden">
            <Image
              src="/login_image.jpg"
              alt="Stablecoin accounting for QuickBooks and Xero"
              fill
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/70 to-transparent z-[1]" />

            <div className="z-10">
              <h1 className="text-4xl md:text-[48px] leading-[1.05] font-bold tracking-tight text-on-surface mb-6">
                Automate Stablecoin Accounting.
              </h1>
              <p className="text-base md:text-lg leading-7 text-on-surface-variant max-w-md">
                Detect USDT and USDC transactions from your wallets and sync
                them directly to QuickBooks and Xero. Reduce manual bookkeeping,
                automate reconciliation, and keep your accounting records
                accurate.
              </p>
            </div>

            <div className="z-10 mt-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                    <GitMerge className="w-4.5 h-4.5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-wider uppercase text-on-surface">
                      Stablecoin Reconciliation
                    </div>
                    <div className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                      Match wallet transactions with accounting records
                      automatically
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-4.5 h-4.5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-wider uppercase text-on-surface">
                      AES-256 Encryption
                    </div>
                    <div className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                      Data encrypted at rest and in transit
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[10px] leading-4 text-on-surface-variant/50 mt-8">
                Photo by{' '}
                <a
                  href="https://unsplash.com/@dotnny?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                  className="underline hover:text-on-surface transition-colors"
                >
                  Donny Jiang
                </a>{' '}
                on{' '}
                <a
                  href="https://unsplash.com/photos/low-angle-photo-of-high-rise-buildings-under-white-sky-42gFAgdIUC8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                  className="underline hover:text-on-surface transition-colors"
                >
                  Unsplash
                </a>
              </p>
            </div>

            {/* Abstract visual asset */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full opacity-20 bg-linear-to-br from-primary-container to-tertiary-container blur-3xl pointer-events-none" />
          </div>

          {/* Right Side: Form */}
          <div className="p-8 md:p-12 bg-surface flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="text-3xl md:text-[32px] leading-10 font-semibold tracking-tight text-on-surface mb-2">
                Create Your Onreco Account
              </h2>
              <p className="text-base leading-6 text-on-surface-variant">
                Start automating stablecoin bookkeeping, reconciliation, and
                accounting workflows in minutes.
              </p>
            </div>

            {/* SEO benefit bullets */}
            <ul className="space-y-2 mt-2 mb-6">
              {BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-2 text-sm text-on-surface"
                >
                  <Check
                    className="w-4 h-4 text-primary shrink-0"
                    strokeWidth={2.5}
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <SignupForm />

            <div className="mt-8 pt-6 border-t border-outline-variant/10 flex flex-col items-center gap-4">
              <p className="text-sm leading-5 text-on-surface-variant">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-primary font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

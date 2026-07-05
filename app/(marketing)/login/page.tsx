import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Cpu,
  GitMerge,
  Mail,
  Users,
  Wallet,
} from 'lucide-react'

import NavBar from '@/components/auth/NavBar'
import Footer from '@/components/landing-page/Footer'
import Image from 'next/image'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Sign In | Onreco Stablecoin Accounting for QuickBooks & Xero',
  description:
    'Sign in to Onreco to manage automated stablecoin accounting, USDT and USDC transaction tracking, reconciliation, and QuickBooks or Xero synchronization.',
  keywords: [
    'stablecoin accounting',
    'stablecoin bookkeeping',
    'stablecoin reconciliation',
    'QuickBooks crypto integration',
    'Xero crypto integration',
    'USDT accounting',
    'USDC accounting',
    'wallet transaction monitoring',
  ],
  alternates: {
    canonical: '/login',
  },
  openGraph: {
    title: 'Sign In to Onreco | Stablecoin Accounting for QuickBooks & Xero',
    description:
      'Sign in to Onreco to manage automated stablecoin accounting, USDT and USDC transaction tracking, reconciliation, and QuickBooks or Xero synchronization.',
    type: 'website',
    url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'localhost:3000'}/login`,
    siteName: 'Onreco',
    images: [
      {
        url: '/onreco_banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Onreco Sign In - Stablecoin Accounting for QuickBooks & Xero',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In to Onreco | Stablecoin Accounting for QuickBooks & Xero',
    description:
      'Sign in to Onreco to manage automated stablecoin accounting, USDT and USDC transaction tracking, reconciliation, and QuickBooks or Xero synchronization.',
    images: ['/onreco_banner.jpg'],
  },
  robots: {
    index: false,
    follow: true,
  },
}

const BENEFITS = [
  'Monitor automated stablecoin bookkeeping',
  'Sync USDT and USDC transactions to QuickBooks and Xero',
  'Track reconciliation and transaction categorization in real time',
]

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <NavBar />

      <main
        className="grow flex items-center justify-center px-4 py-12 md:py-16 relative"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(180,197,255,0.10) 0%, transparent 70%)',
        }}
      >
        <div className="w-full max-w-275 grid md:grid-cols-12 overflow-hidden rounded-xl border border-outline-variant/10 shadow-2xl bg-glass glow-top relative">
          {/* Background grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(#ffffff 0.5px, transparent 0.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Left Side: Visual / Trust */}
          <div className="hidden md:flex md:col-span-5 bg-surface-container relative overflow-hidden flex-col justify-end p-12 border-r border-outline-variant/10">
            <Image
              src="/login_image.png"
              alt="Onreco stablecoin accounting dashboard"
              fill
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/70 to-transparent z-10" />

            <div className="relative z-20">
              <h2 className="text-3xl md:text-[32px] leading-10 font-semibold tracking-tight text-on-surface mb-4">
                Automate Stablecoin Accounting with Confidence.
              </h2>
              <p className="text-base leading-6 text-on-surface-variant max-w-sm">
                Monitor USDT and USDC transactions, automate bookkeeping
                workflows, manage reconciliation, and sync accounting records to
                QuickBooks and Xero.
              </p>
            </div>
          </div>

          {/* Right Side: Sign In Form */}
          <div className="md:col-span-7 p-8 md:p-16 flex flex-col justify-center relative z-10">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
                  <Users
                    className="w-3.5 h-3.5 text-primary"
                    strokeWidth={2.5}
                  />
                  <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-primary">
                    Designed for founders, accountants, and bookkeepers
                  </span>
                </div>
                <h1 className="text-2xl md:text-[24px] leading-8 font-semibold tracking-tight text-on-surface mb-2">
                  Welcome Back
                </h1>
                <p className="text-sm leading-5 text-on-surface-variant">
                  Sign in to manage stablecoin accounting, automate
                  reconciliation, monitor wallet transactions, and sync records
                  to QuickBooks and Xero.
                </p>
              </div>

              {/* SEO benefit bullets */}
              <ul className="space-y-2 mb-6">
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

              <LoginForm />

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/10" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-surface px-4 text-on-surface-variant/60 font-bold tracking-widest">
                    Or connect via
                  </span>
                </div>
              </div>

              {/* Wallet Alternatives */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-outline-variant/20 bg-surface-container-high hover:bg-surface-variant transition-colors group"
                >
                  <GitMerge
                    className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform"
                    strokeWidth={2}
                  />
                  <span className="text-xs font-semibold tracking-wider uppercase text-on-surface">
                    MetaMask
                  </span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-outline-variant/20 bg-surface-container-high hover:bg-surface-variant transition-colors group"
                >
                  <Cpu
                    className="w-5 h-5 text-on-surface-variant group-hover:scale-110 transition-transform"
                    strokeWidth={2}
                  />
                  <span className="text-xs font-semibold tracking-wider uppercase text-on-surface">
                    Ledger
                  </span>
                </button>
              </div>

              <p className="mt-8 text-center text-sm leading-5 text-on-surface-variant/60">
                By signing in, you agree to our{' '}
                <Link
                  href="#"
                  className="text-on-surface hover:text-primary underline"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="#"
                  className="text-on-surface hover:text-primary underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="mt-6 flex justify-center">
                <Link
                  href="/signup"
                  className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  New to Onreco?{' '}
                  <span className="text-primary font-bold ml-1">
                    Create Account
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="w-full py-6 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      <Footer />
    </div>
  )
}

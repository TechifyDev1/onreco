import type { Metadata } from "next";
import { ArrowLeft, Check, ExternalLink, UserPlus } from "lucide-react";
import Link from "next/link";
import NavBar from "@/components/landing-page/nav-bar/NavBar";
import Footer from "@/components/landing-page/Footer";

export const metadata: Metadata = {
    title: "Thank You | Onreco",
    description:
        "Thanks for joining the Onreco waitlist. We'll be in touch when stablecoin accounting automation is ready for your team.",
    alternates: {
        canonical: "/thank-you",
    },
    openGraph: {
        title: "You're on the Onreco waitlist",
        description:
            "Thanks for joining the Onreco waitlist. We'll be in touch when stablecoin accounting automation is ready for your team.",
        type: "website",
        url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "localhost:3000"}/thank-you`,
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
        title: "You're on the Onreco waitlist",
        description:
            "Thanks for joining the Onreco waitlist. We'll be in touch when stablecoin accounting automation is ready for your team.",
        images: ["/onreco_banner.jpg"],
    },
};

export default function ThankYouPage() {
    const siteUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "localhost:3000"}`;
    const shareHref =
        "mailto:?subject=Join%20me%20on%20the%20Onreco%20waitlist&body=I%20just%20joined%20the%20Onreco%20waitlist%20for%20stablecoin%20accounting.%20Thought%20you%20would%20want%20to%20join%20too.";
    const twitterHref = `https://twitter.com/intent/tweet?text=Just%20joined%20the%20%40onrecohq%20waitlist%20%E2%80%94%20automated%20stablecoin%20accounting%20for%20QuickBooks%20and%20Xero.%20Worth%20checking%20out%20if%20your%20team%20pays%20in%20USDT%20or%20USDC.%20${encodeURIComponent(siteUrl)}`;

    return (
        <div className="min-h-screen flex flex-col bg-background text-on-surface">
            <NavBar />

            <main
                className="relative flex grow flex-col items-center justify-center overflow-hidden px-6 py-16 md:py-20"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(180,197,255,0.10) 0%, transparent 70%)",
                }}
            >
                {/* Ambient glows */}
                <div className="pointer-events-none absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
                <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-hyper-cobalt/20 blur-[120px]" />

                {/* Headline */}
                <div className="relative z-10 w-full max-w-3xl text-center">
                    <div className="mb-6 inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 p-2">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full btn-primary text-on-primary-container shadow-[0_0_40px_rgba(37,99,235,0.35)]">
                            <Check
                                aria-hidden="true"
                                className="h-8 w-8"
                                strokeWidth={2.5}
                            />
                        </div>
                    </div>

                    <h1 className="mb-6 text-4xl font-bold tracking-tight text-on-surface md:text-5xl">
                        You&apos;re on the list
                    </h1>

                    <p className="mx-auto max-w-2xl text-base leading-7 text-on-surface-variant md:text-lg">
                        Thanks for joining the Onreco waitlist. We&apos;ll reach out
                        as soon as your spot opens — and we&apos;ll make sure
                        stablecoin bookkeeping is one less thing on your plate.
                    </p>
                </div>

                {/* Two-card CTA grid */}
                <div className="relative z-10 mt-12 grid w-full max-w-3xl gap-5 md:grid-cols-2">
                    <a
                        className="bg-glass rounded-xl p-6 flex min-h-52.5 flex-col border border-outline-variant/20 transition-all duration-300 hover:border-primary/40 hover:bg-surface-container-high"
                        href={twitterHref}
                        rel="noreferrer"
                        target="_blank"
                        aria-label="Share Onreco on X (Twitter)"
                    >
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                            <ExternalLink
                                aria-hidden="true"
                                className="h-6 w-6"
                            />
                        </div>
                        <h2 className="mb-3 text-xl font-semibold text-on-surface">
                            Share on X
                        </h2>
                        <p className="text-sm leading-6 text-on-surface-variant">
                            Tell your network about Onreco. Accountants, bookkeepers,
                            and web3 founders saving hours on stablecoin reconciliation.
                        </p>
                        <span className="mt-auto pt-6 text-sm font-semibold text-primary">
                            Post a tweet →
                        </span>
                    </a>

                    <a
                        className="bg-glass rounded-xl p-6 flex min-h-52.5 flex-col border border-outline-variant/20 transition-all duration-300 hover:border-primary/40 hover:bg-surface-container-high"
                        href={shareHref}
                        aria-label="Invite your team to join the Onreco waitlist via email"
                    >
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-tertiary/30 bg-tertiary-container/20 text-tertiary">
                            <UserPlus aria-hidden="true" className="h-6 w-6" />
                        </div>
                        <h2 className="mb-3 text-xl font-semibold text-on-surface">
                            Invite your accountant
                        </h2>
                        <p className="text-sm leading-6 text-on-surface-variant">
                            Share Onreco with your accountant, bookkeeper, or
                            finance lead so you&apos;re ready to hit the ground running
                            when onboarding opens.
                        </p>
                        <span className="mt-auto pt-6 text-sm font-semibold text-tertiary">
                            Send invite email →
                        </span>
                    </a>
                </div>

                {/* Back to home */}
                <div className="relative z-10 mt-10">
                    <Link
                        className="inline-flex items-center gap-3 rounded-full border border-outline-variant/30 bg-surface-container-low px-6 py-3 text-sm font-medium text-on-surface transition-all duration-200 hover:bg-surface-container hover:border-primary/40"
                        href="/"
                    >
                        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                        <span>Go back home</span>
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}

import Footer from "@/components/landing-page/Footer";
import NavBar from "@/components/landing-page/nav-bar/NavBar";
import { ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "./_data/posts";

export const metadata: Metadata = {
    title: "Blog | Onreco",
    description:
        "Guides and insights on stablecoin accounting, USDT/USDC bookkeeping, and QuickBooks / Xero automation.",
    keywords: [
        "stablecoin accounting",
        "USDT QuickBooks",
        "USDC QuickBooks",
        "USDT bookkeeping",
        "USDC bookkeeping",
        "crypto accounting automation",
        "Onreco blog",
    ],
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Blog | Onreco",
        description:
            "Guides and insights on stablecoin accounting, USDT/USDC bookkeeping, and QuickBooks / Xero automation.",
        type: "website",
        url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "localhost:3000"}/blog`,
        siteName: "Onreco",
        images: [
            {
                url: "/onreco_main_blog_banner.jpg",
                width: 1200,
                height: 630,
                alt: "Onreco Blog - Stablecoin accounting, explained.",
            },
        ],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog | Onreco",
        description:
            "Guides and insights on stablecoin accounting, USDT/USDC bookkeeping, and QuickBooks / Xero automation.",
        images: ["/onreco_main_blog_banner.jpg"],
    },
};


export default function BlogIndexPage() {
    const posts = Object.values(blogPosts);

    return (
        <div className="min-h-screen flex flex-col bg-background text-on-surface">
            <NavBar />
            <main
                className="grow px-4 md:px-8 py-16 md:py-24"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)",
                }}
            >
                <div className="max-w-3xl mx-auto">
                    <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-primary">
                        Onreco Blog
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface mt-3 mb-4">
                        Stablecoin accounting, explained.
                    </h1>
                    <p className="text-lg text-on-surface-variant max-w-2xl mb-12">
                        Practical guides on recording USDT and USDC
                        transactions, reconciling wallets, and automating your
                        books.
                    </p>

                    <ul className="flex flex-col gap-5">
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group block bg-glass rounded-2xl p-6 border border-outline-variant/20 hover:border-primary/40 transition-colors"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-on-surface-variant flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {post.readingMinutes} min read
                                        </span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-on-surface mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-on-surface-variant mb-4">
                                        {post.description}
                                    </p>
                                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                                        Read article
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
}

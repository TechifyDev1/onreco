import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import NavBar from '@/components/landing-page/nav-bar/NavBar'
import Footer from '@/components/landing-page/Footer'
import { getAllPostSlugs, getPost, type BlogBlock } from '../_data/posts'

type RouteParams = { slug: string }

export function generateStaticParams(): RouteParams[] {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Onreco Blog`,
    description: post.description,
    keywords: [
      'USDT accounting',
      'USDT QuickBooks',
      'record USDT in QuickBooks',
      'stablecoin accounting',
      'crypto bookkeeping',
      'Onreco',
    ],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'localhost:3000'}/blog/${post.slug}`,
      siteName: 'Onreco',
      publishedTime: post.publishedTime,
      modifiedTime: post.modifiedTime ?? post.publishedTime,
      authors: [post.author],
      images: [
        {
          url: post.image || '/blog_banner_image_1.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image || '/blog_banner_image_1.jpg'],
    },
  }
}

function ArticleJsonLd({ post }: { post: ReturnType<typeof getPost> }) {
  if (!post) return null
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedTime,
    dateModified: post.modifiedTime ?? post.publishedTime,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Onreco',
      logo: {
        '@type': 'ImageObject',
        url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'localhost:3000'}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'localhost:3000'}/blog/${post.slug}`,
    },
    image: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'localhost:3000'}${post.image || '/blog_banner_image_1.jpg'}`,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-on-surface mt-12 mb-4">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-on-surface mt-8 mb-3">
          {block.text}
        </h3>
      )
    case 'p':
      return (
        <p className="text-base leading-7 text-on-surface-variant mb-4">
          {block.text}
        </p>
      )
    case 'ul':
      return (
        <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mb-6 marker:text-primary">
          {block.items.map((item, i) => (
            <li key={i} className="leading-7">
              {item}
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="list-decimal pl-6 space-y-2 text-on-surface-variant mb-6 marker:text-primary marker:font-semibold">
          {block.items.map((item, i) => (
            <li key={i} className="leading-7">
              {item}
            </li>
          ))}
        </ol>
      )
    case 'hr':
      return <hr className="my-10 border-outline-variant/15" />
    case 'cta':
      return (
        <div className="bg-glass rounded-2xl p-8 mt-8 text-center border border-primary/20">
          <h3 className="text-2xl font-semibold tracking-tight text-on-surface mb-3">
            Get early access
          </h3>
          <p className="text-on-surface-variant max-w-xl mx-auto mb-6">
            Join the waitlist to get early access to Onreco and stop recording
            stablecoin transactions by hand.
          </p>
          <Link
            href="/waitlist"
            className="btn-primary inline-block text-on-primary-container text-base font-medium px-7 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Join the Waitlist
          </Link>
        </div>
      )
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const formattedDate = new Date(post.publishedTime).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <NavBar />
      <ArticleJsonLd post={post} />

      <main className="grow w-full">
        {/* Header */}
        <section
          className="relative px-4 md:px-8 pt-16 pb-12"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(180,197,255,0.10) 0%, transparent 70%)',
          }}
        >
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-2 mb-5">
              <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-on-surface-variant max-w-2xl mb-8">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-on-surface-variant">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readingMinutes} min read
              </span>
              <span>By {post.author}</span>
            </div>
          </div>
        </section>

        {/* Article body */}
        <article className="px-4 md:px-8 pb-20">
          <div className="max-w-3xl mx-auto">
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}

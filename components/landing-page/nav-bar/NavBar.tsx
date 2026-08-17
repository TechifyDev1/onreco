import Link from 'next/link'
import UseFluxButton from './UseFluxButton'

export default function NavBar() {
  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md border-b border-outline-variant/10"
      style={{ background: 'rgba(255,255,255,0.80)' }}
    >
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-container-max mx-auto h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-on-surface tracking-tight hover:opacity-90 transition-opacity"
        >
          Onreco
        </Link>

        {/* Desktop Nav links */}
        <div className="hidden md:flex gap-8">
          <Link
            href="/#features"
            className="text-xs font-medium tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="/#integrations"
            className="text-xs font-medium tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            Integrations
          </Link>
          <Link
            href="/#how-it-works"
            className="text-xs font-medium tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            How it Works
          </Link>
          <a
            href="https://myhappr.com/onreco"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            Support us
          </a>
        </div>

        {/* Right side navigation actions (Blog + CTA) */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/blog"
            className="text-xs font-medium tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            Blog
          </Link>
          <UseFluxButton />
        </div>
      </div>
    </nav>
  )
}

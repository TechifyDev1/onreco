import Link from "next/link";
import UseFluxButton from "./UseFluxButton";
import ComingSoonLink from "@/components/shared/ComingSoonLink";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-outline-variant/10"
      style={{ background: "rgba(11,19,38,0.80)" }}>
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-container-max mx-auto h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-on-surface tracking-tight hover:opacity-90 transition-opacity">
          Onreco
        </Link>

        {/* Desktop Nav links */}
        <div className="hidden md:flex gap-8">
          <a
            href="/#features"
            className="text-xs font-medium tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="/#integrations"
            className="text-xs font-medium tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            Integrations
          </a>
          <a
            href="/#how-it-works"
            className="text-xs font-medium tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            How it Works
          </a>
          <ComingSoonLink
            message="Pricing plans will be available soon!"
            className="text-xs font-medium tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            Pricing
          </ComingSoonLink>
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
  );
}
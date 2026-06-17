import { Mail } from "lucide-react";
import ComingSoonLink from "@/components/shared/ComingSoonLink";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/10">
      <div className="w-full py-8 px-4 md:px-8 max-w-container-max mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-outline-variant/10">
          {/* Brand blurb — spans 2 cols */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-on-surface mb-4">Onreco</div>
            <p className="text-sm text-on-surface-variant max-w-sm leading-5">
              The stablecoin accounting platform for QuickBooks and Xero. Automate bookkeeping, reconciliation, and journal entries for USDT and USDC.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface mb-4">
              Product
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="/#how-it-works" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="/#integrations" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  Integrations
                </a>
              </li>
              <li>
                <a href="/#security-trust" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  Security &amp; Trust
                </a>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <ComingSoonLink 
                  message="Pricing plans will be available soon!" 
                  className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Pricing
                </ComingSoonLink>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {["Documentation", "Contact Sales", "Privacy Policy", "Terms of Service"].map((label) => (
                <li key={label}>
                  <ComingSoonLink 
                    message={`${label} will be available soon!`} 
                    className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {label}
                  </ComingSoonLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[12px] font-semibold tracking-[0.08em] text-on-surface-variant">
            &copy; {new Date().getFullYear()} Onreco. Stablecoin accounting, automated.
          </span>
          <div className="flex gap-4">
            <a 
              href="https://x.com/onrecohq" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex justify-between items-center border rounded-full py-1 px-2 gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 512 512" fill="currentColor">
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
              <p className="p-0">@onrecohq</p>
            </a>

            <a href="mailto:hashbookshq@gmail.com" className="text-on-surface-variant hover:text-primary transition-colors flex justify-between items-center border rounded-full py-1 px-2 gap-1.5">
              <Mail className="w-4 h-4" />
              <p className="p-0">Email us</p>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

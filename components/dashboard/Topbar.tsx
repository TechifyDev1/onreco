import { Heart } from "lucide-react";

import AccountMenu from "./AccountMenu";

export default function Topbar() {
    return (
        <header className="sticky top-0 z-30 h-16 border-b border-outline-variant/10 bg-surface-container-lowest/80 backdrop-blur-md">
            <div className="h-full px-4 md:px-8 flex items-center justify-end gap-3">
                <a
                    href="https://myhappr.com/onreco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-wider uppercase hover:border-primary/40 transition-colors"
                >
                    <Heart className="w-3.5 h-3.5" strokeWidth={2} />
                    Support us
                </a>
                <div className="flex items-center gap-2 md:gap-3">
                    <AccountMenu />
                </div>
            </div>
        </header>
    );
}

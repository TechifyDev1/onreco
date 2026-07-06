import { Bell, Search } from "lucide-react";

import AccountMenu from "./AccountMenu";

export default function Topbar() {
    return (
        <header className="sticky top-0 z-30 h-16 border-b border-outline-variant/10 bg-surface-container-lowest/80 backdrop-blur-md">
            <div className="h-full px-4 md:px-8 flex items-center gap-6">
                {/* Search */}
                <div className="flex-1 max-w-xl relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant"
                        strokeWidth={1.75}
                    />
                    <input
                        type="search"
                        placeholder="Search transactions, wallets, invoices..."
                        aria-label="Search"
                        className="w-full pl-10 pr-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/20 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all"
                    />
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:ml-auto" />

                <div className="flex items-center gap-2 md:gap-3">
                    {/* Notification bell */}
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors relative"
                    >
                        <Bell className="w-[18px] h-[18px]" strokeWidth={1.75} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary" />
                    </button>

                    <AccountMenu />
                </div>
            </div>
        </header>
    );
}

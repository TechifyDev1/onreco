"use client";

import { Bell, ChevronDown, Search } from "lucide-react";
import { useSimulationStore } from "@/providers/simulation-store";

export default function Topbar() {
    const { isEmptySimulated, toggleEmptySimulation } = useSimulationStore();

    return (
        <header className="sticky top-0 z-30 h-16 border-b border-outline-variant/10 bg-surface-container-lowest/80 backdrop-blur-md">
            <div className="h-full px-4 md:px-8 flex items-center gap-6">
                {/* Search — capped so the right cluster has room to breathe */}
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

                {/* Spacer keeps the right cluster clear of the search field on lg+ */}
                <div className="hidden md:block md:ml-auto" />

                <div className="flex items-center gap-3 md:gap-4">
                    {/* Simulation Toggle */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/10 text-xs text-on-surface-variant font-semibold tracking-wide">
                        <span>SIMULATE EMPTY</span>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={isEmptySimulated}
                            onClick={toggleEmptySimulation}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                isEmptySimulated ? "bg-primary" : "bg-surface-container-high border border-outline-variant/25"
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-on-primary shadow ring-0 transition duration-200 ease-in-out ${
                                    isEmptySimulated ? "translate-x-4 bg-white" : "translate-x-0 bg-on-surface-variant/70"
                                }`}
                            />
                        </button>
                    </div>

                    {/* Notification bell */}
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors relative"
                    >
                        <Bell className="w-[18px] h-[18px]" strokeWidth={1.75} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary" />
                    </button>

                    {/* User menu */}
                    <button
                        type="button"
                        className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-lg hover:bg-surface-container transition-colors"
                    >
                        <div className="w-7 h-7 rounded-full bg-primary-container/30 border border-primary-container/50 flex items-center justify-center text-primary text-xs font-semibold">
                            JD
                        </div>
                        <span className="hidden md:inline text-sm text-on-surface font-medium">
                            John Doe
                        </span>
                        <ChevronDown
                            className="hidden md:block w-4 h-4 text-on-surface-variant"
                            strokeWidth={1.75}
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}


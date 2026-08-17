'use client';

import { Plus } from 'lucide-react';

/**
 * Page header for the wallets page.
 * Extracted into a client component only because the "Add Wallet" button
 * needs an onClick handler — the rest of the content is purely presentational.
 */
export default function WalletsPageHeader({ onAddClick }: { onAddClick: () => void }) {
    return (
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
                <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
                    Wallets
                </h1>
                <p className="text-sm text-on-surface-variant mt-1">
                    Connect and monitor wallets across Tron, Solana, Base, and other supported
                    networks. Onreco never holds private keys.
                </p>
            </div>
            <button
                id="open-add-wallet"
                type="button"
                onClick={onAddClick}
                className="btn-primary inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity self-start md:self-auto shrink-0"
            >
                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                Add Wallet
            </button>
        </header>
    );
}

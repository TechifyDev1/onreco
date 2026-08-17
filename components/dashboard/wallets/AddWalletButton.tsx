'use client';

import { Plus } from 'lucide-react';

export default function AddWalletButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            id="open-add-wallet"
            type="button"
            onClick={onClick}
            className="btn-primary inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
        >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            Add Wallet
        </button>
    );
}

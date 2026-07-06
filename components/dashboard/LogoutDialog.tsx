"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LogOut, X } from "lucide-react";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
};

export default function LogoutDialog({ open, onOpenChange, onConfirm }: Props) {
    // Portal target must be read on the client (no SSR mismatch).
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll while the dialog is open.
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // Close on ESC.
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onOpenChange(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onOpenChange]);

    if (!mounted) return null;

    return createPortal(
        <div
            aria-hidden={!open}
            className={
                "fixed inset-0 z-[60] flex items-center justify-center px-4 pointer-events-none"
            }
        >
            {/* Scrim */}
            <div
                onClick={() => onOpenChange(false)}
                className={
                    "absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-200 " +
                    (open ? "opacity-100" : "opacity-0")
                }
            />

            {/* Panel */}
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="logout-title"
                aria-describedby="logout-description"
                className={
                    "relative w-full max-w-sm bg-surface-container-lowest border border-outline-variant/15 rounded-2xl shadow-2xl glow-top transition-all duration-200 ease-out " +
                    (open
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none")
                }
            >
                {/* Close button */}
                <button
                    type="button"
                    aria-label="Close"
                    onClick={() => onOpenChange(false)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                >
                    <X className="w-4 h-4" strokeWidth={1.75} />
                </button>

                <div className="p-6">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center justify-center mb-4">
                        <LogOut className="w-6 h-6" strokeWidth={1.75} />
                    </div>

                    {/* Copy */}
                    <h2
                        id="logout-title"
                        className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface mb-2"
                    >
                        Sign out of Onreco?
                    </h2>
                    <p
                        id="logout-description"
                        className="text-sm text-on-surface-variant leading-relaxed"
                    >
                        You&apos;ll need to sign in again with your work email to
                        access your stablecoin accounting, reconciliation history,
                        and QuickBooks or Xero sync.
                    </p>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="px-4 py-2.5 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-[0.05em] uppercase hover:border-primary/40 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="px-4 py-2.5 rounded-lg bg-tertiary-container/20 border border-tertiary/40 text-tertiary text-xs font-semibold tracking-[0.05em] uppercase hover:bg-tertiary-container/30 transition-colors inline-flex items-center justify-center gap-1.5"
                        >
                            <LogOut className="w-3.5 h-3.5" strokeWidth={2} />
                            Yes, sign out
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

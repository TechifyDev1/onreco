"use client";
import type { Wallet } from "@/app/app/_data/wallets";
import { useHydratedWalletStore } from "./wallet-store";

export default function WalletStoreInitializer({
    wallets,
}: {
    wallets: Wallet[];
}) {
    useHydratedWalletStore(wallets);
    return null;
}

export type Network = "Tron" | "Solana" | "Base" | "Ethereum" | "Polygon";
export type WalletStatus = "monitoring" | "paused";
export type WalletAsset = "USDT" | "USDC";

export type Wallet = {
    id: string;
    label: string;
    address: string;
    network: Network;
    assets: WalletAsset[];
    lastSync: string;
    transactions30d: number;
    status: WalletStatus;
};

export const WALLETS: Wallet[] = [
    { id: "w1", label: "Treasury", address: "0x9a2c…f31e", network: "Ethereum", assets: ["USDT", "USDC"], lastSync: "12 sec ago", transactions30d: 84, status: "monitoring" },
    { id: "w2", label: "Payroll", address: "0x14ad…88b2", network: "Base", assets: ["USDT"], lastSync: "1 min ago", transactions30d: 28, status: "monitoring" },
    { id: "w3", label: "Customer Inflows", address: "TX7nQ…aB2k", network: "Tron", assets: ["USDT"], lastSync: "30 sec ago", transactions30d: 142, status: "monitoring" },
    { id: "w4", label: "Operations", address: "0xa1d3…9e44", network: "Base", assets: ["USDT", "USDC"], lastSync: "2 min ago", transactions30d: 56, status: "monitoring" },
    { id: "w5", label: "Contractor Pool", address: "7xK9p…3mQ", network: "Solana", assets: ["USDC"], lastSync: "5 min ago", transactions30d: 12, status: "monitoring" },
    { id: "w6", label: "Legacy", address: "0xff02…7b3a", network: "Ethereum", assets: ["USDT"], lastSync: "3 hr ago", transactions30d: 0, status: "paused" },
];

export const NETWORK_CHIP: Record<Network, string> = {
    Tron: "bg-tertiary-container/20 text-tertiary border-tertiary-container/30",
    Solana: "bg-secondary/15 text-secondary border-secondary/30",
    Base: "bg-primary/10 text-primary border-primary/30",
    Ethereum: "bg-surface-container-high text-on-surface-variant border-outline-variant/20",
    Polygon: "bg-surface-container-high text-on-surface-variant border-outline-variant/20",
};

export const SUPPORTED_NETWORKS: { name: Network; status: "active" | "soon" }[] = [
    { name: "Tron", status: "active" },
    { name: "Solana", status: "active" },
    { name: "Base", status: "active" },
    { name: "Ethereum", status: "soon" },
    { name: "Polygon", status: "soon" },
];

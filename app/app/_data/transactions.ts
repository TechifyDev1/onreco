export type Direction = "in" | "out";
export type Asset = "USDT" | "USDC";
export type TxStatus = "Synced" | "Pending" | "Flagged" | "Matched";

export type Transaction = {
    id: string;
    date: string;
    asset: Asset;
    direction: Direction;
    amount: string;
    usd: string;
    wallet: string;
    category: string;
    counterparty: string;
    status: TxStatus;
};

export const TRANSACTIONS: Transaction[] = [
    { id: "t1", date: "Today · 14:32", asset: "USDT", direction: "in", amount: "12,500.000000", usd: "$12,500.00", wallet: "Treasury", category: "Customer Payment", counterparty: "0x9a2c…f31e", status: "Matched" },
    { id: "t2", date: "Today · 13:11", asset: "USDC", direction: "out", amount: "1,240.500000", usd: "$1,240.50", wallet: "Payables", category: "Vendor Payout", counterparty: "0x14ad…88b2", status: "Synced" },
    { id: "t3", date: "Today · 11:48", asset: "USDT", direction: "in", amount: "8,000.000000", usd: "$8,000.00", wallet: "Inflows", category: "Customer Payment", counterparty: "0x77fe…2c01", status: "Pending" },
    { id: "t4", date: "Today · 09:22", asset: "USDT", direction: "out", amount: "320.000000", usd: "$320.00", wallet: "Operations", category: "Software Expense", counterparty: "0xa1d3…9e44", status: "Flagged" },
    { id: "t5", date: "Yesterday · 18:04", asset: "USDC", direction: "in", amount: "22,400.000000", usd: "$22,400.00", wallet: "Treasury", category: "Customer Payment", counterparty: "0x3bc1…07de", status: "Matched" },
    { id: "t6", date: "Yesterday · 16:39", asset: "USDT", direction: "out", amount: "4,500.000000", usd: "$4,500.00", wallet: "Payables", category: "Payroll", counterparty: "0xc8e0…11a2", status: "Synced" },
    { id: "t7", date: "Yesterday · 12:11", asset: "USDC", direction: "in", amount: "1,899.250000", usd: "$1,899.25", wallet: "Inflows", category: "Customer Payment", counterparty: "0xff02…7b3a", status: "Synced" },
    { id: "t8", date: "2 days ago", asset: "USDT", direction: "in", amount: "50,000.000000", usd: "$50,000.00", wallet: "Treasury", category: "Customer Payment", counterparty: "0x3d4e…aa01", status: "Matched" },
    { id: "t9", date: "2 days ago", asset: "USDC", direction: "out", amount: "2,100.000000", usd: "$2,100.00", wallet: "Operations", category: "Contractor Payment", counterparty: "0x77a0…99cc", status: "Pending" },
    { id: "t10", date: "2 days ago", asset: "USDT", direction: "out", amount: "75.000000", usd: "$75.00", wallet: "Operations", category: "Software Expense", counterparty: "0xbc12…01ee", status: "Synced" },
    { id: "t11", date: "3 days ago", asset: "USDC", direction: "in", amount: "9,400.000000", usd: "$9,400.00", wallet: "Inflows", category: "Customer Payment", counterparty: "0x20fa…4d10", status: "Flagged" },
    { id: "t12", date: "3 days ago", asset: "USDT", direction: "in", amount: "3,250.000000", usd: "$3,250.00", wallet: "Inflows", category: "Refund", counterparty: "0xa055…c3f7", status: "Synced" },
];

export const TX_STATUS_STYLES: Record<TxStatus, string> = {
    Synced: "bg-primary/10 text-primary",
    Pending: "bg-secondary/15 text-secondary",
    Flagged: "bg-tertiary-container/20 text-tertiary",
    Matched: "bg-primary/10 text-primary",
};

export const TX_FILTERS = ["All", "USDT", "USDC", "Income", "Expense"] as const;

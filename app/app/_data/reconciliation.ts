export type Decision = "approved" | "rejected" | "flagged" | "pending";

export type Match = {
    id: string;
    confidence: number;
    payment: {
        asset: "USDT" | "USDC";
        amount: string;
        usd: string;
        time: string;
        wallet: string;
    };
    invoice: {
        id: string;
        customer: string;
        amount: string;
        due: string;
    };
    decision: Decision;
};

export const MATCHES: Match[] = [
    {
        id: "m1",
        confidence: 96,
        payment: { asset: "USDT", amount: "500.000000", usd: "$500.00", time: "2 min ago", wallet: "Treasury" },
        invoice: { id: "INV-1024", customer: "Acme Holdings", amount: "$500.00", due: "Today" },
        decision: "pending",
    },
    {
        id: "m2",
        confidence: 92,
        payment: { asset: "USDC", amount: "12,500.000000", usd: "$12,500.00", time: "18 min ago", wallet: "Treasury" },
        invoice: { id: "INV-1031", customer: "Bright Labs", amount: "$12,500.00", due: "Today" },
        decision: "pending",
    },
    {
        id: "m3",
        confidence: 81,
        payment: { asset: "USDT", amount: "1,899.250000", usd: "$1,899.25", time: "1 hr ago", wallet: "Inflows" },
        invoice: { id: "INV-1018", customer: "Northwind Co.", amount: "$1,899.25", due: "Yesterday" },
        decision: "pending",
    },
    {
        id: "m4",
        confidence: 64,
        payment: { asset: "USDC", amount: "320.000000", usd: "$320.00", time: "3 hr ago", wallet: "Operations" },
        invoice: { id: "—", customer: "No match found", amount: "—", due: "—" },
        decision: "flagged",
    },
    {
        id: "m5",
        confidence: 99,
        payment: { asset: "USDT", amount: "22,400.000000", usd: "$22,400.00", time: "Yesterday", wallet: "Treasury" },
        invoice: { id: "INV-1012", customer: "Cobalt Industries", amount: "$22,400.00", due: "Yesterday" },
        decision: "approved",
    },
    {
        id: "m6",
        confidence: 47,
        payment: { asset: "USDT", amount: "75.000000", usd: "$75.00", time: "2 days ago", wallet: "Operations" },
        invoice: { id: "—", customer: "No match found", amount: "—", due: "—" },
        decision: "rejected",
    },
];

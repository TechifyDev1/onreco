export type SupportedChain = 'SOLANA' | 'BASE' | 'TRON';
export type SupportedCurrency = 'USDT' | 'USDC';
export type WalletStatus = 'monitoring' | 'paused';

export type Wallet = {
   id: string;
   address: string;
   chain: SupportedChain;
   monitoredCurrencies: SupportedCurrency[];
   label: string;
   active: boolean;
   createdAt: string;
   lastSyncAt: string | null;
   transactionCount30d: number;
};

export type AddWalletRequest = {
   address: string;
   chain: SupportedChain;
   monitoredCurrencies: SupportedCurrency[];
   label?: string;
};

export const SUPPORTED_CHAINS: { value: SupportedChain; label: string; soon?: boolean }[] = [
   { value: 'BASE', label: 'Base' },
   { value: 'SOLANA', label: 'Solana' },
   { value: 'TRON', label: 'Tron', soon: true },
];

export const SUPPORTED_CURRENCIES: SupportedCurrency[] = ['USDT', 'USDC'];

export const NETWORK_CHIP: Record<SupportedChain, string> = {
   TRON: 'bg-tertiary-container/20 text-tertiary border-tertiary-container/30',
   SOLANA: 'bg-secondary/15 text-secondary border-secondary/30',
   BASE: 'bg-primary/10 text-primary border-primary/30',
};

export const SUPPORTED_NETWORKS: { name: SupportedChain; status: 'active' | 'soon' }[] = [
   { name: 'BASE', status: 'active' },
   { name: 'SOLANA', status: 'active' },
   { name: 'TRON', status: 'soon' },
];

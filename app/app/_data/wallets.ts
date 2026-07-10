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
   lastSync?: string;
   transactions30d?: number;
};

export type AddWalletRequest = {
   address: string;
   chain: SupportedChain;
   monitoredCurrencies: SupportedCurrency[];
   label?: string;
};

export const SUPPORTED_CHAINS: { value: SupportedChain; label: string }[] = [
   { value: 'SOLANA', label: 'Solana' },
   { value: 'BASE', label: 'Base' },
   { value: 'TRON', label: 'Tron' },
];

export const SUPPORTED_CURRENCIES: SupportedCurrency[] = ['USDT', 'USDC'];

export const NETWORK_CHIP: Record<SupportedChain, string> = {
   TRON: 'bg-tertiary-container/20 text-tertiary border-tertiary-container/30',
   SOLANA: 'bg-secondary/15 text-secondary border-secondary/30',
   BASE: 'bg-primary/10 text-primary border-primary/30',
};

export const SUPPORTED_NETWORKS: { name: SupportedChain; status: 'active' | 'soon' }[] = [
   { name: 'TRON', status: 'active' },
   { name: 'SOLANA', status: 'active' },
   { name: 'BASE', status: 'active' },
];

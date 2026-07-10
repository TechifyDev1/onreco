'use client';

import { AlertCircle, CheckCircle2 } from 'lucide-react';
import {
    SUPPORTED_CHAINS,
    SUPPORTED_CURRENCIES,
    type SupportedChain,
    type SupportedCurrency,
} from '@/app/app/_data/wallets';

export default function ManualTab({
    addressValue,
    setAddressValue,
    addressError,
    setAddressError,
    labelValue,
    setLabelValue,
    chainValue,
    setChainValue,
    chainError,
    setChainError,
    currencies,
    setCurrencies,
    currenciesError,
    setCurrenciesError,
}: {
    addressValue: string;
    setAddressValue: (value: string) => void;
    addressError: string;
    setAddressError: (value: string) => void;
    labelValue: string;
    setLabelValue: (value: string) => void;
    chainValue: SupportedChain | '';
    setChainValue: (value: SupportedChain | '') => void;
    chainError: string;
    setChainError: (value: string) => void;
    currencies: SupportedCurrency[];
    setCurrencies: React.Dispatch<React.SetStateAction<SupportedCurrency[]>>;
    currenciesError: string;
    setCurrenciesError: (value: string) => void;
}) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-on-surface-variant mb-1.5">
                    Label
                </label>
                <input
                    type="text"
                    value={labelValue}
                    onChange={(e) => setLabelValue(e.target.value)}
                    placeholder="Treasury"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none"
                />
                <p className="mt-1.5 text-xs text-on-surface-variant">
                    Optional. A friendly name like 'Treasury' or 'Payroll'.
                </p>
            </div>

            <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-on-surface-variant mb-1.5">
                    Wallet address <span className="text-tertiary">*</span>
                </label>
                <input
                    type="text"
                    value={addressValue}
                    onChange={(e) => {
                        setAddressValue(e.target.value);
                        if (addressError) setAddressError('');
                    }}
                    placeholder="0x… or T…"
                    className={`w-full bg-surface-container-low border rounded-lg px-4 py-2.5 text-sm font-mono text-on-surface placeholder:text-on-surface-variant/50 focus:ring-1 outline-none ${
                        addressError
                            ? 'border-tertiary/50 focus:border-tertiary focus:ring-tertiary/30'
                            : 'border-outline-variant/20 focus:border-primary-container focus:ring-primary-container'
                    }`}
                />
                {addressError && (
                    <p className="mt-1.5 text-xs text-tertiary inline-flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" strokeWidth={2.5} />
                        {addressError}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-on-surface-variant mb-1.5">
                    Chain <span className="text-tertiary">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {SUPPORTED_CHAINS.map(({ value, label: displayLabel }) => {
                        const isActive = chainValue === value;
                        return (
                            <button
                                key={value}
                                type="button"
                                onClick={() => {
                                    setChainValue(value);
                                    if (chainError) setChainError('');
                                }}
                                aria-pressed={isActive}
                                className={`px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase border ${
                                    isActive
                                        ? 'bg-primary/10 text-primary border-primary/40'
                                        : 'bg-surface-container-low text-on-surface-variant border-outline-variant/20 hover:text-on-surface hover:border-primary/30'
                                }`}
                            >
                                {displayLabel}
                            </button>
                        );
                    })}
                </div>
                {chainError && (
                    <p className="mt-1.5 text-xs text-tertiary inline-flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" strokeWidth={2.5} />
                        {chainError}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-on-surface-variant mb-1.5">
                    Monitor <span className="text-tertiary">*</span>
                </label>
                <div className="flex items-center gap-2">
                    {SUPPORTED_CURRENCIES.map((currency) => {
                        const isActive = currencies.includes(currency);
                        return (
                            <button
                                key={currency}
                                type="button"
                                onClick={() => {
                                    setCurrencies((prev) =>
                                        prev.includes(currency)
                                            ? prev.filter((c) => c !== currency)
                                            : [...prev, currency],
                                    );
                                    if (currenciesError) setCurrenciesError('');
                                }}
                                aria-pressed={isActive}
                                className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase border inline-flex items-center gap-1.5 ${
                                    isActive
                                        ? 'bg-primary/10 text-primary border-primary/40'
                                        : 'bg-surface-container-low text-on-surface-variant border-outline-variant/20 hover:text-on-surface hover:border-primary/30'
                                }`}
                            >
                                {isActive && (
                                    <CheckCircle2
                                        className="w-3 h-3"
                                        strokeWidth={2.5}
                                    />
                                )}
                                {currency}
                            </button>
                        );
                    })}
                </div>
                <p className="mt-1.5 text-xs text-on-surface-variant">
                    Choose which stablecoins to track on this wallet.
                </p>
                {currenciesError && (
                    <p className="mt-1.5 text-xs text-tertiary inline-flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" strokeWidth={2.5} />
                        {currenciesError}
                    </p>
                )}
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2, Wallet, X } from 'lucide-react';

import { useToastStore } from '@/providers/toast-provider';
import { useWalletStore } from '@/providers/wallet-store';
import WalletService from '@/services/WalletService';
import { ApiError } from '@/services/ApiError';
import { type SupportedChain, type SupportedCurrency } from '@/app/app/_data/wallets';
import ManualTab from './ManualTab';

export default function Dialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
   const { show } = useToastStore();
   const { addWallet } = useWalletStore();

   const [submitting, setSubmitting] = useState(false);

   const [addressValue, setAddressValue] = useState('');
   const [addressError, setAddressError] = useState('');
   const [labelValue, setLabelValue] = useState('');
   const [chainValue, setChainValue] = useState<SupportedChain | ''>('');
   const [chainError, setChainError] = useState('');
   const [currencies, setCurrencies] = useState<SupportedCurrency[]>([]);
   const [currenciesError, setCurrenciesError] = useState('');

   const resetForm = useCallback(() => {
      setAddressValue('');
      setAddressError('');
      setLabelValue('');
      setChainValue('');
      setChainError('');
      setCurrencies([]);
      setCurrenciesError('');
      setSubmitting(false);
   }, []);

   const closeDialog = useCallback(() => {
      resetForm();
      onOpenChange(false);
   }, [onOpenChange, resetForm]);

   useEffect(() => {
      if (!open) {
         document.body.style.overflow = '';
         return;
      }

      document.body.style.overflow = 'hidden';

      return () => {
         document.body.style.overflow = '';
      };
   }, [open]);

   useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
         if (e.key === 'Escape' && !submitting) closeDialog();
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
   }, [closeDialog, open, submitting]);

   async function submitForm() {
      let hasErrors = false;
      if (!addressValue.trim()) {
         setAddressError('Wallet address is required.');
         hasErrors = true;
      } else if (addressValue.trim().length < 8) {
         setAddressError('Address looks too short.');
         hasErrors = true;
      }
      if (!chainValue) {
         setChainError('Select a chain.');
         hasErrors = true;
      }
      if (currencies.length === 0) {
         setCurrenciesError('Select at least one currency to monitor.');
         hasErrors = true;
      }
      if (hasErrors) return;

      setSubmitting(true);
      try {
         const newWallet = await WalletService.addWallet({
            address: addressValue.trim(),
            chain: chainValue as SupportedChain,
            monitoredCurrencies: currencies,
            label: labelValue.trim() || undefined,
         });
         addWallet(newWallet);
         show(`${newWallet.label || 'Wallet'} added and monitoring ${newWallet.chain}.`, 'success');
         closeDialog();
      } catch (error) {
         if (error instanceof ApiError) {
            setAddressError(error.fieldErrors?.address ?? '');
            setChainError(error.fieldErrors?.chain ?? '');
            setCurrenciesError(error.fieldErrors?.monitoredCurrencies ?? '');
            show(error.message, 'error');
            setSubmitting(false);
         } else {
            // show('Failed to add wallet. Please try again.', 'error');
            setSubmitting(false);
         }
      }
   }

   if (!open) return null;

   return (
      <>
         <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-fade-in" aria-hidden="true" onClick={() => !submitting && closeDialog()} />

         <div role="dialog" aria-modal="true" aria-labelledby="add-wallet-title" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 pointer-events-none">
            <div
               className="pointer-events-auto bg-surface-container w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slide-up sm:animate-scale-in"
               onClick={(e) => e.stopPropagation()}
            >
               <div className="flex items-start justify-between gap-3 px-6 py-5 border-b border-outline-variant/10 shrink-0">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Wallet className="w-5 h-5" strokeWidth={1.75} />
                     </div>
                     <div>
                        <h2 id="add-wallet-title" className="text-[18px] leading-7 font-semibold tracking-tight text-on-surface">
                           Add a wallet
                        </h2>
                        <p className="text-xs text-on-surface-variant">Read-only monitoring · Onreco never asks for private keys.</p>
                     </div>
                  </div>
                  <button
                     type="button"
                     aria-label="Close"
                     onClick={closeDialog}
                     disabled={submitting}
                     className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50 shrink-0"
                  >
                     <X className="w-4 h-4" strokeWidth={1.75} />
                  </button>
               </div>

               <form
                  id="add-wallet-form"
                  onSubmit={(e) => {
                     e.preventDefault();
                     submitForm();
                  }}
                  noValidate
                  className="flex-1 overflow-y-auto px-6 py-4"
               >
                  <ManualTab
                     addressValue={addressValue}
                     setAddressValue={setAddressValue}
                     addressError={addressError}
                     setAddressError={setAddressError}
                     labelValue={labelValue}
                     setLabelValue={setLabelValue}
                     chainValue={chainValue}
                     setChainValue={setChainValue}
                     chainError={chainError}
                     setChainError={setChainError}
                     currencies={currencies}
                     setCurrencies={setCurrencies}
                     currenciesError={currenciesError}
                     setCurrenciesError={setCurrenciesError}
                  />
               </form>

               <div className="shrink-0 border-t border-outline-variant/10 px-6 py-4 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                  <button
                     type="button"
                     onClick={closeDialog}
                     disabled={submitting}
                     className="px-4 py-2.5 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-wider uppercase hover:border-primary/40 transition-colors disabled:opacity-50"
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     form="add-wallet-form"
                     disabled={submitting}
                     className="px-4 py-2.5 rounded-lg bg-primary-container text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-1.5 disabled:opacity-60"
                  >
                     {submitting ? (
                        <>
                           <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2.5} />
                           Adding…
                        </>
                     ) : (
                        <>
                           <Wallet className="w-3.5 h-3.5" strokeWidth={2} />
                           Add wallet
                        </>
                     )}
                  </button>
               </div>
            </div>
         </div>
      </>
   );
}

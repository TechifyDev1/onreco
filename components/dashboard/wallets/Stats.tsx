'use client';

import { useWalletStore } from '@/providers/wallet-store';
import { ExternalLink, Pause, Play, WalletIcon } from 'lucide-react';

export default function Stats() {
   const { monitoring, paused, wallets, chainsCovered } = useWalletStore();
   const monitoringLenth = monitoring.length;
   const pausedLenth = paused.length;
   const totalTx = wallets.reduce((acc, w) => acc + (w.transactions30d ?? 0), 0);
   return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
         <div className="bg-glass rounded-xl p-5 glow-top border border-outline-variant/10">
            <div className="flex items-center justify-between mb-3">
               <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">{'Monitoring'.toUpperCase()}</span>
               <div className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary`}>
                  <WalletIcon className="w-4 h-4" strokeWidth={1.75} />
               </div>
            </div>
            <div className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface">{monitoringLenth}</div>
         </div>

         <div className="bg-glass rounded-xl p-5 glow-top border border-outline-variant/10">
            <div className="flex items-center justify-between mb-3">
               <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">{'Paused'.toUpperCase()}</span>
               <div className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center ${pausedLenth > 1 ? 'text-on-surface-variant' : 'text-primary'}`}>
                  <Pause className="w-4 h-4" strokeWidth={1.75} />
               </div>
            </div>
            <div className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface">{pausedLenth}</div>
         </div>

         <div className="bg-glass rounded-xl p-5 glow-top border border-outline-variant/10">
            <div className="flex items-center justify-between mb-3">
               <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">{'Transactions 30d'.toUpperCase()}</span>
               <div className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center "text-primary"`}>
                  <Play className="w-4 h-4" strokeWidth={1.75} />
               </div>
            </div>
            <div className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface">{totalTx}</div>
         </div>

         <div className="bg-glass rounded-xl p-5 glow-top border border-outline-variant/10">
            <div className="flex items-center justify-between mb-3">
               <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">{'Covered Chains'}</span>
               <div className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary`}>
                  <ExternalLink className="w-4 h-4" strokeWidth={1.75} />
               </div>
            </div>
            <div className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface">{chainsCovered}</div>
         </div>
      </div>
   );
}

type statType = {
   label: string;
   value: string;
   icon: typeof Play;
   accent: string;
};

import { CircleHelp } from 'lucide-react';
import { SUPPORTED_NETWORKS } from '@/app/app/_data/wallets';
import WalletsClientShell from '@/components/dashboard/wallets/WalletsClientShell';
import WalletStoreInitializer from '@/providers/WalletStoreInitializer';
import WalletService from '@/services/WalletService';
import { ApiError } from '@/services/ApiError';
import { Wallet } from '@/app/app/_data/wallets';

export const metadata = {
   title: 'Wallets · Onreco',
   description: 'Connect and monitor wallets across Tron, Solana, Base, and other supported networks.',
};

export default async function WalletsPage() {
   let wallets: Wallet[] = [];
   try {
      wallets = await WalletService.getWallets();
      //   console.log(wallets);
   } catch (error) {
      if (error instanceof ApiError) {
         console.error('[WalletsPage] Failed to fetch wallets:', error.message);
      } else {
         console.error('[WalletsPage] Failed to fetch wallets:', error);
      }
   }

   return (
      <>
         <WalletStoreInitializer wallets={wallets} />
         <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
            <WalletsClientShell />
            <SupportedNetworksSection />
         </div>
      </>
   );
}

function SupportedNetworksSection() {
   return (
      <section className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10">
         <header className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
               <CircleHelp className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
               <h2 className="text-[16px] leading-6 font-semibold tracking-tight text-on-surface">Supported networks</h2>
               <p className="text-xs text-on-surface-variant">Onreco monitors activity on these chains. New chains roll out as demand grows.</p>
            </div>
         </header>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {SUPPORTED_NETWORKS.map((network) => (
               <div key={network.name} className="rounded-lg bg-surface-container-low border border-outline-variant/10 p-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-on-surface">{network.name}</span>
                  {network.status === 'active' ? (
                     <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-primary/10 text-primary">Active</span>
                  ) : (
                     <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-surface-container-high text-on-surface-variant">
                        Coming soon
                     </span>
                  )}
               </div>
            ))}
         </div>
      </section>
   );
}

'use client';
import { Integration } from '@/app/app/_data/integrations';
import { ExternalLink, Loader2, Plus, Unplug } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import StatusPill from './StatusPill';
import IntegrationService from '@/services/IntegrationService';
import { useIntegrationStore } from '@/providers/integration-store';
import { useToastStore } from '@/providers/toast-provider';

export default function IntegrationCard({ integration }: { integration: Integration }) {
   const status = integration.connected
      ? 'connected'
      : integration.available
        ? 'disconnected'
        : 'soon';

   const [showConfirm, setShowConfirm] = useState(false);
   const [disconnecting, setDisconnecting] = useState(false);
   const [connecting, setConnecting] = useState(false);
   const { markDisconnected } = useIntegrationStore();
   const { show } = useToastStore();

   const handleDisconnect = async () => {
      setDisconnecting(true);
      try {
         await IntegrationService.disconnect(integration.slug);
         markDisconnected(integration.slug);
         show(`${integration.name} disconnected`, 'success');
      } catch (err) {
         show('Failed to disconnect. Please try again.', 'error');
      } finally {
         setDisconnecting(false);
         setShowConfirm(false);
      }
   };

   return (
      <article className="bg-glass rounded-xl p-5 md:p-6 glow-top border border-outline-variant/10 flex flex-col gap-4">
         {/* Header */}
         <div className="flex items-start gap-3">
            {integration.picUrl && (
               <Image
                  className="rounded-full object-cover"
                  width={25}
                  height={25}
                  src={integration.picUrl}
                  alt={integration.name}
               />
            )}
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-on-surface">{integration.name}</h3>
                  <StatusPill status={status} />
               </div>
            </div>
         </div>

         {/* Blurb */}
         <p className="text-sm text-on-surface-variant leading-relaxed">{integration.blurb}</p>

         {/* Footer */}
         <div className="mt-auto pt-3 border-t border-outline-variant/10 flex items-center justify-between gap-3">
            <div className="text-xs text-on-surface-variant">
               {!integration.available ? (
                  <span>On our roadmap</span>
               ) : !integration.connected ? (
                  <span>Not connected</span>
               ) : null}
            </div>
            <div className="flex items-center gap-2">
               {integration.connected ? (
                  <>
                     <button
                        type="button"
                        onClick={() => setShowConfirm(true)}
                        className="px-3 py-1.5 rounded-lg border border-error/30 text-error text-xs font-semibold tracking-wider uppercase hover:bg-error/10 transition-colors inline-flex items-center gap-1.5"
                     >
                        <Unplug className="w-3 h-3" strokeWidth={2} />
                        Disconnect
                     </button>
                  </>
               ) : !integration.available ? (
                  <button
                     type="button"
                     disabled
                     className="px-3 py-1.5 rounded-lg border border-outline-variant/15 text-on-surface-variant/60 text-xs font-semibold tracking-wider uppercase cursor-not-allowed"
                  >
                     Notify me
                  </button>
               ) : (
                  <button
                     type="button"
                     disabled={connecting}
                     className="btn-primary px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 disabled:opacity-50"
                     onClick={async () => {
                        setConnecting(true);
                        try {
                           await IntegrationService.connect(integration.slug);
                        } finally {
                           setConnecting(false);
                        }
                     }}
                  >
                     {connecting ? (
                        <Loader2 className="w-3 h-3 animate-spin" strokeWidth={2.5} />
                     ) : (
                        <Plus className="w-3 h-3" strokeWidth={2.5} />
                     )}
                     {connecting ? 'Connecting…' : 'Connect'}
                  </button>
               )}
            </div>
         </div>

         {/* Disconnect confirmation overlay */}
         {showConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
               <div className="bg-surface-container rounded-2xl border border-outline-variant/15 p-6 w-full max-w-sm mx-4 flex flex-col gap-4">
                  <div>
                     <h3 className="text-base font-semibold text-on-surface">Disconnect {integration.name}?</h3>
                     <p className="text-sm text-on-surface-variant mt-1">
                        Your QuickBooks connection will be removed. You can reconnect at any time.
                     </p>
                  </div>
                  <div className="flex items-center justify-end gap-3">
                     <button
                        type="button"
                        onClick={() => setShowConfirm(false)}
                        className="px-4 py-2 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-wider uppercase hover:border-primary/40 transition-colors"
                     >
                        Cancel
                     </button>
                     <button
                        type="button"
                        onClick={handleDisconnect}
                        disabled={disconnecting}
                        className="px-4 py-2 rounded-lg bg-error text-on-error text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
                     >
                        {disconnecting ? 'Disconnecting…' : 'Disconnect'}
                     </button>
                  </div>
               </div>
            </div>
         )}
      </article>
   );
}

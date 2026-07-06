import { Integration } from '@/app/app/_data/integrations';
import { ExternalLink, Plus, Settings } from 'lucide-react';
import Image from 'next/image';
import StatusPill from './StatusPill';
import IntegrationService from '@/services/IntegrationService';

export default function IntegrationCard({ integration }: { integration: Integration }) {
   const status = integration.connected
      ? 'connected'
      : integration.available
        ? 'disconnected'
        : 'soon';

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
                        className="px-3 py-1.5 rounded-lg border border-outline-variant/20 text-on-surface text-xs font-semibold tracking-wider uppercase hover:border-primary/40 transition-colors inline-flex items-center gap-1.5"
                     >
                        <Settings className="w-3 h-3" strokeWidth={1.75} />
                        Configure
                     </button>
                     <a
                        href="#"
                        className="btn-primary px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
                     >
                        Open
                        <ExternalLink className="w-3 h-3" strokeWidth={2} />
                     </a>
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
                     className="btn-primary px-3 py-1.5 rounded-lg text-on-primary-container text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
                     onClick={async () => {
                        await IntegrationService.connect(integration.slug);
                     }}
                  >
                     <Plus className="w-3 h-3" strokeWidth={2.5} />
                     Connect
                  </button>
               )}
            </div>
         </div>
      </article>
   );
}

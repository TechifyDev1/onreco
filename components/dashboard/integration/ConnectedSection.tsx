'use client';
import { Plug } from 'lucide-react';
import IntegrationCard from './IntegrationCard';
import { useIntegrationStore } from '@/providers/integration-store';

export default function ConnectedSection() {
  const { connected } = useIntegrationStore();
  const connectedCount = connected.length;
  return (
    <section
      aria-label="Connected integrations"
      className="flex flex-col gap-4"
    >
      <header className="flex items-center justify-between">
        <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">
          Connected
        </h2>
        <span className="text-xs text-on-surface-variant">
          {connectedCount} active
        </span>
      </header>
      {connectedCount === 0 ? (
        <div className="bg-glass rounded-xl p-8 glow-top border border-outline-variant/10 flex flex-col items-center justify-center text-center gap-3 min-h-45">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Plug className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm font-semibold text-on-surface">
              No connected integrations
            </p>
            <p className="text-xs text-on-surface-variant max-w-xs mt-1">
              Connect QuickBooks, Xero, or other tools below to start syncing
              your ledger.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {connected.map((i) => (
            <IntegrationCard key={i.slug} integration={i} />
          ))}
        </div>
      )}
    </section>
  );
}

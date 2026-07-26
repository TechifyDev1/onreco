import { ArrowUpRight } from 'lucide-react';
import StatRow from '@/components/dashboard/integration/StatRow';
import ConnectedSection from '@/components/dashboard/integration/ConnectedSection';
import AvailableSection from '@/components/dashboard/integration/AvailableSection';
import ComingSoonSection from '@/components/dashboard/integration/ComingSoonSection';
import IntegrationStoreInitializer from '@/providers/IntegrationStoreInitializer';
import IntegrationService from '@/services/IntegrationService';
import { ApiError } from '@/services/ApiError';
import { Integration } from '@/app/app/_data/integrations';

export default async function Page() {
  let integrations: Integration[] = [];
  try {
    integrations = await IntegrationService.getSupportedIntegrations();
  } catch (error) {
    if (error instanceof ApiError) {
      console.error('[IntegrationsPage] Failed to fetch integrations:', error.message);
    } else {
      console.error('[IntegrationsPage] Failed to fetch integrations:', error);
    }
  }

  return (
    <>
      <IntegrationStoreInitializer integrations={integrations} />
      <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-on-surface">
              Integrations
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Connect your accounting platform, bank, and other tools. Onreco
              pushes categorized stablecoin activity wherever your team already
              works.
            </p>
          </div>
          <a
            href="mailto:techifydev1@gmail.com?subject=Integration%20Request"
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-on-surface-variant hover:text-primary transition-colors"
          >
            Request an integration
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
          </a>
        </header>

        {/* Stat row */}
        <StatRow />

        {/* Connected */}
        <ConnectedSection />

        {/* Available */}
        <AvailableSection />

        {/* Coming soon */}
        <ComingSoonSection />
      </div>
    </>
  );
}

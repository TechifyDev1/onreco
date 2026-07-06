'use client';

import { useIntegrationStore } from '@/providers/integration-store';
import IntegrationCard from './IntegrationCard';

export default function AvailableSection() {
  const { available } = useIntegrationStore();
  const availableCounts = available.length;
  return availableCounts > 0 ? (
    <section
      aria-label="Available integrations"
      className="flex flex-col gap-4 mt-2"
    >
      <header className="flex items-center justify-between">
        <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">
          Available
        </h2>
        <span className="text-xs text-on-surface-variant">
          {availableCounts} ready to connect
        </span>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {available.map((i) => (
          <IntegrationCard key={i.slug} integration={i} />
        ))}
      </div>
    </section>
  ) : null;
}

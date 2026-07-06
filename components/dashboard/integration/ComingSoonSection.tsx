'use client';
import { useIntegrationStore } from '@/providers/integration-store';
import IntegrationCard from './IntegrationCard';

const ComingSoonSection = () => {
  const { soon } = useIntegrationStore();
  const soonCount = soon.length;
  return soonCount > 0 ? (
    <section
      aria-label="Coming soon integrations"
      className="flex flex-col gap-4 mt-2"
    >
      <header className="flex items-center justify-between">
        <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">
          Coming soon
        </h2>
        <span className="text-xs text-on-surface-variant">
          Notify me when ready
        </span>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {soon.map((i) => (
          <IntegrationCard key={i.slug} integration={i} />
        ))}
      </div>
    </section>
  ) : null;
};

export default ComingSoonSection;

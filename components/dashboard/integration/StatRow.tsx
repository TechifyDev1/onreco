'use client';

import { useIntegrationStore } from '@/providers/integration-store';
import { AlertCircle, CheckCircle2, Plus, Sparkles } from 'lucide-react';

export default function StatRow() {
  const { available, connected, soon } = useIntegrationStore();
  const availableCounts = available.length;
  const connectedCount = connected.length;
  const soonCount = soon.length;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        {
          label: 'Connected',
          value: String(connectedCount),
          icon: CheckCircle2,
          accent: 'text-primary',
        },
        {
          label: 'Available',
          value: String(availableCounts),
          icon: Plus,
          accent: 'text-primary',
        },
        {
          label: 'Errors',
          value: String(0),
          icon: AlertCircle,
          accent: 'text-tertiary',
        },
        {
          label: 'Coming soon',
          value: String(soonCount),
          icon: Sparkles,
          accent: 'text-on-surface-variant',
        },
      ].map(({ label, value, icon: Icon, accent }) => (
        <div
          key={label}
          className="bg-glass rounded-xl p-5 glow-top border border-outline-variant/10"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
              {label}
            </span>
            <div
              className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center ${accent}`}
            >
              <Icon className="w-4 h-4" strokeWidth={1.75} />
            </div>
          </div>
          <div className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}

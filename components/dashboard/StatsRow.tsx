'use client';

import { ArrowDownLeft, ArrowUpRight, CheckCircle2, RefreshCw, TrendingDown, TrendingUp } from 'lucide-react';
import { useDashboardStore } from '@/providers/dashboard-store';

function formatUsd(value: number) {
   return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function formatChange(change: number) {
   const sign = change >= 0 ? '+' : '';
   return `${sign}${change.toFixed(1)}%`;
}

export default function StatsRow() {
   const summary = useDashboardStore((s) => s.summary);

   const inflow30d = summary?.inflow30d ?? 0;
   const outflow30d = summary?.outflow30d ?? 0;
   const inflowChange = summary?.inflowChange ?? 0;
   const outflowChange = summary?.outflowChange ?? 0;
   const reconciliationRate = summary?.reconciliationRate ?? 0;
   const pendingSync = summary?.pendingSync ?? 0;

   const stats = [
      {
         label: 'Inflow (30d)',
         value: formatUsd(inflow30d),
         delta: formatChange(inflowChange),
         deltaPositive: inflowChange >= 0,
         icon: ArrowDownLeft,
         accent: 'text-primary',
      },
      {
         label: 'Outflow (30d)',
         value: formatUsd(outflow30d),
         delta: formatChange(outflowChange),
         deltaPositive: outflowChange <= 0,
         icon: ArrowUpRight,
         accent: 'text-secondary',
      },
      {
         label: 'Reconciliation Rate',
         value: `${reconciliationRate.toFixed(1)}%`,
         delta: reconciliationRate >= 95 ? 'On track' : 'Needs attention',
         deltaPositive: reconciliationRate >= 95,
         icon: CheckCircle2,
         accent: 'text-primary',
      },
      {
         label: 'Pending Sync',
         value: String(pendingSync),
         delta: pendingSync === 0 ? 'All clear' : 'Ready to push',
         deltaPositive: pendingSync === 0,
         icon: RefreshCw,
         accent: 'text-secondary',
      },
   ];

   return (
      <section
         aria-label="Key metrics"
         className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
         {stats.map(({ label, value, delta, deltaPositive, icon: Icon, accent }) => (
            <div
               key={label}
               className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10"
            >
               <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-on-surface-variant">
                     {label}
                  </span>
                  <div className={`w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center ${accent}`}>
                     <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                  </div>
               </div>
               <div className="flex items-baseline gap-2">
                  <span className="text-[24px] leading-8 font-semibold tracking-tight text-on-surface">
                     {value}
                  </span>
               </div>
               <div className="mt-2 flex items-center gap-1.5 text-xs text-on-surface-variant">
                  {deltaPositive ? (
                     <TrendingUp className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                  ) : (
                     <TrendingDown className="w-3.5 h-3.5 text-secondary" strokeWidth={2} />
                  )}
                  <span className={deltaPositive ? 'text-primary font-medium' : 'text-secondary font-medium'}>
                     {delta}
                  </span>
               </div>
            </div>
         ))}
      </section>
   );
}

'use client';

import { useState } from 'react';
import { useDashboardStore } from '@/providers/dashboard-store';
import { BarChart3 } from 'lucide-react';
import type { ChartDataPoint } from '@/services/DashboardService';
import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
} from 'recharts';

type Range = '7d' | '14d' | '30d';

const RANGES: { id: Range; label: string }[] = [
   { id: '7d', label: '7D' },
   { id: '14d', label: '14D' },
   { id: '30d', label: '30D' },
];

function slicePoints(points: ChartDataPoint[], range: Range): ChartDataPoint[] {
   const days = range === '7d' ? 7 : range === '14d' ? 14 : 30;
   return points.slice(-days);
}

function formatDate(dateStr: string): string {
   const d = new Date(dateStr);
   return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatUsd(value: number): string {
   if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
   if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
   return `$${value.toFixed(2)}`;
}

function ChartTooltip({ active, payload, label }: any) {
   if (!active || !payload || !payload.length) return null;
   return (
      <div className="bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 shadow-lg text-xs">
         <p className="text-on-surface-variant font-semibold mb-2 uppercase tracking-wider">{label}</p>
         {payload.map((entry: any) => (
            <div key={entry.name} className="flex items-center gap-2 mb-1 last:mb-0">
               <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
               <span className="text-on-surface-variant capitalize">{entry.name}:</span>
               <span className="text-on-surface font-semibold">{formatUsd(entry.value ?? 0)}</span>
            </div>
         ))}
      </div>
   );
}

export default function ActivityChart() {
   const activityChart = useDashboardStore((s) => s.activityChart);
   const [range, setRange] = useState<Range>('7d');

   const slicedData = slicePoints(activityChart, range);
   const data = slicedData.map((p) => ({
      date: formatDate(p.date),
      inFlow: p.inFlow,
      outFlow: p.outFlow,
   }));

   const isEmpty =
      data.length === 0 ||
      (data.every((d) => d.inFlow === 0) && data.every((d) => d.outFlow === 0));

   return (
      <section aria-label="Stablecoin activity" className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10 relative overflow-hidden">
         <header className="flex items-center justify-between mb-6">
            <div>
               <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">Stablecoin Activity</h2>
               <div className="flex items-center gap-4 mt-1">
                  <p className="text-sm text-on-surface-variant">Inflow &amp; outflow over the selected period.</p>
                  <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.06em] uppercase text-on-surface-variant">
                     <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#b4c5ff] rounded inline-block" />Inflow</span>
                     <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#c5b4ff] rounded inline-block opacity-70" />Outflow</span>
                  </div>
               </div>
            </div>

            <div role="tablist" aria-label="Time range" className="flex items-center gap-1 p-1 rounded-lg bg-surface-container-low border border-outline-variant/10">
               {RANGES.map(({ id, label }) => {
                  const active = range === id;
                  return (
                     <button
                        key={id}
                        role="tab"
                        aria-selected={active}
                        onClick={() => setRange(id)}
                        className={
                           'px-3 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors ' +
                           (active ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface')
                        }
                     >
                        {label}
                     </button>
                  );
               })}
            </div>
         </header>

         <div className="w-full relative">
            <ResponsiveContainer width="100%" height={240}>
               <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                     <linearGradient id="grad-inflow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#b4c5ff" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#b4c5ff" stopOpacity="0" />
                     </linearGradient>
                     <linearGradient id="grad-outflow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c5b4ff" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#c5b4ff" stopOpacity="0" />
                     </linearGradient>
                  </defs>

                  <CartesianGrid
                     strokeDasharray="0"
                     stroke="rgba(141,144,160,0.08)"
                     vertical={false}
                  />

                  <XAxis
                     dataKey="date"
                     tick={{ fill: 'rgba(141,144,160,0.7)', fontSize: 10, fontWeight: 600 }}
                     axisLine={false}
                     tickLine={false}
                     tickMargin={10}
                     interval="preserveStartEnd"
                  />

                  <YAxis
                     tickFormatter={formatUsd}
                     tick={{ fill: 'rgba(141,144,160,0.7)', fontSize: 10, fontWeight: 600 }}
                     axisLine={false}
                     tickLine={false}
                     tickMargin={8}
                     width={60}
                  />

                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(180,197,255,0.15)', strokeWidth: 1 }} />

                  <Area
                     type="monotone"
                     dataKey="outFlow"
                     name="outflow"
                     stroke="#c5b4ff"
                     strokeWidth={1.5}
                     strokeDasharray="4 3"
                     fill="url(#grad-outflow)"
                     dot={false}
                     activeDot={{ r: 4, fill: '#c5b4ff', strokeWidth: 0 }}
                  />

                  <Area
                     type="monotone"
                     dataKey="inFlow"
                     name="inflow"
                     stroke="#b4c5ff"
                     strokeWidth={2}
                     fill="url(#grad-inflow)"
                     dot={false}
                     activeDot={{ r: 4, fill: '#b4c5ff', strokeWidth: 0 }}
                  />
               </AreaChart>
            </ResponsiveContainer>

            {isEmpty && (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-background/30 backdrop-blur-[1px] rounded-lg animate-fade-in">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                     <BarChart3 className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-sm font-semibold text-on-surface">No transaction activity recorded</h3>
                  <p className="text-xs text-on-surface-variant max-w-xs mt-1">Connect wallets to view inflows and outflows plotted over time.</p>
               </div>
            )}
         </div>
      </section>
   );
}

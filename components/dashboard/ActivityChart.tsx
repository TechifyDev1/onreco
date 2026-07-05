"use client";

import { useState } from "react";
import { useSimulationStore } from "@/providers/simulation-store";
import { BarChart3 } from "lucide-react";

type Range = "24h" | "7d" | "30d";

const RANGES: { id: Range; label: string }[] = [
    { id: "24h", label: "24H" },
    { id: "7d", label: "7D" },
    { id: "30d", label: "30D" },
];

// Hand-rolled SVG path. Series is deterministic per-range so the chart is stable
// across renders. No external chart lib — keeps the dependency surface flat.
const SERIES: Record<Range, number[]> = {
    "24h": [12, 18, 14, 22, 30, 26, 34, 28, 36, 42, 38, 48],
    "7d": [22, 30, 28, 36, 34, 44, 52],
    "30d": [10, 14, 18, 16, 22, 28, 26, 30, 36, 34, 42, 48, 52, 60, 58, 66, 72, 70, 80, 86, 82, 90, 96, 100, 108, 114, 110, 120, 128, 134],
};

function buildPath(values: number[], width: number, height: number, pad = 8) {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const span = Math.max(1, max - min);
    const stepX = (width - pad * 2) / (values.length - 1);
    return values
        .map((v, i) => {
            const x = pad + i * stepX;
            const y = pad + (height - pad * 2) * (1 - (v - min) / span);
            return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join(" ");
}

function buildArea(values: number[], width: number, height: number, pad = 8) {
    const path = buildPath(values, width, height, pad);
    return `${path} L${width - pad},${height - pad} L${pad},${height - pad} Z`;
}

export default function ActivityChart() {
    const { isEmptySimulated } = useSimulationStore();
    const [range, setRange] = useState<Range>("7d");
    
    // If empty simulated, map all series values to 0
    const rawValues = SERIES[range];
    const values = isEmptySimulated ? Array(rawValues.length).fill(0) : rawValues;

    const W = 800;
    const H = 240;

    return (
        <section
            aria-label="Stablecoin activity"
            className="bg-glass rounded-xl p-6 glow-top border border-outline-variant/10 relative overflow-hidden"
        >
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-[20px] leading-7 font-semibold tracking-tight text-on-surface">
                        Stablecoin Activity
                    </h2>
                    <p className="text-sm text-on-surface-variant mt-1">
                        USDT and USDC inflow over the selected period.
                    </p>
                </div>

                {/* Range toggle */}
                <div
                    role="tablist"
                    aria-label="Time range"
                    className="flex items-center gap-1 p-1 rounded-lg bg-surface-container-low border border-outline-variant/10"
                >
                    {RANGES.map(({ id, label }) => {
                        const active = range === id;
                        return (
                            <button
                                key={id}
                                role="tab"
                                aria-selected={active}
                                onClick={() => setRange(id)}
                                className={
                                    "px-3 py-1.5 rounded-md text-xs font-semibold tracking-[0.05em] uppercase transition-colors " +
                                    (active
                                        ? "bg-primary-container text-on-primary-container"
                                        : "text-on-surface-variant hover:text-on-surface")
                                }
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </header>

            <div className="w-full overflow-hidden relative">
                <svg
                    viewBox={`0 0 ${W} ${H}`}
                    preserveAspectRatio="none"
                    className="w-full h-[240px]"
                    role="img"
                    aria-label={`Activity chart for ${range}`}
                >
                    <defs>
                        <linearGradient id="activity-fill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#b4c5ff" stopOpacity={isEmptySimulated ? "0.05" : "0.35"} />
                            <stop offset="100%" stopColor="#b4c5ff" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Faint horizontal grid lines */}
                    {[0, 1, 2, 3].map((i) => (
                        <line
                            key={i}
                            x1={0}
                            x2={W}
                            y1={(H / 4) * i + 0.5}
                            y2={(H / 4) * i + 0.5}
                            stroke="rgba(141,144,160,0.10)"
                            strokeWidth={1}
                        />
                    ))}

                    {/* Area + line */}
                    <path d={buildArea(values, W, H)} fill="url(#activity-fill)" />
                    <path
                        d={buildPath(values, W, H)}
                        fill="none"
                        stroke="#b4c5ff"
                        strokeWidth={2}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className={isEmptySimulated ? "opacity-20" : ""}
                    />
                </svg>

                {isEmptySimulated && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-background/30 backdrop-blur-[1px] rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                            <BarChart3 className="w-5 h-5" strokeWidth={1.75} />
                        </div>
                        <h3 className="text-sm font-semibold text-on-surface">No transaction activity recorded</h3>
                        <p className="text-xs text-on-surface-variant max-w-xs mt-1">
                            Connect wallets to view inflows and outflows plotted over time.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}


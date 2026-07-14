'use client';

import type { DashboardSummary } from '@/services/DashboardService';
import { useHydratedDashboardStore } from './dashboard-store';

export default function DashboardStoreInitializer({ summary }: { summary: DashboardSummary }) {
   useHydratedDashboardStore(summary);
   return null;
}

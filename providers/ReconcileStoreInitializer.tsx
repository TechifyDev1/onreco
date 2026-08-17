"use client";
import type { ReconcileResponse } from "@/app/app/_data/reconciliation";
import { useHydratedReconcileStore } from "./reconcile-store";

export default function ReconcileStoreInitializer({
    data,
}: {
    data: ReconcileResponse;
}) {
    useHydratedReconcileStore(data);
    return null;
}

'use client';
import { Integration } from '@/app/app/_data/integrations';
import { useEffect } from 'react';
import { create } from 'zustand';

interface IntegrationStoreState {
  setIntegrations: (integrations: Integration[]) => void;
  integrations: Integration[] | null;
  readonly connected: Integration[];
  readonly available: Integration[];
  readonly soon: Integration[];
}

export const useIntegrationStore = create<IntegrationStoreState>(
  (set, get) => ({
    setIntegrations: (integrations) => {
      set({ integrations });
    },
    integrations: null,
    get connected() {
      return get().integrations?.filter((i) => i.connected) ?? [];
    },
    get available() {
      return (
        get().integrations?.filter((i) => i.available && !i.connected) ?? []
      );
    },
    get soon() {
      return get().integrations?.filter((i) => !i.available) ?? [];
    },
  })
);

export function useHydratedIntegrationStore(integrations: Integration[]) {
  const { setIntegrations } = useIntegrationStore();
  useEffect(() => {
    setIntegrations(integrations);
  }, [integrations, setIntegrations]);
}

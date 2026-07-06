'use client';
import { Integration } from '@/app/app/_data/integrations';
import { useEffect } from 'react';
import { create } from 'zustand';

interface IntegrationStoreState {
  integrations: Integration[];
  connected: Integration[];
  available: Integration[];
  soon: Integration[];
  setIntegrations: (integrations: Integration[]) => void;
}

export const useIntegrationStore = create<IntegrationStoreState>((set) => ({
  integrations: [],
  connected: [],
  available: [],
  soon: [],

  setIntegrations: (integrations) =>
    set({
      integrations,
      connected: integrations.filter((i) => i.connected),
      available: integrations.filter((i) => i.available && !i.connected),
      soon: integrations.filter((i) => !i.available),
    }),
}));

export function useHydratedIntegrationStore(integrations: Integration[]) {
  const { setIntegrations } = useIntegrationStore();
  useEffect(() => {
    setIntegrations(integrations);
  }, [integrations, setIntegrations]);
}

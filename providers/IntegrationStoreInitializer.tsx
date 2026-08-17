'use client';
import { Integration } from '@/app/app/_data/integrations';
import { useHydratedIntegrationStore } from './integration-store';

export default function IntegrationStoreInitializer({
  integrations,
}: {
  integrations: Integration[];
}) {
  useHydratedIntegrationStore(integrations);
  return null;
}

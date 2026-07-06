import { Integration } from '@/app/app/_data/integrations';
import ApiClient from './ApiClient';

export default class IntegrationService {
  private static readonly integrationbasePath = '/integration';
  static async getSupportedIntegrations(): Promise<Integration[]> {
    const integrationResponse = await ApiClient.get<Integration[]>(
      `${this.integrationbasePath}/supported/accounts`
    );
    return integrationResponse.data;
  }
}

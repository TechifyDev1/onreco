import ApiClient from './ApiClient';
import IntegrationService from './IntegrationService';

export type QuickBooksAccount = {
  id: string;
  label: string;
  type: string;
};

export default class AccountService {
  static async getOffsetAccounts(): Promise<QuickBooksAccount[]> {
    const supported = await IntegrationService.getSupportedIntegrations();
    const connected = supported.find((i) => i.connected);
    if (!connected) return [];
    const response = await ApiClient.get<QuickBooksAccount[]>(
      `/integration/${connected.slug}/accounts`
    );
    return response.data;
  }
}

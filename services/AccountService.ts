import ApiClient from './ApiClient';

export type QuickBooksAccount = {
  id: string;
  label: string;
  type: string;
};

export default class AccountService {
  static async getOffsetAccounts(
    provider: string = 'quickbooks'
  ): Promise<QuickBooksAccount[]> {
    const response = await ApiClient.get<QuickBooksAccount[]>(
      `/integration/${provider}/accounts`
    );
    return response.data;
  }
}

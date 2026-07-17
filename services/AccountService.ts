import ApiClient from './ApiClient';

export type QuickBooksAccount = {
  id: string;
  label: string;
  type: string;
};

export default class AccountService {
  static async getOffsetAccounts(): Promise<QuickBooksAccount[]> {
    const response = await ApiClient.get<QuickBooksAccount[]>(
      '/integration/quickbooks/accounts'
    );
    return response.data;
  }
}

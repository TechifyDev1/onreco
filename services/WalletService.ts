import ApiClient from './ApiClient';
import type { AddWalletRequest, Wallet } from '@/app/app/_data/wallets';

export default class WalletService {
   private static readonly walletBasePath = '/integration/wallet';

   static async getWallets(): Promise<Wallet[]> {
      const response = await ApiClient.get<Wallet[]>(this.walletBasePath);
      return response.data;
   }

   static async addWallet(request: AddWalletRequest): Promise<Wallet> {
      const response = await ApiClient.post<Wallet, AddWalletRequest>(`${this.walletBasePath}/connect`, request);
      return response.data;
   }

   static async deleteWallet(walletId: string): Promise<void> {
      await ApiClient.delete(`${this.walletBasePath}/${walletId}`);
   }
}

import { Integration } from '@/app/app/_data/integrations';
import ApiClient from './ApiClient';
import { redirect } from 'next/navigation';

export default class IntegrationService {
   private static readonly integrationbasePath = '/integration';
   static async getSupportedIntegrations(): Promise<Integration[]> {
      const integrationResponse = await ApiClient.get<Integration[]>(
         `${this.integrationbasePath}/supported/accounts`
      );
      return integrationResponse.data;
   }

   static async connect(id: string) {
      const connectResponse = await ApiClient.get<ConnectState>(
         `${this.integrationbasePath}/${id}/connect`
      );
      const url = connectResponse.data.authorizationUrl;
      redirect(url);
   }
}

interface ConnectState {
   authorizationUrl: string;
}

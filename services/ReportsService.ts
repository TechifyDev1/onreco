import ApiClient from './ApiClient';
import type { ReportFormat, ReportTypeDescriptor } from '@/app/app/_data/reports';

export default class ReportsService {
   static async getReportTypes(): Promise<ReportTypeDescriptor[]> {
      const response = await ApiClient.get<ReportTypeDescriptor[]>('/report/types');
      return response.data;
   }

   static getReportUrl(type: string, format: ReportFormat, from: string, to: string): string {
      const params = new URLSearchParams({ format, from, to });
      return `/api/report/${type}?${params.toString()}`;
   }
}

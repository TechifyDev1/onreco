import ApiClient from './ApiClient';
import type { CreateRuleRequest, Rule, UpdateRuleRequest } from '@/app/app/_data/rules';

// Mirrors RuleController (com.qudus.onreco.rule.RuleController) at /api/rule.
export default class RuleService {
   private static readonly ruleBasePath = '/rule';

   static async getRules(): Promise<Rule[]> {
      const response = await ApiClient.get<Rule[]>(this.ruleBasePath);
      return response.data;
   }

   static async createRule(request: CreateRuleRequest): Promise<Rule> {
      const response = await ApiClient.post<Rule, CreateRuleRequest>(
         this.ruleBasePath,
         request
      );
      return response.data;
   }

   static async updateRule(ruleId: string, request: UpdateRuleRequest): Promise<Rule> {
      const response = await ApiClient.put<Rule, UpdateRuleRequest>(
         `${this.ruleBasePath}/${ruleId}`,
         request
      );
      return response.data;
   }

   static async deleteRule(ruleId: string): Promise<void> {
      await ApiClient.delete(`${this.ruleBasePath}/${ruleId}`);
   }
}

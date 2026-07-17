// Mirrors the backend RuleResponse / RuleRequest exactly.
// See com.qudus.onreco.rule.RuleResponse & RuleRequest.

export type RuleDirection = 'RECEIVED' | 'SENT';

export type Rule = {
   id: string;
   name: string;
   walletId: string | null;
   walletLabel: string | null;
   walletAddress: string | null;
   walletChain: string | null;
   direction: RuleDirection | null;
   counterpartyAddress: string | null;
   offsetAccountId: string;
   active: boolean;
   priority: number;
   createdAt: string;
   updatedAt: string;
};

export type CreateRuleRequest = {
   name: string;
   walletId?: string | null;
   direction?: RuleDirection | null;
   counterpartyAddress?: string | null;
   offsetAccountId: string;
   priority: number;
   active?: boolean;
};

export type UpdateRuleRequest = CreateRuleRequest;

export const RULE_DIRECTIONS: { value: RuleDirection; label: string }[] = [
   { value: 'RECEIVED', label: 'Received' },
   { value: 'SENT', label: 'Sent' },
];

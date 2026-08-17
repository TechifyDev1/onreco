import { create } from 'zustand';
import type { Rule } from '@/app/app/_data/rules';

interface RuleState {
   rules: Rule[];
   loading: boolean;
   error: string | null;

   setRules: (rules: Rule[]) => void;
   addRule: (rule: Rule) => void;
   updateRule: (rule: Rule) => void;
   removeRule: (id: string) => void;

   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
}

export const useRuleStore = create<RuleState>((set) => ({
   rules: [],
   loading: false,
   error: null,

   setRules: (rules) => set({ rules }),
   addRule: (rule) => set((s) => ({ rules: [rule, ...s.rules] })),
   updateRule: (rule) =>
      set((s) => ({ rules: s.rules.map((r) => (r.id === rule.id ? rule : r)) })),
   removeRule: (id) => set((s) => ({ rules: s.rules.filter((r) => r.id !== id) })),

   setLoading: (loading) => set({ loading }),
   setError: (error) => set({ error }),
}));

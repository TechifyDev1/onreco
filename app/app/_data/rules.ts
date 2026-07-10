import {
    ArrowRight,
    GitBranch,
    Repeat,
    Wallet,
} from "lucide-react";

export type ConditionIcon =
    | typeof Wallet
    | typeof ArrowRight
    | typeof GitBranch
    | typeof Repeat;

export type Condition = {
    icon: ConditionIcon;
    label: string;
    value: string;
};

export type Action = {
    label: string;
    value: string;
};

export type Rule = {
    id: string;
    name: string;
    description: string;
    conditions: Condition[];
    action: Action;
    triggered: number;
    lastRun: string;
    status: "active" | "paused";
};


export const RULES: Rule[] = [
    {
        id: "r1",
        name: "Treasury → Payroll",
        description: "Tag outgoing payments from the Treasury wallet as Payroll.",
        conditions: [{ icon: Wallet, label: "Wallet", value: "= 0x9a2c…f31e" }],
        action: { label: "Category", value: "= Payroll" },
        triggered: 142,
        lastRun: "12 min ago",
        status: "active",
    },
    {
        id: "r2",
        name: "Small software expenses",
        description: "Anything under $50 outgoing gets auto-categorized.",
        conditions: [
            { icon: ArrowRight, label: "Direction", value: "= Outgoing" },
            { icon: GitBranch, label: "Amount", value: "< $50" },
        ],
        action: { label: "Category", value: "= Software Expense" },
        triggered: 38,
        lastRun: "1 hr ago",
        status: "active",
    },
    {
        id: "r3",
        name: "Recurring contractor payments",
        description: "Monthly recurring outgoing payments → Contractor Payment.",
        conditions: [
            { icon: Repeat, label: "Recurring", value: "= Monthly" },
            { icon: ArrowRight, label: "Direction", value: "= Outgoing" },
        ],
        action: { label: "Category", value: "= Contractor Payment" },
        triggered: 24,
        lastRun: "2 days ago",
        status: "active",
    },
    {
        id: "r4",
        name: "Flag unusual inflows",
        description: "Flag any single inflow over $50,000 for manual review.",
        conditions: [
            { icon: ArrowRight, label: "Direction", value: "= Incoming" },
            { icon: GitBranch, label: "Amount", value: "> $50,000" },
        ],
        action: { label: "Status", value: "= Needs Review" },
        triggered: 3,
        lastRun: "Yesterday",
        status: "paused",
    },
];

export const RULE_SUGGESTIONS: Rule[] = [
    {
        id: "s1",
        name: "Treasury → Payroll",
        description: "Tag outgoing payments from the Treasury wallet as Payroll.",
        conditions: [{ icon: Wallet, label: "Wallet", value: "= 0x9a2c…f31e" }],
        action: { label: "Category", value: "= Payroll" },
        triggered: 0,
        lastRun: "—",
        status: "paused",
    },
    {
        id: "s2",
        name: "Small software expenses",
        description: "Anything under $50 outgoing gets auto-categorized.",
        conditions: [
            { icon: ArrowRight, label: "Direction", value: "= Outgoing" },
            { icon: GitBranch, label: "Amount", value: "< $50" },
        ],
        action: { label: "Category", value: "= Software Expense" },
        triggered: 0,
        lastRun: "—",
        status: "paused",
    },
    {
        id: "s3",
        name: "Recurring contractor payments",
        description: "Monthly recurring outgoing payments → Contractor Payment.",
        conditions: [
            { icon: Repeat, label: "Recurring", value: "= Monthly" },
            { icon: ArrowRight, label: "Direction", value: "= Outgoing" },
        ],
        action: { label: "Category", value: "= Contractor Payment" },
        triggered: 0,
        lastRun: "—",
        status: "paused",
    },
];

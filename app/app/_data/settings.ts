import type {
    Bell,
    Building2,
    CreditCard,
    ShieldCheck,
    Users,
} from "lucide-react";

export type SettingsSection = {
    id: string;
    label: string;
    icon: typeof Building2;
    blurb: string;
};

export const SETTINGS_SECTIONS: SettingsSection[] = [
    { id: "organization", label: "Organization", icon: Building2, blurb: "Workspace name, default currency, and accounting preferences." },
    { id: "team", label: "Team Members", icon: Users, blurb: "Invite teammates and assign roles." },
    { id: "notifications", label: "Notifications", icon: Bell, blurb: "Choose what Onreco emails you about." },
    { id: "security", label: "Security", icon: ShieldCheck, blurb: "Two-factor auth, sessions, and API keys." },
    { id: "billing", label: "Billing", icon: CreditCard, blurb: "Current plan, invoices, and payment method." },
];

export type TeamRole = "Owner" | "Admin" | "Accountant" | "Viewer";

export type TeamMember = {
    name: string;
    email: string;
    role: TeamRole;
    lastActive: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
    { name: "John Doe", email: "john@acme.com", role: "Owner", lastActive: "Now" },
    { name: "Sarah Chen", email: "sarah@acme.com", role: "Admin", lastActive: "12 min ago" },
    { name: "Marcus Wright", email: "marcus@acme.com", role: "Accountant", lastActive: "2 hr ago" },
    { name: "Aisha Patel", email: "aisha@acme.com", role: "Viewer", lastActive: "Yesterday" },
];

export const ROLE_STYLES: Record<TeamRole, string> = {
    Owner: "bg-primary/10 text-primary",
    Admin: "bg-secondary/15 text-secondary",
    Accountant: "bg-surface-container-high text-on-surface",
    Viewer: "bg-surface-container-high text-on-surface-variant",
};

export const INVOICES: { date: string; amount: string; status: string }[] = [
    { date: "Oct 1, 2025", amount: "$149.00", status: "Paid" },
    { date: "Sep 1, 2025", amount: "$149.00", status: "Paid" },
    { date: "Aug 1, 2025", amount: "$149.00", status: "Paid" },
];

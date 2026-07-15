export type RoleKey = "owner" | "admin" | "manager" | "viewer";

export type Member = {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarBg: string;
  role: RoleKey;
  locations: string;
  lastActive: string;
  status: "Active" | "Invited";
  isYou?: boolean;
};

export type AuditEntry = {
  id: string;
  initials: string;
  avatarBg: string;
  html: string;
  time: string;
};

export const ROLES: {
  key: RoleKey;
  title: string;
  body: string;
  dot: string;
}[] = [
  {
    key: "owner",
    title: "Owner",
    body: "Full access — billing, payouts, settings, integrations, and the team. All locations.",
    dot: "bg-[#7A3FA0]",
  },
  {
    key: "admin",
    title: "Admin",
    body: "Manage settings, integrations, fees, and the team across every location. No billing.",
    dot: "bg-primary",
  },
  {
    key: "manager",
    title: "Manager",
    body: "Run assigned locations — payments, tables, reconciliation, refunds, and print signs.",
    dot: "bg-[#2E6C93]",
  },
  {
    key: "viewer",
    title: "Viewer",
    body: "Read-only reports and payment history for assigned locations. No changes.",
    dot: "bg-muted-foreground",
  },
];

export const MEMBERS: Member[] = [
  {
    id: "m1",
    name: "Jason King",
    email: "jason@fioregroup.com",
    initials: "JK",
    avatarBg: "linear-gradient(135deg,var(--color-primary),#F0A38A)",
    role: "owner",
    locations: "All locations",
    lastActive: "now",
    status: "Active",
    isYou: true,
  },
  {
    id: "m2",
    name: "Rosine Charles",
    email: "rosine@fioregroup.com",
    initials: "RC",
    avatarBg: "#7A6A9E",
    role: "admin",
    locations: "All locations",
    lastActive: "12m ago",
    status: "Active",
  },
  {
    id: "m3",
    name: "Daniela Ruiz",
    email: "daniela@fioregroup.com",
    initials: "DR",
    avatarBg: "#2E6C93",
    role: "manager",
    locations: "Fiore · SoHo",
    lastActive: "3m ago",
    status: "Active",
  },
  {
    id: "m4",
    name: "Marco Bellini",
    email: "marco@fioregroup.com",
    initials: "MB",
    avatarBg: "#3E7CB1",
    role: "manager",
    locations: "Fiore · Williamsburg",
    lastActive: "1h ago",
    status: "Active",
  },
  {
    id: "m5",
    name: "Alex Park",
    email: "alex@fioregroup.com",
    initials: "AP",
    avatarBg: "var(--color-faint)",
    role: "viewer",
    locations: "Fiore · Midtown",
    lastActive: "—",
    status: "Invited",
  },
];

export const AUDIT_LOG: AuditEntry[] = [
  {
    id: "a1",
    initials: "RC",
    avatarBg: "#7A6A9E",
    html: "<b>Rosine Charles</b> turned <b>off</b> passing card fees to customers — SoHo.",
    time: "Today · 2:14 PM",
  },
  {
    id: "a2",
    initials: "DR",
    avatarBg: "#2E6C93",
    html: "<b>Daniela Ruiz</b> issued a <b>$42.00</b> refund on Table 6.",
    time: "Today · 8:12 PM",
  },
  {
    id: "a3",
    initials: "JK",
    avatarBg: "linear-gradient(135deg,var(--color-primary),#F0A38A)",
    html: "<b>Jason King</b> invited <b>Alex Park</b> as Viewer — Midtown.",
    time: "Yesterday · 4:03 PM",
  },
  {
    id: "a4",
    initials: "MB",
    avatarBg: "#3E7CB1",
    html: "<b>Marco Bellini</b> connected <b>Fiore · Williamsburg</b> to Toast.",
    time: "Jun 29 · 11:20 AM",
  },
  {
    id: "a5",
    initials: "RC",
    avatarBg: "#7A6A9E",
    html: "<b>Rosine Charles</b> updated the payout bank to Chase ····1857.",
    time: "Jun 28 · 9:41 AM",
  },
];

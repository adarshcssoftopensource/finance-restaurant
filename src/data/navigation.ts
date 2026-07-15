import {
  BarChart3,
  CreditCard,
  Landmark,
  LayoutDashboard,
  LayoutGrid,
  LineChart,
  Plug,
  RotateCcw,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

import { paths } from "@/lib/paths";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
};

export const NAV_ITEMS: NavItem[] = [
  {
    to: paths.dashboard.overview.href,
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    to: paths.dashboard.tables.href,
    label: "Tables",
    icon: LayoutGrid,
    badge: 3,
  },
  {
    to: paths.dashboard.payments.href,
    label: "Payments",
    icon: CreditCard,
    badge: 6,
  },
  { to: paths.dashboard.refunds.href, label: "Refunds", icon: RotateCcw },
  {
    to: paths.dashboard.settlements.href,
    label: "Settlements",
    icon: Landmark,
  },
  { to: paths.dashboard.reports.href, label: "Reports", icon: BarChart3 },
  { to: paths.dashboard.insights.href, label: "Insights", icon: LineChart },
  { to: paths.dashboard.integrations.href, label: "Integrations", icon: Plug },
  { to: paths.dashboard.team.href, label: "Team", icon: Users },
  { to: paths.dashboard.settings.href, label: "Settings", icon: Settings },
];

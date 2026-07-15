import { createBrowserRouter, Navigate } from "react-router";

import { NotFound } from "@/components/common/not-found";
import { RouteError } from "@/components/common/route-error";
import type { ComponentType } from "react";
import { SplashScreen } from "@/components/common/splash-screen";
import RootLayout from "@/app/layout";
import DashboardLayout from "@/app/dashboard/layout";
import { AuthLayout } from "@/app/auth/layout";
import { paths } from "@/lib/paths";

export const importLazyRoute = async (
  importer: () => Promise<{
    default: ComponentType;
  }>,
) => {
  const module = await importer();

  return {
    Component: module.default,
  };
};

const dashboardRoutes = [
  {
    index: true as const,
    lazy: () => importLazyRoute(() => import("@/app/dashboard/page.tsx")),
  },
  {
    path: paths.dashboard.tables.segment,
    lazy: () =>
      importLazyRoute(() => import("@/app/dashboard/tables/page.tsx")),
  },
  {
    path: paths.dashboard.payments.segment,
    lazy: () =>
      importLazyRoute(() => import("@/app/dashboard/payments/page.tsx")),
  },
  {
    path: paths.dashboard.refunds.segment,
    lazy: () =>
      importLazyRoute(() => import("@/app/dashboard/refunds/page.tsx")),
  },
  {
    path: paths.dashboard.settlements.segment,
    lazy: () =>
      importLazyRoute(() => import("@/app/dashboard/settlements/page.tsx")),
  },
  {
    path: paths.dashboard.reports.segment,
    lazy: () =>
      importLazyRoute(() => import("@/app/dashboard/reports/page.tsx")),
  },
  {
    path: paths.dashboard.insights.segment,
    lazy: () =>
      importLazyRoute(() => import("@/app/dashboard/insights/page.tsx")),
  },
  {
    path: paths.dashboard.integrations.segment,
    lazy: () =>
      importLazyRoute(() => import("@/app/dashboard/integrations/page.tsx")),
  },
  {
    path: paths.dashboard.team.segment,
    lazy: () => importLazyRoute(() => import("@/app/dashboard/team/page.tsx")),
  },
  {
    path: paths.dashboard.settings.segment,
    lazy: () =>
      importLazyRoute(() => import("@/app/dashboard/settings/page.tsx")),
  },
];

const authRoutes = [
  { index: true, element: <Navigate to={paths.auth.signIn.segment} replace /> },
  {
    path: paths.auth.signIn.segment,
    lazy: () => importLazyRoute(() => import("@/app/auth/sign-in/page.tsx")),
  },
  {
    path: paths.auth.signUp.segment,
    lazy: () => importLazyRoute(() => import("@/app/auth/sign-up/page.tsx")),
  },
  {
    path: paths.auth.forgotPassword.segment,
    lazy: () =>
      importLazyRoute(() => import("@/app/auth/forgot-password/page.tsx")),
  },
  {
    path: paths.auth.forgotPasswordSent.segment,
    lazy: () =>
      importLazyRoute(() => import("@/app/auth/forgot-password/sent/page.tsx")),
  },
  {
    path: paths.auth.resetPassword.segment,
    lazy: () =>
      importLazyRoute(() => import("@/app/auth/reset-password/page.tsx")),
  },
];

export const router = createBrowserRouter([
  {
    path: paths.home.href,
    HydrateFallback: SplashScreen,
    errorElement: <RouteError />,
    Component: RootLayout,
    children: [
      {
        index: true,
        lazy: () => importLazyRoute(() => import("@/app/page.tsx")),
      },
      {
        path: paths.dashboard.href,
        Component: DashboardLayout,
        children: dashboardRoutes,
      },
    ],
  },
  {
    path: paths.auth.href,
    Component: AuthLayout,
    children: authRoutes,
  },

  { path: "*", element: <NotFound /> },
]);

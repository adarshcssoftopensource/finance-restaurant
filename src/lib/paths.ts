const dashboardRoot = "/dashboard";
const authRoot = "/auth";

function withSearch(
  base: string,
  params?: Record<string, string | number | undefined>,
) {
  if (!params) return base;
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== "") search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `${base}?${query}` : base;
}

export const paths = {
  home: {
    href: "/",
  },
  dashboard: {
    href: dashboardRoot,
    overview: { href: dashboardRoot },
    tables: { href: `${dashboardRoot}/tables`, segment: "tables" },
    payments: { href: `${dashboardRoot}/payments`, segment: "payments" },
    refunds: { href: `${dashboardRoot}/refunds`, segment: "refunds" },
    settlements: {
      href: `${dashboardRoot}/settlements`,
      segment: "settlements",
    },
    reports: { href: `${dashboardRoot}/reports`, segment: "reports" },
    insights: { href: `${dashboardRoot}/insights`, segment: "insights" },
    integrations: {
      href: `${dashboardRoot}/integrations`,
      segment: "integrations",
    },
    team: { href: `${dashboardRoot}/team`, segment: "team" },
    settings: { href: `${dashboardRoot}/settings`, segment: "settings" },
  },
  auth: {
    href: authRoot,
    signIn: { href: `${authRoot}/sign-in`, segment: "sign-in" },
    signUp: {
      href: `${authRoot}/sign-up`,
      segment: "sign-up",
      getHref: (params?: { step?: number }) =>
        withSearch(`${authRoot}/sign-up`, params),
    },
    forgotPassword: {
      href: `${authRoot}/forgot-password`,
      segment: "forgot-password",
    },
    forgotPasswordSent: {
      href: `${authRoot}/forgot-password/sent`,
      segment: "forgot-password/sent",
      getHref: (params?: { email?: string }) =>
        withSearch(`${authRoot}/forgot-password/sent`, params),
    },
    resetPassword: {
      href: `${authRoot}/reset-password`,
      segment: "reset-password",
      getHref: (params: { token: string }) =>
        withSearch(`${authRoot}/reset-password`, params),
    },
  },
} as const;

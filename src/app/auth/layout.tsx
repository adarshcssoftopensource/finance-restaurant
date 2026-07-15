import { Link, Outlet, useLocation, useNavigate } from "react-router";

import { paths } from "@/lib/paths";
import { Logo } from "@/components/common/logo";

export function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignupFlow = location.pathname.startsWith(paths.auth.signUp.href);

  return (
    <div className="grid min-h-screen lg:grid-cols-[440px_1fr]">
      <AuthBrandPanel />

      <main className="flex min-w-0 flex-col px-5 py-6 sm:px-10">
        <div className="flex min-h-6 items-center justify-end gap-2.5 text-[13.5px] text-muted-foreground">
          <span>
            {isSignupFlow
              ? "Already have an account?"
              : "New to Finance Restaurants?"}
          </span>
          <button
            type="button"
            onClick={() =>
              void navigate(
                isSignupFlow ? paths.auth.signIn.href : paths.auth.signUp.href,
              )
            }
            className="font-bold text-coral-d"
          >
            {isSignupFlow ? "Sign in" : "Create an account"}
          </button>
        </div>

        <div className="mx-auto my-auto w-full max-w-[430px] py-7">
          <div className="rounded-[22px] border border-line bg-paper p-7 shadow-[0_24px_60px_-34px_rgba(26,23,20,0.35)] sm:px-8 sm:pt-8 sm:pb-7">
            <Outlet />
          </div>

          <div className="flex flex-wrap justify-center gap-5 pt-5 font-mono text-[10.5px] text-faint">
            <span>© 2026 Finance Technologies LLC</span>
            <Link to="#" className="hover:text-ink2">
              Help
            </Link>
            <Link to="#" className="hover:text-ink2">
              Status
            </Link>
            <Link to="#" className="hover:text-ink2">
              pay.finance.com
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function AuthBrandPanel() {
  return (
    <aside className="relative flex flex-col overflow-hidden bg-[linear-gradient(155deg,#F0674B,#D9462C)] px-6 py-8 text-white sm:px-11 sm:py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-46px] bottom-[-100px] text-[260px] leading-none font-extrabold opacity-[0.08] select-none sm:text-[430px]"
      >
        F
      </div>

      <div className="relative">
        <Logo variant="inverse" className="h-5 max-w-[148px]" />
      </div>

      <div className="relative my-auto py-8 sm:py-9">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] uppercase opacity-90">
          <span className="h-0.5 w-[18px] bg-white" />
          Pay at the table
        </div>
        <h1 className="mt-4 max-w-[10ch] text-[31px] leading-[1.05] font-extrabold tracking-tight sm:text-[41px]">
          The check pays itself.
        </h1>
        <p className="mt-4 max-w-[33ch] text-[14.5px] leading-relaxed opacity-95">
          Guests scan the QR on the table, see the bill, split it, tip, and pay
          — no app. Funds settle straight to your bank, next day.
        </p>

        <div
          aria-hidden
          className="mt-8 hidden max-w-[300px] rounded-2xl border border-white/22 bg-white/12 p-4 backdrop-blur-[3px] lg:block"
        >
          <div className="flex items-baseline justify-between">
            <b className="text-sm font-extrabold">Table 12</b>
            <span className="font-mono text-[9.5px] opacity-85">
              LIVE · 4 GUESTS
            </span>
          </div>
          <div className="mt-2 flex justify-between font-mono text-[11px] opacity-95">
            <span>Check</span>
            <span>$136.80</span>
          </div>
          <div className="mt-2 flex justify-between font-mono text-[11px] opacity-95">
            <span>Paid so far</span>
            <span>$102.60</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded bg-white/25">
            <div className="h-full w-3/4 rounded bg-white" />
          </div>
          <p className="mt-2 font-mono text-[9.5px] opacity-85">
            3 of 4 guests paid · 24s avg
          </p>
        </div>
      </div>

      <div className="relative flex flex-wrap gap-4 font-mono text-[10.5px] opacity-90">
        <BrandFoot icon="shield">Settles to your own bank</BrandFoot>
        <BrandFoot icon="bolt">Next-day payout</BrandFoot>
        <BrandFoot icon="card">Works with Toast</BrandFoot>
      </div>
    </aside>
  );
}

function BrandFoot({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: "shield" | "bolt" | "card";
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden>
        {icon === "shield" ? (
          <path
            d="M12 3l7 3v5c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V6l7-3z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        ) : icon === "bolt" ? (
          <path
            d="M13 2L4.5 12.5H11L10 22l8.5-10.5H12L13 2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        ) : (
          <>
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M3 10h18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </>
        )}
      </svg>
      {children}
    </span>
  );
}

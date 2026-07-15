import { paths } from "@/lib/paths";
import { Logo } from "@/components/common/logo";
import { LandingCta } from "@/features/landing/components/landing-cta";

/** Catch-all screen for any unmatched URL. */
export function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <Logo className="h-6" />

        <p
          aria-hidden
          className="text-[110px] font-extrabold leading-none tracking-[-0.04em] text-primary"
        >
          404
        </p>

        <div className="space-y-2">
          <h1 className="text-xl font-bold text-foreground">Page not found</h1>
          <p className="text-[14px] text-muted-foreground">
            The page you're looking for doesn't exist or has moved. Let's get
            you back on track.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <LandingCta to="/">Back home</LandingCta>
          <LandingCta variant="ghost" to={paths.dashboard.href}>
            Go to dashboard
          </LandingCta>
        </div>
      </div>
    </main>
  );
}

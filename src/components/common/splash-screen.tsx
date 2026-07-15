import { Logo } from "@/components/common/logo";

/** Full-viewport branded loader shown while a lazily-loaded route chunk resolves. */
export function SplashScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="grid min-h-screen place-items-center bg-background"
    >
      <div className="flex flex-col items-center gap-5">
        <Logo className="h-6" />
        <span className="flex items-center gap-2.5 text-[13px] font-semibold text-muted-foreground">
          <span className="size-4 animate-spin rounded-full border-2 border-line border-t-primary" />
          Loading Finance…
        </span>
      </div>
    </div>
  );
}

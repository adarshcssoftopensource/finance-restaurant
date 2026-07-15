import { Link, NavLink } from "react-router";

import { usePreviewState, type PreviewState } from "@/store/app-store";
import { LiveDot } from "@/components/common/live-dot";
import { paths } from "@/lib/paths";
import { NAV_ITEMS } from "@/data/navigation";
import { Logo } from "@/components/common/logo";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const previewState = usePreviewState();

  return (
    <aside className="sticky top-0 hidden h-screen flex-col border-r bg-paper px-3.5 py-5 min-[820px]:flex">
      <div className="px-2 pb-5 pt-1.5">
        <Logo
          className="h-8 max-w-[220px]"
          href={paths.dashboard.overview.href}
        />
      </div>

      <div className="px-2.5 pb-[7px] pt-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-faint">
        Menu
      </div>
      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === paths.dashboard.overview.href}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center gap-[11px] rounded-[10px] px-2.5 py-[9px] text-[13.5px] font-semibold transition-colors",
                  isActive
                    ? "bg-coral-tint text-coral-d"
                    : "text-ink2 hover:bg-line2 hover:text-foreground",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <span className="absolute bottom-2 left-[3px] top-2 w-[3px] rounded-[3px] bg-primary" />
                  ) : null}
                  <Icon
                    className={cn(
                      "size-[18px] shrink-0",
                      isActive ? "opacity-100" : "opacity-80",
                    )}
                    strokeWidth={1.8}
                  />
                  {item.label}
                  {item.badge ? (
                    <span className="ml-auto rounded-full bg-primary px-[7px] py-px font-mono text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto border-t pt-3">
        <PosWidget state={previewState} />
      </div>
    </aside>
  );
}

function PosWidget({ state }: { state: PreviewState }) {
  if (state === "live") {
    return (
      <div
        className="flex items-center gap-2.5 rounded-[11px] border bg-card px-2.5 py-[9px]"
        title="POS connection"
      >
        <div className="grid size-[26px] shrink-0 place-items-center rounded-[7px] bg-foreground text-[13px] font-extrabold text-white">
          T
        </div>
        <div className="flex min-w-0 flex-col leading-[1.15]">
          <b className="text-[12.5px] font-bold">Toast</b>
          <span className="flex items-center gap-1 font-mono text-[9.5px] font-semibold text-success">
            <LiveDot pulse />
            Synced 2m ago
          </span>
        </div>
      </div>
    );
  }

  const error = state === "error";
  return (
    <Link
      to={paths.dashboard.integrations.href}
      className={cn(
        "flex items-center gap-2.5 rounded-[11px] border bg-card px-2.5 py-[9px]",
        error && "border-coral-soft",
      )}
      title="POS connection"
    >
      <div
        className={cn(
          "grid size-[26px] shrink-0 place-items-center rounded-[7px] text-[13px] font-extrabold text-white",
          error ? "bg-coral-d" : "bg-faint",
        )}
      >
        T
      </div>
      <div className="flex min-w-0 flex-col leading-[1.15]">
        <b className="text-[12.5px] font-bold">Toast</b>
        <span
          className={cn(
            "flex items-center gap-1 font-mono text-[9.5px] font-semibold",
            error ? "text-coral-d" : "text-muted-foreground",
          )}
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              error ? "bg-coral-d" : "bg-faint",
            )}
          />
          {error ? "Sync interrupted" : "Not connected"}
        </span>
      </div>
    </Link>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  Bell,
  Check,
  ChevronDown,
  Clock,
  Grid2x2,
  Landmark,
  Plus,
  type LucideIcon,
} from "lucide-react";

import {
  useAppActions,
  useDateRange,
  useLocation,
  usePreviewState,
  type PreviewState,
} from "@/store/app-store";
import { paths } from "@/lib/paths";
import { LiveDot } from "@/components/common/live-dot";
import { SegmentedControl } from "@/components/common/segmented-control";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ALERTS, type AlertTone } from "@/data/alerts";
import {
  ACCOUNT,
  LOCATIONS,
  LOCATION_ORDER,
  type LocationKey,
} from "@/data/locations";
import { cn } from "@/lib/utils";

const PREVIEW_OPTIONS: { value: PreviewState; label: string }[] = [
  { value: "live", label: "Live" },
  { value: "firstrun", label: "First run" },
  { value: "error", label: "Sync error" },
];

const ALERT_ICON: Record<AlertTone, LucideIcon> = {
  warning: Clock,
  destructive: AlertTriangle,
  success: Check,
  info: Landmark,
};

const ALERT_STYLE: Record<AlertTone, string> = {
  warning: "bg-warning-soft text-warning",
  destructive: "bg-coral-soft text-coral-d",
  success: "bg-success-soft text-success",
  info: "bg-[#E1EFF7] text-info",
};

export function Topbar() {
  const location = useLocation();
  const dateRange = useDateRange();
  const previewState = usePreviewState();
  const { setLocation, setDateRange, setPreviewState } = useAppActions();
  const navigate = useNavigate();
  const [alertsRead, setAlertsRead] = useState(false);

  const current =
    location === "all"
      ? { name: ACCOUNT.name, sub: ACCOUNT.sub }
      : LOCATIONS[location];

  function choosePreview(value: PreviewState) {
    setPreviewState(value);
    if (value === "firstrun") void navigate(paths.dashboard.href);
  }

  return (
    <header className="sticky top-0 z-20 flex items-center gap-[18px] border-b bg-background/80 px-4 py-3.5 backdrop-blur-md backdrop-saturate-150 min-[820px]:px-[30px]">
      {/* Venue / location switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-[11px] rounded-[10px] px-2 py-1 outline-none transition-colors hover:bg-paper data-[state=open]:bg-paper">
          <VenueLogo isAccount={location === "all"} />
          <span className="text-left leading-[1.12]">
            <b className="block text-[15px] font-bold tracking-[-0.02em]">
              {current.name}
            </b>
            <span className="block font-mono text-[10.5px] text-muted-foreground">
              {current.sub}
            </span>
          </span>
          <ChevronDown
            className="size-[15px] text-faint transition-transform group-data-[state=open]:rotate-180"
            strokeWidth={2}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[330px]">
          <DropdownMenuLabel>Fiore · 3 locations</DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={() => setLocation("all")}
            className={cn(location === "all" && "bg-coral-tint")}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-primary text-white">
              <Grid2x2 className="size-[17px]" strokeWidth={1.9} />
            </span>
            <span className="min-w-0 flex-1">
              <b className="block text-[13.5px] font-bold">{ACCOUNT.name}</b>
              <span className="font-mono text-[10px] text-muted-foreground">
                3 restaurants
              </span>
            </span>
            <span className="text-right">
              <span className="block font-mono text-[12.5px] font-bold">
                {ACCOUNT.menuAmount}
              </span>
              <span className="font-mono text-[9.5px] text-muted-foreground">
                today
              </span>
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {LOCATION_ORDER.map((key) => (
            <LocationRow
              key={key}
              locationKey={key}
              active={location === key}
              onSelect={() => setLocation(key)}
            />
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => {
              void navigate(paths.dashboard.integrations.href);
            }}
            className="font-bold text-coral-d"
          >
            <Plus className="size-4" strokeWidth={2} />
            Add a location
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="ml-auto flex items-center gap-3">
        {/* Preview state switcher (demo affordance) */}
        <div className="hidden items-center gap-1 rounded-[9px] border bg-paper py-[3px] pl-[9px] pr-[5px] lg:flex">
          <span className="flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-faint">
            <Eye />
            Preview
          </span>
          {PREVIEW_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => choosePreview(option.value)}
              className={cn(
                "rounded-md px-2 py-1 font-mono text-[10.5px] font-semibold transition-colors",
                previewState === option.value
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="hidden h-6 w-px bg-border lg:block" />

        <SegmentedControl
          value={dateRange}
          onChange={setDateRange}
          options={[
            { label: "Today", value: "today" },
            { label: "Week", value: "week" },
            { label: "Month", value: "month" },
          ]}
        />

        {/* Alerts */}
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Alerts"
            className="relative grid size-9 place-items-center rounded-[10px] border bg-card text-ink2 outline-none transition-colors hover:border-faint"
          >
            <Bell className="size-[17px]" strokeWidth={1.8} />
            {!alertsRead ? (
              <span className="absolute right-[7px] top-[6px] size-[9px] rounded-full border-2 border-background bg-primary" />
            ) : null}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[370px]">
            <div className="flex items-center justify-between px-2.5 py-2">
              <b className="text-[13.5px] font-bold">Alerts</b>
              <button
                type="button"
                onClick={() => setAlertsRead(true)}
                className="font-mono text-[10.5px] font-semibold text-coral-d"
              >
                Mark all read
              </button>
            </div>
            {ALERTS.map((alert) => {
              const Icon = ALERT_ICON[alert.tone];
              return (
                <DropdownMenuItem
                  key={alert.id}
                  className="items-start gap-[11px]"
                >
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-[9px]",
                      ALERT_STYLE[alert.tone],
                    )}
                  >
                    <Icon className="size-4" strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <b className="block text-[12.5px] font-bold">
                      {alert.title}
                    </b>
                    <span className="block text-[11.5px] leading-snug text-muted-foreground">
                      {alert.body}
                    </span>
                    <time className="mt-0.5 block font-mono text-[9.5px] text-faint">
                      {alert.time}
                    </time>
                  </span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Avatar>
          <AvatarFallback className="bg-linear-to-br from-primary to-[#F0A38A] text-white">
            JK
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function VenueLogo({ isAccount }: { isAccount: boolean }) {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-foreground text-[16px] font-extrabold text-background">
      {isAccount ? <Grid2x2 className="size-[18px]" strokeWidth={1.9} /> : "F"}
    </span>
  );
}

function LocationRow({
  locationKey,
  active,
  onSelect,
}: {
  locationKey: LocationKey;
  active: boolean;
  onSelect: () => void;
}) {
  const loc = LOCATIONS[locationKey];
  return (
    <DropdownMenuItem
      onSelect={onSelect}
      className={cn(active && "bg-coral-tint")}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-foreground text-[14px] font-extrabold text-white">
        {loc.initial}
      </span>
      <span className="min-w-0 flex-1">
        <b
          className={cn(
            "block text-[13.5px] font-bold",
            active && "text-coral-d",
          )}
        >
          {loc.name}
        </b>
        <span className="font-mono text-[10px] text-muted-foreground">
          {loc.city}
        </span>
      </span>
      <span className="text-right">
        <span className="block font-mono text-[12.5px] font-bold">
          {loc.menuAmount}
        </span>
        <span className="flex items-center justify-end gap-1 font-mono text-[9.5px] text-success">
          <LiveDot />
          Synced
        </span>
      </span>
    </DropdownMenuItem>
  );
}

function Eye() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-3"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

import { useState, type ReactNode } from "react";
import { Plus, RefreshCw } from "lucide-react";

import { usePreviewState } from "@/store/app-store";
import { LiveDot } from "@/components/common/live-dot";
import { PageHeader } from "@/components/common/page-header";
import { StatusPill } from "@/components/common/status-pill";
import {
  ConnectToastModal,
  SyncButton,
} from "@/features/dashboard/components/connect-toast-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LOCATIONS } from "@/data/locations";
import { POS_SYSTEMS } from "@/features/landing/data";

const CONNECTED = [
  { key: "soho" as const, tables: 24, sync: "2m ago" },
  { key: "wburg" as const, tables: 32, sync: "5m ago" },
  { key: "midtown" as const, tables: 35, sync: "1m ago" },
];

export default function Integrations() {
  const previewState = usePreviewState();
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <section>
      <PageHeader
        title="Integrations"
        subtitle="Connect Finance to the system you already run"
      />

      <p className="mb-5 max-w-[60ch] text-[14px] text-ink2">
        Finance Restaurants reads the live check from your point-of-sale and
        sends the payment back automatically.{" "}
        <b className="text-coral-d">We&apos;re starting with Toast</b> — more
        POS integrations are on the way.
      </p>

      {previewState === "live" ? (
        <ToastCardLive />
      ) : previewState === "firstrun" ? (
        <ToastCardFirstRun onConnect={() => setConnectOpen(true)} />
      ) : (
        <ToastCardError onConnect={() => setConnectOpen(true)} />
      )}

      {previewState === "live" ? (
        <>
          <Button className="mt-1" onClick={() => setConnectOpen(true)}>
            <Plus className="size-4" />
            Connect another location
          </Button>
          <div className="mt-1.5 space-y-2.5">
            {CONNECTED.map(({ key, tables, sync }) => (
              <div
                key={key}
                className="mt-2.5 flex items-center gap-3 rounded-xl border bg-card px-[15px] py-3"
              >
                <span className="grid size-[30px] shrink-0 place-items-center rounded-lg bg-foreground text-[13px] font-extrabold text-white">
                  F
                </span>
                <div>
                  <b className="text-[13.5px] font-bold">
                    {LOCATIONS[key].name}
                  </b>{" "}
                  <span className="font-mono text-[10.5px] text-muted-foreground">
                    · {tables} tables mapped
                  </span>
                </div>
                <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] font-bold text-success">
                  <LiveDot />
                  Synced {sync}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : null}

      <div className="mt-[26px]">
        <h4 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          On the roadmap
        </h4>
        <div className="grid grid-cols-2 gap-3 min-[1080px]:grid-cols-4">
          {POS_SYSTEMS.slice(0, 4).map((pos) => (
            <div
              key={pos.name}
              className="rounded-[13px] border bg-card p-4 text-center opacity-70"
            >
              <div className="text-[14px] font-bold">{pos.name}</div>
              <div className="mt-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">
                Coming soon
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConnectToastModal
        open={connectOpen}
        onClose={() => setConnectOpen(false)}
      />
    </section>
  );
}

function ToastCardShell({
  children,
  actions,
  error,
}: {
  children: ReactNode;
  actions: React.ReactNode;
  error?: boolean;
}) {
  return (
    <Card
      className={`mb-4 flex flex-row flex-wrap items-center gap-5 p-[22px] shadow-[0_1px_2px_rgba(26,23,20,0.04),0_12px_28px_-20px_rgba(26,23,20,0.22)] ${
        error ? "border-coral-soft" : ""
      }`}
    >
      {children}
      <div className="flex flex-wrap gap-2">{actions}</div>
    </Card>
  );
}

function ToastCardLive() {
  return (
    <ToastCardShell
      actions={
        <>
          <SyncButton />
          <Button variant="outline" size="sm">
            Manage
          </Button>
        </>
      }
    >
      <span className="grid size-14 shrink-0 place-items-center rounded-[14px] bg-foreground text-[26px] font-extrabold text-white">
        T
      </span>
      <div className="min-w-[180px] flex-1">
        <h3 className="flex items-center gap-2.5 text-[18px] font-extrabold">
          Toast{" "}
          <StatusPill tone="success" className="font-mono text-[10px]">
            Connected
          </StatusPill>
        </h3>
        <p className="mt-1.5 text-[12.5px] text-muted-foreground">
          Reads the live check for pay-at-table and marks it paid in Toast as
          guests pay.
        </p>
        <div className="mt-3 flex flex-wrap gap-[18px] text-[12px]">
          <Meta label="Locations" value="3 connected" />
          <Meta label="Last sync" value="2 minutes ago" />
          <Meta label="Tables mapped" value="91 of 91" />
        </div>
      </div>
    </ToastCardShell>
  );
}

function ToastCardFirstRun({ onConnect }: { onConnect: () => void }) {
  return (
    <ToastCardShell
      actions={
        <Button size="sm" onClick={onConnect}>
          <Plus className="size-4" />
          Connect Toast
        </Button>
      }
    >
      <span className="grid size-14 shrink-0 place-items-center rounded-[14px] bg-faint text-[26px] font-extrabold text-white">
        T
      </span>
      <div className="min-w-[180px] flex-1">
        <h3 className="text-[18px] font-extrabold">Toast</h3>
        <p className="mt-1.5 text-[12.5px] text-muted-foreground">
          Connect Toast to read the live check and start taking payments at the
          table.
        </p>
      </div>
    </ToastCardShell>
  );
}

function ToastCardError({ onConnect }: { onConnect: () => void }) {
  return (
    <ToastCardShell
      error
      actions={
        <Button size="sm" onClick={onConnect}>
          <RefreshCw className="size-4" />
          Reconnect
        </Button>
      }
    >
      <span className="grid size-14 shrink-0 place-items-center rounded-[14px] bg-coral-d text-[26px] font-extrabold text-white">
        T
      </span>
      <div className="min-w-[180px] flex-1">
        <h3 className="flex items-center gap-2.5 text-[18px] font-extrabold">
          Toast{" "}
          <StatusPill tone="destructive" className="font-mono text-[10px]">
            Sync interrupted
          </StatusPill>
        </h3>
        <p className="mt-1.5 text-[12.5px] text-muted-foreground">
          We lost the connection to Toast 12 minutes ago. New checks won&apos;t
          appear until you reconnect. Payments already taken are safe.
        </p>
        <div className="mt-3 flex flex-wrap gap-[18px] text-[12px]">
          <Meta label="Location" value="Fiore · New York" />
          <Meta label="Last sync" value="12 minutes ago" />
        </div>
      </div>
    </ToastCardShell>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-faint">
        {label}
      </div>
      {value}
    </div>
  );
}

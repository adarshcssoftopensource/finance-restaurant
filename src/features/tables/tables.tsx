import { useState } from "react";
import { Printer } from "lucide-react";

import { LiveDot } from "@/components/common/live-dot";
import { PageHeader } from "@/components/common/page-header";
import { CheckDrawer } from "@/features/dashboard/components/check-drawer";
import { PrintSignsOverlay } from "@/features/dashboard/components/print-signs-overlay";
import { Button } from "@/components/ui/button";
import type { Payment } from "@/data/payments";
import {
  FLOOR_STATS,
  FLOOR_TABLES,
  STATUS_LABEL,
  type FloorTable,
  type TableStatus,
} from "@/data/tables";
import { money } from "@/lib/format";
import { cn } from "@/lib/utils";

const STATUS_BORDER: Record<TableStatus, string> = {
  open: "before:bg-faint",
  view: "before:bg-info",
  pay: "before:bg-primary",
  paid: "before:bg-success",
};

const STATUS_DOT: Record<TableStatus, string> = {
  open: " text-muted-foreground",
  view: "text-info",
  pay: "text-coral-d pulse-ring",
  paid: "text-success",
};

export default function TablesPage() {
  const [selected, setSelected] = useState<Payment | null>(null);
  const [printOpen, setPrintOpen] = useState(false);

  return (
    <section>
      <PageHeader
        title="Tables"
        subtitle="Live floor · updates as guests pay · pulled from Toast"
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPrintOpen(true)}
            >
              <Printer className="size-4" />
              Print signs
            </Button>
            <span className="flex items-center gap-2 font-mono text-[11.5px] font-semibold text-success">
              <LiveDot pulse />
              Live
            </span>
          </>
        }
      />

      <div className="mb-[18px] flex flex-wrap gap-2.5">
        <FloorStat lead value={FLOOR_STATS.covers} label="covers seated" />
        <FloorStat value={FLOOR_STATS.open} label="Open" dotClass="bg-faint" />
        <FloorStat
          value={FLOOR_STATS.viewing}
          label="Viewing bill"
          dotClass="bg-info"
        />
        <FloorStat
          value={FLOOR_STATS.paying}
          label="Paying"
          dotClass="bg-primary"
        />
        <FloorStat
          value={FLOOR_STATS.paid}
          label="Paid"
          dotClass="bg-success"
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(176px,1fr))] gap-3.5">
        {FLOOR_TABLES.map((table) => (
          <TableBox
            key={table.id}
            table={table}
            onOpen={(p) => setSelected(p)}
          />
        ))}
      </div>

      <CheckDrawer payment={selected} onClose={() => setSelected(null)} />
      <PrintSignsOverlay open={printOpen} onClose={() => setPrintOpen(false)} />
    </section>
  );
}

function FloorStat({
  value,
  label,
  dotClass,
  lead,
}: {
  value: number;
  label: string;
  dotClass?: string;
  lead?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-[11px] rounded-[13px] border bg-card px-3.5 py-[11px] shadow-[0_1px_2px_rgba(26,23,20,0.04),0_12px_28px_-20px_rgba(26,23,20,0.22)]",
        lead && "border-foreground bg-foreground text-background",
      )}
    >
      <div
        className={cn(
          "font-mono text-[20px] font-bold leading-none tracking-[-0.03em]",
          lead && "text-background",
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          "flex items-center gap-1.5 text-[11.5px] font-semibold leading-tight",
          lead ? "text-faint" : "text-muted-foreground",
        )}
      >
        {dotClass ? (
          <i className={cn("size-2 rounded-full", dotClass)} />
        ) : null}
        {label}
      </div>
    </div>
  );
}

function TableBox({
  table,
  onOpen,
}: {
  table: FloorTable;
  onOpen: (payment: Payment) => void;
}) {
  const clickable = table.status === "paid" && table.payment;

  return (
    <div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={() => {
        if (table.payment) onOpen(table.payment);
      }}
      onKeyDown={(e) => {
        if (clickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          if (table.payment) onOpen(table.payment);
        }
      }}
      className={cn(
        "relative overflow-hidden rounded-[14px] border bg-card p-4 shadow-[0_1px_2px_rgba(26,23,20,0.04),0_12px_28px_-20px_rgba(26,23,20,0.22)] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1",
        STATUS_BORDER[table.status],
        clickable &&
          "cursor-pointer transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_rgba(26,23,20,0.4)]",
      )}
    >
      <div className="flex items-baseline justify-between">
        <span className="text-[18px] font-extrabold tracking-[-0.02em]">
          Table {table.table}
        </span>
        <span className="font-mono text-[10.5px] font-semibold text-muted-foreground">
          {table.guests} guests
        </span>
      </div>

      <div
        className={cn(
          "mt-2 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.06em]",
        )}
      >
        <i
          className={cn(
            "size-[7px] rounded-full bg-current",
            STATUS_DOT[table.status],
          )}
        />
        {STATUS_LABEL[table.status]}
      </div>

      <div className="tnum mt-3 font-mono text-[15px] font-bold">
        {table.status === "open" ? (
          <span className="text-faint">{table.detail}</span>
        ) : table.status === "pay" ? (
          <>
            {money(table.paidAmount ?? 0)}{" "}
            <small className="text-[11px] font-medium text-muted-foreground">
              / {money(table.amount ?? 0)}
            </small>
          </>
        ) : (
          <>
            {money(table.amount ?? 0)}
            {table.detail ? (
              <small className="block text-[11px] font-medium text-muted-foreground">
                {table.detail}
              </small>
            ) : null}
          </>
        )}
      </div>

      {table.status === "pay" && table.progress !== undefined ? (
        <>
          <div className="mt-2 h-[5px] overflow-hidden rounded-full bg-line2">
            <span
              className="block h-full rounded-full bg-primary"
              style={{ width: `${table.progress}%` }}
            />
          </div>
          <p className="mt-1.5 font-mono text-[10px] font-semibold text-muted-foreground">
            {table.paidCount} of {table.guests} guests paid
          </p>
        </>
      ) : null}

      {table.status === "view" && table.detail ? (
        <small className="mt-3 block text-[11px] font-medium text-muted-foreground">
          {table.detail}
        </small>
      ) : null}
    </div>
  );
}

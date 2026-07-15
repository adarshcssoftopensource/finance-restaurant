import { Check, Clock1, DollarSign, Download } from "lucide-react";

import { KpiCard } from "@/components/common/kpi-card";
import { PageHeader } from "@/components/common/page-header";
import { StatusPill } from "@/components/common/status-pill";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PAYOUTS, STATEMENTS } from "@/data/settlements";
import { money } from "@/lib/format";

export default function SettlementsPage() {
  return (
    <section>
      <PageHeader
        title="Settlements"
        subtitle="Money moving to your own bank — Finance never holds it"
      />

      <div className="mb-[18px] flex flex-wrap items-center gap-4 rounded-xl border border-[#BEE3CE] bg-success-soft px-[18px] py-[15px]">
        <span className="grid size-[34px] shrink-0 place-items-center rounded-[9px] bg-success text-white">
          <Check className="size-[18px]" strokeWidth={2.4} />
        </span>
        <div>
          <b className="text-[14px] font-bold">Reconciled with Toast</b>
          <span className="block text-[12px] text-ink2">
            Today&apos;s payments match the checks recorded in Toast · last
            checked 2 minutes ago
          </span>
        </div>
        <div className="ml-auto flex flex-wrap gap-[22px] max-[640px]:ml-0 max-[640px]:w-full max-[640px]:justify-between">
          <ReconStat label="Toast checks" value="$4,820.50" />
          <ReconStat label="Finance collected" value="$4,820.50" />
          <ReconStat label="Difference" value="$0.00" ok />
        </div>
      </div>

      <div className="mb-[18px] grid grid-cols-1 gap-3 min-[1080px]:grid-cols-3">
        <KpiCard
          icon={<DollarSign className="size-4" />}
          label="Settling tomorrow"
          value="$4,713.65"
          footer="from 38 payments today"
        />
        <KpiCard
          icon={<Clock1 className="size-4" />}
          label="In transit"
          value="$156.40"
          footer="1 payment · arrives soon"
        />
        <KpiCard
          icon={<Check className="size-4" />}
          label="Settled this week"
          value="$28,904.10"
          footer="across 6 payouts"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payout history</CardTitle>
          <span className="font-mono text-[11px] text-muted-foreground">
            Chase ····1857
          </span>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Payments</TableHead>
              <TableHead className="hidden min-[820px]:table-cell">
                Method mix
              </TableHead>
              <TableHead className="text-right">Finance fee</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PAYOUTS.map((payout) => (
              <TableRow key={payout.id}>
                <TableCell className="font-bold">
                  {payout.date}
                  {payout.sub ? (
                    <small className="block font-mono text-[10.5px] font-medium text-muted-foreground">
                      {payout.sub}
                    </small>
                  ) : null}
                </TableCell>
                <TableCell className="tnum">{payout.payments}</TableCell>
                <TableCell className="hidden font-mono text-[11px] text-muted-foreground min-[820px]:table-cell">
                  {payout.mix}
                </TableCell>
                <TableCell className="tnum text-right text-muted-foreground">
                  {money(payout.fee)}
                </TableCell>
                <TableCell className="tnum text-right font-bold">
                  {money(payout.amount)}
                </TableCell>
                <TableCell>
                  <StatusPill
                    tone={payout.status === "Settled" ? "success" : "warning"}
                  >
                    {payout.status}
                  </StatusPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Statements & tax</CardTitle>
          <span className="font-mono text-[11px] text-muted-foreground">
            Fiore group
          </span>
        </CardHeader>
        {STATEMENTS.map((stmt) => (
          <div
            key={stmt.id}
            className="flex items-center gap-3.5 border-b px-[18px] py-[13px] last:border-b-0"
          >
            <div>
              <div className="text-[13.5px] font-bold">{stmt.title}</div>
              <div className="font-mono text-[11px] text-muted-foreground">
                {stmt.info}
              </div>
            </div>
            {stmt.downloadable ? (
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11.5px] font-bold text-coral-d"
              >
                <Download className="size-3.5" strokeWidth={2} />
                Download
              </button>
            ) : (
              <StatusPill tone="warning" className="ml-auto">
                {stmt.pending}
              </StatusPill>
            )}
          </div>
        ))}
      </Card>
    </section>
  );
}

function ReconStat({
  label,
  value,
  ok,
}: {
  label: string;
  value: string;
  ok?: boolean;
}) {
  return (
    <div className="text-right">
      <div className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
        {label}
      </div>
      <div
        className={`tnum font-mono text-[14px] font-bold ${ok ? "text-success" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}

import {
  CheckCheck,
  DollarSign,
  RotateCcw,
  Shield,
  ShieldAlert,
} from "lucide-react";

import { KpiCard } from "@/components/common/kpi-card";
import { PageHeader } from "@/components/common/page-header";
import { RailIndicator } from "@/components/common/rail-indicator";
import { StatusPill } from "@/components/common/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DISPUTES, REFUNDS } from "@/data/refunds";
import { money } from "@/lib/format";

export default function RefundsPage() {
  return (
    <section>
      <PageHeader
        title="Refunds & disputes"
        subtitle="Refunds and card chargebacks — always resolved on the original rail"
      />

      <div className="mb-[18px] grid grid-cols-2 gap-3 min-[1080px]:grid-cols-4">
        <KpiCard
          icon={<DollarSign className="size-4" />}
          label="Refunds today"
          value="$84.00"
          footer="2 refunds · 1.7% of sales"
        />
        <KpiCard
          icon={<Shield className="size-4" />}
          label="Open disputes"
          value="1"
          footer="$156.40 · 1 needs response"
        />
        <KpiCard
          icon={<CheckCheck className="size-4" />}
          label="Win rate"
          value="82%"
          footer="last 90 days"
        />
        <KpiCard
          icon={<ShieldAlert className="size-4" />}
          label="Chargeback rate"
          value="0.04%"
          footer="well under network thresholds"
        />
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Refunds</CardTitle>
          <Button variant="outline" size="sm">
            Issue refund
          </Button>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="hidden min-[820px]:table-cell">
                Reason
              </TableHead>
              <TableHead className="hidden min-[820px]:table-cell">
                By
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {REFUNDS.map((refund) => (
              <TableRow key={refund.id}>
                <TableCell className="tnum text-muted-foreground">
                  {refund.time}
                </TableCell>
                <TableCell className="font-bold">
                  Table {refund.table}
                </TableCell>
                <TableCell>
                  <RailIndicator rail={refund.rail} label={refund.method} />
                </TableCell>
                <TableCell className="tnum text-right font-bold">
                  {money(refund.amount)}
                  {refund.partialOf ? (
                    <small className="text-muted-foreground">
                      {" "}
                      of {money(refund.partialOf)}
                    </small>
                  ) : null}
                </TableCell>
                <TableCell className="hidden min-[820px]:table-cell">
                  {refund.reason}
                </TableCell>
                <TableCell className="hidden tnum text-muted-foreground min-[820px]:table-cell">
                  {refund.by}
                </TableCell>
                <TableCell>
                  <StatusPill
                    tone={refund.status === "Refunded" ? "success" : "warning"}
                  >
                    {refund.status}
                  </StatusPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="flex gap-[7px] px-[18px] pb-4 text-[11px] leading-snug text-muted-foreground">
          <RotateCcw className="mt-px size-3.5 shrink-0" strokeWidth={1.7} />
          Refunds return to the guest on the rail they paid — Finance routes it
          at settlement, so money never sits in a Finance balance.
        </p>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Disputes & chargebacks</CardTitle>
          <span className="font-mono text-[11px] text-muted-foreground">
            card network cases
          </span>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Opened</TableHead>
              <TableHead className="hidden min-[820px]:table-cell">
                Card
              </TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="hidden min-[820px]:table-cell">
                Respond by
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {DISPUTES.map((dispute) => (
              <TableRow key={dispute.id}>
                <TableCell className="font-bold">
                  {dispute.opened}
                  <small className="block font-mono text-[10.5px] font-medium text-muted-foreground">
                    Table {dispute.table}
                  </small>
                </TableCell>
                <TableCell className="hidden tnum text-muted-foreground min-[820px]:table-cell">
                  {dispute.card}
                </TableCell>
                <TableCell className="tnum text-right font-bold">
                  {money(dispute.amount)}
                </TableCell>
                <TableCell>
                  <span className="rounded-md bg-line2 px-[7px] py-0.5 font-mono text-[10px] font-bold text-ink2">
                    {dispute.reasonCode}
                  </span>
                </TableCell>
                <TableCell className="hidden tnum text-muted-foreground min-[820px]:table-cell">
                  {dispute.respondBy ?? "—"}
                </TableCell>
                <TableCell>
                  <StatusPill
                    tone={
                      dispute.status === "Won"
                        ? "success"
                        : dispute.status === "Needs response"
                          ? "destructive"
                          : "warning"
                    }
                  >
                    {dispute.status}
                  </StatusPill>
                </TableCell>
                <TableCell className="text-right">
                  {dispute.status === "Needs response" ? (
                    <Button size="sm">Respond</Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}

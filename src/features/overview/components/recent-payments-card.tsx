import { Link } from "react-router";

import { RailIndicator } from "@/components/common/rail-indicator";
import { StatusPill } from "@/components/common/status-pill";
import { ToastSource } from "@/components/common/toast-source";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { paths } from "@/lib/paths";
import { PAYMENTS } from "@/data/payments";
import { money } from "@/lib/format";

const RECENT = PAYMENTS.slice(0, 6);

export function RecentPaymentsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent payments</CardTitle>
        <Link
          to={paths.dashboard.payments.href}
          className="font-mono text-[11.5px] font-semibold text-coral-d"
        >
          View all →
        </Link>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Table</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="hidden min-[820px]:table-cell">
              Source
            </TableHead>
            <TableHead className="text-right">Tip</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {RECENT.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-bold">
                Table {payment.table}
                <small className="block font-mono text-[10.5px] font-medium text-muted-foreground">
                  {payment.guests} guests
                </small>
              </TableCell>
              <TableCell>
                <RailIndicator rail={payment.rail} label={payment.method} />
              </TableCell>
              <TableCell className="hidden min-[820px]:table-cell">
                <ToastSource />
              </TableCell>
              <TableCell className="tnum text-right">
                {money(payment.tip)}
              </TableCell>
              <TableCell className="tnum text-right font-bold">
                {money(payment.amount)}
              </TableCell>
              <TableCell>
                <StatusPill
                  tone={payment.status === "Paid" ? "success" : "warning"}
                >
                  {payment.status}
                </StatusPill>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { RailIndicator } from "@/components/common/rail-indicator";
import { StatusPill } from "@/components/common/status-pill";
import { ToastSource } from "@/components/common/toast-source";
import { CheckDrawer } from "@/features/dashboard/components/check-drawer";
import { FilterChips } from "@/features/dashboard/components/filter-chips";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PAYMENTS, type Payment } from "@/data/payments";
import type { RailKey } from "@/data/rails";
import { RAIL_ORDER, RAILS } from "@/data/rails";
import { money } from "@/lib/format";

type Filter = "all" | RailKey;

const FILTER_OPTIONS: { label: string; value: Filter }[] = [
  { label: "All methods", value: "all" },
  ...RAIL_ORDER.map((key) => ({ label: RAILS[key].label, value: key })),
];

export default function PaymentsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Payment | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PAYMENTS.filter((p) => {
      if (filter !== "all" && p.rail !== filter) return false;
      if (!q) return true;
      return (
        p.method.toLowerCase().includes(q) ||
        String(p.table).includes(q) ||
        p.time.toLowerCase().includes(q) ||
        money(p.amount).includes(q)
      );
    });
  }, [filter, query]);

  return (
    <section>
      <PageHeader
        title="Payments"
        subtitle="Every check paid at the table, pulled live from Toast"
        actions={
          <>
            <label className="flex min-w-[250px] items-center gap-2 rounded-[10px] border bg-card px-3 py-2">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search table, amount, method…"
                aria-label="Search payments"
                className="w-full border-none bg-transparent text-[13.5px] outline-none"
              />
            </label>
            <Button variant="outline" size="sm">
              <Download className="size-4" />
              Export CSV
            </Button>
          </>
        }
      />

      <FilterChips
        options={FILTER_OPTIONS}
        value={filter}
        onChange={(value: Filter) => setFilter(value)}
      />

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="hidden min-[820px]:table-cell">
                Source
              </TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="hidden text-right min-[820px]:table-cell">
                Fee
              </TableHead>
              <TableHead className="text-right">Net to you</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((payment) => (
              <TableRow
                key={payment.id}
                className="cursor-pointer"
                onClick={() => setSelected(payment)}
              >
                <TableCell className="tnum text-muted-foreground">
                  {payment.time}
                </TableCell>
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
                <TableCell className="tnum text-right font-bold">
                  {money(payment.amount)}
                </TableCell>
                <TableCell className="tnum hidden text-right text-muted-foreground min-[820px]:table-cell">
                  {money(payment.fee)}
                </TableCell>
                <TableCell className="tnum text-right font-bold">
                  {money(payment.net)}
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

      <CheckDrawer payment={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

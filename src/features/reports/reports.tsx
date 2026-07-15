import { Check } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
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
import { money } from "@/lib/format";

const Z_LINES = [
  ["Net sales", "$3,772.66"],
  ["Finance Wallet", "$2,217.43"],
  ["Tax collected", "$335.54"],
  ["Credit & debit card", "$1,494.36"],
  ["Tips", "$712.30"],
  ["Guaranteed Bank", "$723.08"],
  ["Total collected", "$4,820.50", true],
  ["Pay over time", "$385.63"],
  ["Finance fees", "−$106.85"],
  ["Transactions", "38", true],
  ["Refunds", "−$84.00"],
  ["Avg check", "$126.85", true],
] as const;

const SECTIONS = [
  { name: "Main dining", covers: 31, checks: 18, sales: 2410.2 },
  { name: "Patio", covers: 14, checks: 11, sales: 1286.4 },
  { name: "Bar", covers: 8, checks: 9, sales: 750.0 },
];

const STAFF = [
  { name: "Marco B.", checks: 12, sales: 1540.2, tips: 284.6, pct: "18.5%" },
  { name: "Lena K.", checks: 11, sales: 1388.4, tips: 261.1, pct: "18.8%" },
  { name: "Priya S.", checks: 9, sales: 986.5, tips: 118.2, pct: "12.0%" },
  { name: "Sam T.", checks: 6, sales: 532.5, tips: 48.4, pct: "9.1%" },
];

const BARS = [
  { label: "Lunch\n11–3", value: "$620", h: "22%" },
  { label: "Aftn\n3–5", value: "$410", h: "14%", color: "bg-info" },
  { label: "Dinner\n5–10", value: "$2,690", h: "92%" },
  { label: "Late\n10–1", value: "$728", h: "26%", color: "bg-plum" },
];

export default function Reports() {
  return (
    <section>
      <PageHeader
        title="Reports"
        subtitle="Close out the day and export your books · Fiore · SoHo"
        actions={
          <>
            <Button variant="outline" size="sm">
              Export CSV
            </Button>
            <Button variant="outline" size="sm">
              QuickBooks
            </Button>
            <Button variant="outline" size="sm">
              Xero
            </Button>
          </>
        }
      />

      <div className="grid items-start gap-4 min-[1080px]:grid-cols-[1.55fr_1fr]">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Close of day · Z-report</CardTitle>
              <span className="font-mono text-[11px] text-muted-foreground">
                Tue, Jul 1
              </span>
            </CardHeader>
            <div className="grid grid-cols-1 gap-x-[30px] px-[18px] pb-4 min-[640px]:grid-cols-2">
              {Z_LINES.map(([label, value, sub]) => (
                <div
                  key={label}
                  className={`flex justify-between border-b border-line2 py-[9px] text-[13.5px] ${
                    sub ? "text-muted-foreground" : ""
                  }`}
                >
                  <span className="text-ink2">{label}</span>
                  <span className="tnum font-mono font-bold">{value}</span>
                </div>
              ))}
              <div className="col-span-full mt-1 flex justify-between border-t-2 border-line pt-[11px] text-[15px] font-extrabold">
                <span>Net after fees</span>
                <span className="tnum font-mono">$4,713.65</span>
              </div>
              <div className="col-span-full flex justify-between border-t-2 border-line pt-[11px] text-[15px] font-extrabold">
                <span>Net to account</span>
                <span className="tnum font-mono">$4,629.65</span>
              </div>
            </div>
            <div className="px-[18px] pb-[18px]">
              <Button size="sm">
                <Check className="size-4" />
                Close the day
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>By section</CardTitle>
              <span className="font-mono text-[11px] text-muted-foreground">
                covers & sales
              </span>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Section</TableHead>
                  <TableHead className="text-right">Covers</TableHead>
                  <TableHead className="text-right">Checks</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SECTIONS.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-bold">{row.name}</TableCell>
                    <TableCell className="tnum text-right">
                      {row.covers}
                    </TableCell>
                    <TableCell className="tnum text-right">
                      {row.checks}
                    </TableCell>
                    <TableCell className="tnum text-right font-bold">
                      {money(row.sales)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales by daypart</CardTitle>
            </CardHeader>
            <div className="flex h-[150px] items-end gap-3 px-5 pt-3.5">
              {BARS.map((bar) => (
                <div
                  key={bar.label}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-[7px]"
                >
                  <span className="tnum font-mono text-[10.5px] font-bold text-ink2">
                    {bar.value}
                  </span>
                  <div
                    className={`w-full max-w-[52px] rounded-t-[7px] ${bar.color ?? "bg-primary"}`}
                    style={{ height: bar.h }}
                  />
                  <span className="whitespace-pre-line text-center font-mono text-[10px] font-semibold text-muted-foreground">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Staff & tips</CardTitle>
              <Button variant="outline" size="sm">
                Export payroll
              </Button>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Server</TableHead>
                  <TableHead className="text-right">Checks</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                  <TableHead className="text-right">Tips</TableHead>
                  <TableHead className="hidden text-right min-[820px]:table-cell">
                    Tip %
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {STAFF.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-bold">{row.name}</TableCell>
                    <TableCell className="tnum text-right">
                      {row.checks}
                    </TableCell>
                    <TableCell className="tnum text-right font-bold">
                      {money(row.sales)}
                    </TableCell>
                    <TableCell className="tnum text-right">
                      {money(row.tips)}
                    </TableCell>
                    <TableCell className="tnum hidden text-right text-muted-foreground min-[820px]:table-cell">
                      {row.pct}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="px-[18px] pb-4 text-[11.5px] leading-snug text-muted-foreground">
              Reporting only — tips settle to your account with each check. You
              distribute them; Finance never holds or pays out tips.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

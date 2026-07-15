import { useState } from "react";
import { Clock, Shield, User, Wallet } from "lucide-react";

import { Delta } from "@/components/common/delta";
import { KpiCard } from "@/components/common/kpi-card";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ChartKey = "collected" | "avg" | "wallet";

const CHART_DATA: Record<ChartKey, { unit: "$" | "%"; vals: number[] }> = {
  collected: {
    unit: "$",
    vals: [
      3980, 4210, 3760, 4520, 4890, 5120, 4460, 4820, 5010, 4680, 4990, 5230,
      4820, 4970,
    ],
  },
  avg: {
    unit: "$",
    vals: [
      112, 118, 109, 121, 124, 120, 126, 123, 128, 119, 125, 131, 120, 127,
    ],
  },
  wallet: {
    unit: "%",
    vals: [37, 38, 36, 39, 41, 43, 42, 44, 45, 44, 46, 47, 46, 46],
  },
};

const TABS: { key: ChartKey; label: string }[] = [
  { key: "collected", label: "Collected" },
  { key: "avg", label: "Avg check" },
  { key: "wallet", label: "Wallet %" },
];

export default function Insights() {
  const [chart, setChart] = useState<ChartKey>("collected");

  return (
    <section>
      <PageHeader
        title="Insights"
        subtitle="Trends across the last 14 days · Fiore · SoHo"
      />

      <div className="mb-[18px] grid grid-cols-1 gap-3 min-[1080px]:grid-cols-3">
        <KpiCard
          icon={<Wallet className="size-4" />}
          label="Finance Wallet share"
          value="46%"
          footer={<Delta>9 pts</Delta>}
        />
        <KpiCard
          icon={<User className="size-4" />}
          label="Returning guests"
          value="38%"
          footer={<Delta>4 pts</Delta>}
        />
        <KpiCard
          icon={<Clock className="size-4" />}
          label="Avg time to pay"
          value="24s"
          footer="from scan to paid"
        />
      </div>

      <div className="grid items-start gap-4 min-[1080px]:grid-cols-[1.55fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Trend</CardTitle>
          </CardHeader>
          <div className="flex gap-1.5 px-[18px] pt-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setChart(tab.key)}
                className={cn(
                  "rounded-lg border px-[11px] py-[5px] font-mono text-[11px] font-semibold",
                  chart === tab.key
                    ? "border-foreground bg-foreground text-background"
                    : "border-line bg-card text-muted-foreground",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <TrendChart series={CHART_DATA[chart]} />
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="p-[18px]">
            <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Guests choosing Finance Wallet
            </div>
            <div className="tnum mt-2 text-[26px] font-bold tracking-[-0.03em]">
              46%
            </div>
            <p className="mt-3 flex gap-[7px] text-[11.5px] leading-snug text-ink2">
              <Shield
                className="mt-px size-3.5 shrink-0 text-primary"
                strokeWidth={1.8}
              />
              Wallet is your cheapest rail at 1%. Every point of shift from card
              (3%) saves you ~$45/day here. Offer a small Wallet perk to nudge
              it.
            </p>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guests</CardTitle>
            </CardHeader>
            <div className="flex flex-wrap gap-[30px] px-[18px] pb-[18px]">
              <MiniStat value="62%" label="New" />
              <MiniStat value="38%" label="Returning" />
              <MiniStat value="2.4×" label="Avg visits / returning" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="tnum font-mono text-[24px] font-bold leading-none tracking-[-0.02em]">
        {value}
      </div>
      <div className="mt-[5px] text-[11.5px] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function TrendChart({
  series,
}: {
  series: { unit: "$" | "%"; vals: number[] };
}) {
  const { vals, unit } = series;
  const W = 700;
  const H = 230;
  const pad = 16;
  const padB = 26;
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  const rng = max - min || 1;
  const n = vals.length;

  const x = (i: number) => pad + i * ((W - 2 * pad) / (n - 1));
  const y = (val: number) =>
    H - padB - ((val - min) / rng) * (H - padB - pad - 6);

  const pts = vals
    .map((val, i) => `${x(i).toFixed(1)},${y(val).toFixed(1)}`)
    .join(" ");
  const area =
    `M${x(0).toFixed(1)},${H - padB} L` +
    vals.map((val, i) => `${x(i).toFixed(1)},${y(val).toFixed(1)}`).join(" L") +
    ` L${x(n - 1).toFixed(1)},${H - padB} Z`;

  const last = vals.at(-1) ?? 0;
  const fmt = (v: number) =>
    unit === "$" ? `$${v.toLocaleString()}` : `${v}%`;

  return (
    <div className="px-2 pb-2 pt-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="trend"
        className="w-full"
      >
        <defs>
          <linearGradient id="insight-lg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EF6347" stopOpacity="0.2" />
            <stop offset="1" stopColor="#EF6347" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#insight-lg)" />
        <polyline
          points={pts}
          fill="none"
          stroke="#EF6347"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx={x(n - 1)} cy={y(last)} r="4.5" fill="#EF6347" />
        <text
          x={W - pad}
          y={y(last) - 11}
          fontFamily="JetBrains Mono"
          fontSize="13"
          fontWeight="700"
          fill="#1A1714"
          textAnchor="end"
        >
          {fmt(last)}
        </text>
        <text
          x={pad}
          y={H - 7}
          fontFamily="JetBrains Mono"
          fontSize="10"
          fill="#9C9080"
        >
          14 days ago
        </text>
        <text
          x={W - pad}
          y={H - 7}
          fontFamily="JetBrains Mono"
          fontSize="10"
          fill="#9C9080"
          textAnchor="end"
        >
          Today
        </text>
      </svg>
    </div>
  );
}

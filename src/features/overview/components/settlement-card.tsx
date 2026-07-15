import { Landmark, ShieldCheck } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function SettlementCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settling to your account</CardTitle>
      </CardHeader>
      <div className="p-[18px]">
        <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Today&apos;s net, after fees
        </div>
        <div className="tnum text-[26px] font-bold">$4,713.65</div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-coral-tint px-[9px] py-[3px] font-mono text-[10.5px] font-bold text-coral-d">
            <i className="size-[5px] rounded-full bg-coral-d" />
            Next-day payout
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-line2 px-[9px] py-[3px] font-mono text-[10.5px] font-bold text-ink2">
            <i className="size-[5px] rounded-full bg-muted-foreground" />
            Every rail
          </span>
        </div>

        <div className="mt-3.5 flex items-center gap-2.5 rounded-[11px] border bg-paper px-3 py-[11px]">
          <span className="grid size-[30px] shrink-0 place-items-center rounded-lg bg-foreground text-white">
            <Landmark className="size-[15px]" strokeWidth={1.7} />
          </span>
          <div>
            <b className="text-[12.5px]">Chase Business</b>{" "}
            <span className="font-mono text-[10.5px] text-muted-foreground">
              ····1857
            </span>
          </div>
        </div>

        <div className="mt-3 flex gap-[7px] text-[11.5px] leading-relaxed text-muted-foreground">
          <ShieldCheck
            className="mt-px size-3.5 shrink-0 text-primary"
            strokeWidth={1.8}
          />
          Payments settle directly to your own account. Finance never holds your
          money.
        </div>
      </div>
    </Card>
  );
}

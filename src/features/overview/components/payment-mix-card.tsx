import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MIX = [
  {
    label: "Finance Wallet",
    color: "bg-primary",
    width: "46%",
    fee: "1%",
    pct: "46%",
  },
  {
    label: "Credit & debit card",
    color: "bg-foreground",
    width: "31%",
    fee: "3%",
    pct: "31%",
  },
  {
    label: "Guaranteed Bank",
    color: "bg-info",
    width: "15%",
    fee: "2%",
    pct: "15%",
  },
  {
    label: "Pay over time",
    color: "bg-plum",
    width: "8%",
    fee: "4%",
    pct: "8%",
  },
];

export function PaymentMixCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How they paid</CardTitle>
        <span className="font-mono text-[11px] text-muted-foreground">
          by rail
        </span>
      </CardHeader>
      <div className="p-[18px]">
        <div className="mb-4 flex h-[13px] gap-[3px]">
          {MIX.map((row) => (
            <span
              key={row.label}
              className={cn("h-full rounded-full", row.color)}
              style={{ width: row.width }}
            />
          ))}
        </div>
        {MIX.map((row) => (
          <div
            key={row.label}
            className="flex items-center gap-2.5 border-b border-line2 py-[9px] last:border-0"
          >
            <span className="flex items-center gap-2 text-[12.5px] font-semibold">
              <i className={cn("size-[9px] rounded-full", row.color)} />
              {row.label}
            </span>
            <span className="ml-auto rounded-md bg-line2 px-[7px] py-0.5 font-mono text-[10.5px] font-bold text-muted-foreground">
              {row.fee}
            </span>
            <span className="w-10 text-right font-mono text-[12.5px] font-bold">
              {row.pct}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

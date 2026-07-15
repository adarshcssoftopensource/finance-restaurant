import { Link } from "react-router";
import { Plus } from "lucide-react";

import { paths } from "@/lib/paths";
import { Button } from "@/components/ui/button";

const STEPS = [
  "Authorize Finance in your Toast account",
  "Map your Toast tables to Finance QR cards",
  "Place table cards and take your first payment",
];

export function OnboardingEmpty() {
  return (
    <div className="mx-auto mt-2 max-w-[560px] rounded-xl border bg-card p-10 text-center shadow-[0_1px_2px_rgba(26,23,20,0.04),0_12px_28px_-20px_rgba(26,23,20,0.22)]">
      <div className="mx-auto mb-[18px] grid size-[60px] place-items-center rounded-2xl bg-foreground text-[28px] font-extrabold text-white">
        T
      </div>
      <h2 className="text-[23px] font-extrabold">Connect Toast to go live</h2>
      <p className="mx-auto mb-[22px] mt-[9px] max-w-[42ch] text-[14px] text-muted-foreground">
        Finance Restaurants reads the live check from Toast so guests can pay at
        the table. Connect once and you&apos;re taking payments in minutes.
      </p>
      <div className="mx-auto max-w-[330px] space-y-2.5 text-left">
        {STEPS.map((text, index) => (
          <div key={text} className="flex items-center gap-[11px]">
            <span className="grid size-[22px] shrink-0 place-items-center rounded-full bg-coral-tint font-mono text-[11px] font-bold text-coral-d">
              {index + 1}
            </span>
            <span className="text-[12.5px] text-ink2">{text}</span>
          </div>
        ))}
      </div>
      <Button asChild className="mt-4">
        <Link to={paths.dashboard.integrations.href}>
          <Plus className="size-4" />
          Connect Toast
        </Link>
      </Button>
    </div>
  );
}

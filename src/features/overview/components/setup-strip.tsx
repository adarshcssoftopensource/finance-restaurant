import { useState } from "react";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

type StepState = "done" | "now" | "next";

export function SetupStrip() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative mb-[22px] flex flex-wrap items-center gap-[22px] rounded-xl border border-coral-soft bg-linear-to-br from-white to-coral-tint px-5 py-[18px]">
      <button
        type="button"
        aria-label="Dismiss setup"
        onClick={() => setDismissed(true)}
        className="absolute right-3.5 top-3 grid size-[26px] place-items-center rounded-md text-[13px] text-faint transition-colors hover:bg-black/5 hover:text-foreground"
      >
        <X className="size-[13px]" />
      </button>

      <div className="min-w-[210px]">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-coral-d">
          Getting started
        </div>
        <h3 className="mt-[5px] text-[17px] font-extrabold">
          You&apos;re live with Toast
        </h3>
        <p className="mt-[3px] text-[12.5px] text-muted-foreground">
          Two steps left to finish setup.
        </p>
      </div>

      <div className="flex flex-1 flex-wrap gap-2.5">
        <Step state="done" title="Connect Toast" desc="Synced with Fiore" />
        <Step
          state="now"
          index={2}
          title="Place table cards"
          link="Order QR cards →"
        />
        <Step
          state="next"
          index={3}
          title="Confirm payout bank"
          link="Add account →"
        />
      </div>
    </div>
  );
}

function Step({
  state,
  index,
  title,
  desc,
  link,
}: {
  state: StepState;
  index?: number;
  title: string;
  desc?: string;
  link?: string;
}) {
  return (
    <div className="flex min-w-[150px] flex-1 items-start gap-[11px] rounded-xl border bg-card px-[13px] py-3">
      <span
        className={cn(
          "grid size-[22px] shrink-0 place-items-center rounded-full font-mono text-[11px] font-bold",
          state === "done" && "bg-success text-white",
          state === "now" && "bg-primary text-white",
          state === "next" && "bg-line text-muted-foreground",
        )}
      >
        {state === "done" ? (
          <Check className="size-3" strokeWidth={3} />
        ) : (
          index
        )}
      </span>
      <div>
        <b className="block text-[12.5px] font-bold">{title}</b>
        {desc ? (
          <span className="text-[11.5px] text-muted-foreground">{desc}</span>
        ) : null}
        {link ? (
          <button
            type="button"
            className="cursor-pointer text-left text-[11.5px] font-bold text-coral-d"
          >
            {link}
          </button>
        ) : null}
      </div>
    </div>
  );
}

import { useState } from "react";

import { cn } from "@/lib/utils";

import { POS_SYSTEMS, WRAP } from "../data";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

export function PosSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="pos" className="py-[74px]">
      <div className={WRAP}>
        <SectionHead
          eyebrow="Works with your POS"
          title="Plugs into the system you already run."
        >
          Finance connects to your point-of-sale by API — pulling the live check
          and sending the payment back automatically. Your team keeps working
          exactly the way they do today.
        </SectionHead>

        <Reveal>
          <div className="flex flex-wrap justify-center gap-3.5">
            {POS_SYSTEMS.map((pos) => (
              <div
                key={pos.name}
                className={cn(
                  "flex min-h-[64px] shrink grow-0 basis-[200px] flex-col items-center justify-center rounded-[14px] border bg-paper px-3.5 py-[18px] text-center text-[16px] font-bold tracking-[-0.01em] transition-all hover:translate-y-[-3px] hover:border-primary/50 hover:shadow-[0_12px_24px_-16px_rgba(60,20,10,0.4)] max-[560px]:grow max-[560px]:basis-[140px]",
                  pos.lead && !pos.disabled
                    ? "border-primary/45 shadow-[0_8px_22px_-16px_rgba(217,70,44,0.5)]"
                    : "border-line",
                  !pos.lead && !open && "hidden",
                  pos.disabled && "opacity-70 cursor-not-allowed",
                )}
              >
                {pos.name}
                {pos.note ? (
                  <small className="mt-[3px] font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-coral-d">
                    {pos.note}
                  </small>
                ) : null}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            className="mt-[18px] inline-flex items-center gap-2 rounded-[11px] border border-line px-[18px] py-[11px] font-mono text-[12.5px] font-semibold tracking-[0.04em] text-coral-d transition-all hover:-translate-y-px hover:border-primary/50 hover:bg-paper"
          >
            {open ? "Show fewer" : "Show more integrations"}
          </button>

          <div className="mt-[22px] font-mono text-[12.5px] text-muted-foreground">
            Don't see yours?{" "}
            <b className="font-semibold text-foreground">
              We're always adding integrations
            </b>{" "}
            — tell us what you run.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

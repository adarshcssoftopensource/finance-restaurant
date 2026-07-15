import { CreditCard, Landmark, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { WRAP } from "../data";
import { AppleMark, GoogleMark } from "./payment-marks";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

const imark =
  "inline-flex size-[42px] items-center justify-center rounded-[12px] border border-line bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-[3px] hover:scale-105";

function IconMark({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className={imark}>
      <Icon className="size-5 text-foreground" strokeWidth={1.9} />
    </span>
  );
}

function GLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-[9px] font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-0.5 w-4 rounded-[2px] bg-primary" />
      {children}
    </div>
  );
}

function Bnpl({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[10px] px-3.5 py-2.5 text-[15px] font-bold leading-none tracking-[-0.01em] transition-transform hover:-translate-y-0.5",
        className,
      )}
    >
      {label}
    </span>
  );
}

export function WaysToPay() {
  return (
    <section id="pay" className="py-[74px]">
      <div className={WRAP}>
        <SectionHead
          eyebrow="Ways to pay"
          title="Let guests pay however they want."
        >
          The more familiar the option, the faster they pay. Finance brings
          every method together in one checkout.
        </SectionHead>

        <Reveal className="flex flex-wrap items-start gap-9 rounded-[22px] border border-line bg-paper px-9 py-[34px]">
          <div className="flex flex-1 basis-[360px] flex-col gap-4">
            <GLabel>Pay now</GLabel>
            <div className="flex flex-wrap items-center gap-[11px]">
              <span className="inline-flex h-[42px] items-center gap-[9px] rounded-[12px] border border-primary/50 bg-white pl-[7px] pr-4 text-[14.5px] font-semibold shadow-[0_1px_2px_rgba(239,99,71,0.1)]">
                <span className="grid size-7 place-items-center rounded-[8px] bg-primary text-[16px] font-extrabold text-white">
                  F
                </span>
                Finance Wallet
              </span>
              <span className={imark} title="Apple Pay">
                <AppleMark className="size-[19px] text-foreground" />
              </span>
              <span className={imark} title="Google Pay">
                <GoogleMark className="size-[19px]" />
              </span>
              <span
                className="inline-flex size-[42px] items-center justify-center rounded-[12px] bg-[#00D632] text-[20px] font-extrabold text-white transition-transform hover:translate-y-[-3px] hover:scale-105"
                title="Cash App"
              >
                $
              </span>
              <IconMark icon={CreditCard} />
              <IconMark icon={Landmark} />
            </div>
            <div className="font-mono text-[11.5px] text-muted-foreground">
              Runs in the browser —{" "}
              <b className="font-semibold text-foreground">
                no app to download.
              </b>
            </div>
          </div>

          <div className="hidden w-px self-stretch bg-line min-[780px]:block" />

          <div className="flex flex-1 basis-[360px] flex-col gap-4">
            <GLabel>Pay over time</GLabel>
            <div className="flex flex-wrap items-center gap-[11px]">
              <Bnpl label="affirm" className="bg-[#4A4AF4] text-white" />
              <Bnpl label="Klarna" className="bg-[#FFB3C7] text-[#101010]" />
              <Bnpl label="Afterpay" className="bg-[#B2FCE4] text-[#101010]" />
            </div>
            <div className="font-mono text-[11.5px] text-muted-foreground">
              Split the bill into payments —{" "}
              <b className="font-semibold text-foreground">
                chosen at checkout.
              </b>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

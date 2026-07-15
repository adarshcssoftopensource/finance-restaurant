import { CreditCard, Landmark } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { WRAP } from "../data";
import { AppleMark, GoogleMark } from "./payment-marks";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

function Row({
  marks,
  method,
  pct,
  featured,
}: {
  marks: ReactNode;
  method: ReactNode;
  pct: string;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-between gap-[18px] overflow-hidden border-b border-line px-5 py-[22px] last:border-none min-[620px]:px-7",
        featured &&
          "border-none bg-[linear-gradient(120deg,#F2705A_0%,#ef6347_55%,#d9462c_100%)] text-white",
      )}
    >
      {featured ? (
        <span className="pointer-events-none absolute inset-0 translate-x-[-110%] bg-[linear-gradient(110deg,transparent_32%,rgba(255,255,255,0.22)_50%,transparent_68%)] animate-[landing-shimmer_4s_ease-in-out_infinite_1.2s]" />
      ) : null}
      <div className="flex flex-wrap items-center gap-3.5 text-[14.5px] font-semibold min-[620px]:text-[17px]">
        <span className="flex flex-none items-center gap-[7px]">{marks}</span>
        {method}
      </div>
      <div className="flex-none text-[27px] font-extrabold tracking-[-0.02em] min-[620px]:text-[34px]">
        {pct}
      </div>
    </div>
  );
}

const rmk =
  "grid size-8 place-items-center rounded-[9px] border border-line bg-white text-[15px] font-extrabold text-foreground";
const rmkInk =
  "grid size-8 place-items-center rounded-[9px] bg-foreground text-white";
const bnplMini =
  "inline-flex items-center rounded-[7px] px-[9px] py-1.5 text-[12px] font-bold leading-none";

export function Pricing() {
  return (
    <section id="pricing" className="py-[74px]">
      <div className={WRAP}>
        <SectionHead eyebrow="Pricing" title="Pricing by how guests pay.">
          The payment rail sets the rate — so the more guests pay with Finance
          Wallet, the less you pay.
        </SectionHead>

        <Reveal className="overflow-hidden rounded-[20px] border border-line bg-paper shadow-[0_16px_34px_-24px_rgba(60,20,10,0.35)]">
          <Row
            featured
            marks={<span className={`${rmk} text-primary`}>F</span>}
            method={
              <>
                Finance Wallet
                <span className="rounded-[6px] bg-white px-[9px] py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.12em] text-coral-d">
                  Best rate
                </span>
              </>
            }
            pct="1%"
          />
          <Row
            marks={
              <span className={rmkInk}>
                <Landmark className="size-[17px]" strokeWidth={2} />
              </span>
            }
            method="Bank account"
            pct="2%"
          />
          <Row
            marks={
              <>
                <span className={rmkInk}>
                  <CreditCard className="size-[17px]" strokeWidth={1.9} />
                </span>
                <span className={rmk}>
                  <AppleMark className="size-4" />
                </span>
                <span className={rmk}>
                  <GoogleMark className="size-4" />
                </span>
              </>
            }
            method={<>Card, Apple&nbsp;Pay &amp; Google&nbsp;Pay</>}
            pct="3%"
          />
          <Row
            marks={
              <>
                <span className={`${bnplMini} bg-[#4A4AF4] text-white`}>
                  affirm
                </span>
                <span className={`${bnplMini} bg-[#FFB3C7] text-[#101010]`}>
                  Klarna
                </span>
                <span className={`${bnplMini} bg-[#B2FCE4] text-[#101010]`}>
                  Afterpay
                </span>
              </>
            }
            method="Pay over time"
            pct="4%"
          />
        </Reveal>

        <div className="mt-[18px] font-mono text-[12.5px] text-muted-foreground">
          <b className="font-semibold text-foreground">Per transaction.</b> No
          monthly fees · no lock-in.
        </div>
      </div>
    </section>
  );
}

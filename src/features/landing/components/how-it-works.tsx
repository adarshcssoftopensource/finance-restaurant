import { useEffect, useState, type ReactNode } from "react";

import qrCode from "@/assets/landing/qr.png";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { DEMO_STEPS, WRAP } from "../data";
import { AppleMark, GoogleMark } from "./payment-marks";
import { SectionHead } from "./section-head";

const STEP_DURATION = 2200;

/** Shared frame for each phone screen; toggles the slide/fade transition. */
function ScreenShell({
  active,
  className,
  children,
}: {
  active: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col px-[22px] pb-[22px] pt-[30px] transition-[opacity,transform] duration-500 ease-out",
        active ? "translate-x-0 opacity-100" : "translate-x-[22px] opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ScreenTop({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="mb-3.5 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function BillRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-line py-[9px] text-[14.5px] text-foreground">
      <span>{label}</span>
      <span className="font-mono tabular-nums text-muted-foreground">
        {value}
      </span>
    </div>
  );
}

const ctaButton =
  "mt-auto rounded-[13px] bg-primary p-3.5 text-center text-[15px] font-bold text-white";

function ScanScreen({ active }: { active: boolean }) {
  return (
    <ScreenShell
      active={active}
      className="items-center justify-center p-0! bg-[#15110E]"
    >
      <div className="relative flex size-[172px] items-center justify-center">
        {[
          "left-0 top-0 rounded-tl-[8px] border-l-[3px] border-t-[3px]",
          "right-0 top-0 rounded-tr-[8px] border-r-[3px] border-t-[3px]",
          "bottom-0 left-0 rounded-bl-[8px] border-b-[3px] border-l-[3px]",
          "bottom-0 right-0 rounded-br-[8px] border-b-[3px] border-r-[3px]",
        ].map((corner) => (
          <span
            key={corner}
            className={cn("absolute size-[34px] border-primary", corner)}
          />
        ))}
        <div className="size-[122px] rounded-[12px] bg-white p-2">
          <img
            src={qrCode}
            alt=""
            className="size-full [image-rendering:pixelated]"
          />
        </div>
        <span className="absolute inset-x-[6px] h-0.5 bg-primary shadow-[0_0_10px_#ef6347] animate-[landing-scan_2.1s_ease-in-out_infinite]" />
      </div>
      <div className="absolute bottom-[50px] font-mono text-[10.5px] uppercase tracking-widest text-white/80">
        Point your camera here
      </div>
    </ScreenShell>
  );
}

function BillScreen({ active }: { active: boolean }) {
  return (
    <ScreenShell active={active}>
      <ScreenTop
        left={<b className="font-bold text-foreground">Fiore</b>}
        right="Table 51"
      />
      <h4 className="mb-4 text-[22px] font-bold tracking-[-0.02em]">
        Your bill
      </h4>
      <BillRow label="Burrata" value="$16.00" />
      <BillRow label="Tagliatelle al ragù" value="$28.00" />
      <BillRow label="Branzino" value="$34.00" />
      <BillRow label="Negroni ×2" value="$36.00" />
      <div className="mt-3.5 flex justify-between text-[18px] font-bold">
        <span>Total</span>
        <span>$114.00</span>
      </div>
      <div className={ctaButton}>Split &amp; pay</div>
    </ScreenShell>
  );
}

function Option({ label, selected }: { label: string; selected?: boolean }) {
  return (
    <div
      className={cn(
        "mb-[9px] flex items-center justify-between rounded-[13px] border px-[15px] py-[13px] text-[14.5px] font-semibold text-foreground",
        selected ? "border-primary bg-primary/[0.07]" : "border-line",
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "size-[19px] rounded-full border-2",
          selected
            ? "border-primary bg-primary shadow-[inset_0_0_0_3px_#fff]"
            : "border-line",
        )}
      />
    </div>
  );
}

function SplitScreen({ active }: { active: boolean }) {
  return (
    <ScreenShell active={active}>
      <ScreenTop
        left={<b className="font-bold text-foreground">Fiore</b>}
        right="Table 51"
      />
      <h4 className="mb-4 text-[22px] font-bold tracking-[-0.02em]">
        Split the bill
      </h4>
      <Option label="Pay in full" />
      <Option label="Split evenly · 4 ways" selected />
      <Option label="Pay for my items" />
      <div className="mt-2 text-[32px] font-extrabold tracking-[-0.02em]">
        <small className="mb-[3px] block font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Your share
        </small>
        $28.50
      </div>
      <div className={ctaButton}>Continue</div>
    </ScreenShell>
  );
}

function TipButton({ label, selected }: { label: string; selected?: boolean }) {
  return (
    <span
      className={cn(
        "flex-1 rounded-[12px] border py-[13px] text-center text-[15px] font-bold",
        selected
          ? "border-primary bg-primary text-white"
          : "border-line text-foreground",
      )}
    >
      {label}
    </span>
  );
}

function TipScreen({ active }: { active: boolean }) {
  return (
    <ScreenShell active={active}>
      <ScreenTop
        left="Your share"
        right={<b className="font-bold text-foreground">$28.50</b>}
      />
      <h4 className="mb-4 text-[22px] font-bold tracking-[-0.02em]">
        Add a tip
      </h4>
      <div className="mb-4 flex gap-[9px]">
        <TipButton label="15%" />
        <TipButton label="18%" />
        <TipButton label="20%" selected />
        <TipButton label="25%" />
      </div>
      <BillRow label="Tip · 20%" value="$5.70" />
      <div className="mt-3.5 flex justify-between text-[18px] font-bold">
        <span>You pay</span>
        <span>$34.20</span>
      </div>
      <div className={ctaButton}>Continue</div>
    </ScreenShell>
  );
}

function PayMethod({
  mark,
  label,
  markClass,
  selected,
}: {
  mark: ReactNode;
  label: string;
  markClass?: string;
  selected?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-[9px] flex items-center gap-3 rounded-[13px] border px-3.5 py-3 text-[15px] font-semibold text-foreground",
        selected ? "border-primary bg-primary/[0.07]" : "border-line",
      )}
    >
      <span
        className={cn(
          "grid size-[30px] shrink-0 place-items-center rounded-[8px]",
          markClass,
        )}
      >
        {mark}
      </span>
      {label}
      {selected ? (
        <span className="ml-auto font-extrabold text-primary">✓</span>
      ) : null}
    </div>
  );
}

function PayScreen({ active }: { active: boolean }) {
  return (
    <ScreenShell active={active}>
      <ScreenTop
        left="You pay"
        right={<b className="font-bold text-foreground">$34.20</b>}
      />
      <h4 className="mb-4 text-[22px] font-bold tracking-[-0.02em]">
        How to pay
      </h4>
      <PayMethod
        mark="F"
        markClass="bg-primary text-[15px] font-extrabold text-white"
        label="Finance Wallet"
        selected
      />
      <PayMethod
        mark={<AppleMark className="size-[15px]" />}
        markClass="bg-[#111] text-white"
        label="Apple Pay"
      />
      <PayMethod
        mark={<GoogleMark className="size-[15px]" />}
        markClass="border border-line bg-white"
        label="Google Pay"
      />
      <PayMethod
        mark="$"
        markClass="bg-[#00D632] font-extrabold text-white"
        label="Cash App"
      />
      <PayMethod
        mark={<CardGlyph />}
        markClass="bg-foreground text-white"
        label="Card or debit"
      />
      <div className="mt-1 rounded-[13px] bg-primary p-3.5 text-center text-[15px] font-bold text-white">
        Pay $34.20
      </div>
    </ScreenShell>
  );
}

function CardGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19" />
      <path d="M6 15h5" />
    </svg>
  );
}

function DoneScreen({ active }: { active: boolean }) {
  return (
    <ScreenShell
      active={active}
      className="items-center justify-center text-center"
    >
      <div
        className={cn(
          "grid size-[86px] place-items-center rounded-full bg-primary text-[44px] text-white",
          active &&
            "animate-[landing-pop_0.55s_cubic-bezier(0.2,1.5,0.4,1)_both]",
        )}
      >
        ✓
      </div>
      <h4 className="mb-0.5 mt-5 text-[22px] font-bold tracking-[-0.02em]">
        Paid
      </h4>
      <div className="text-[30px] font-extrabold tracking-[-0.02em]">
        $34.20
      </div>
      <div className="mt-2 font-mono text-[11px] tracking-wider text-muted-foreground">
        Receipt sent to your phone
      </div>
    </ScreenShell>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(
      () => setActive((current) => (current + 1) % DEMO_STEPS.length),
      STEP_DURATION,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section id="how" className="py-[74px]">
      <div className={WRAP}>
        <SectionHead
          eyebrow="How it works"
          title="From seated to settled in seconds."
        >
          It all happens on the guest's phone — from scanning the code to a paid
          check in seconds. Your team keeps serving while the table pays itself.
        </SectionHead>

        <div className="grid grid-cols-1 items-center gap-[30px] min-[860px]:grid-cols-[0.92fr_1.08fr] min-[860px]:gap-[50px]">
          <ol className="order-2 m-0 list-none p-0 min-[860px]:order-0">
            {DEMO_STEPS.map((step, index) => {
              const on = index === active;
              return (
                <li
                  key={step}
                  className="border-b border-line last:border-none"
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-current={on}
                    className={cn(
                      "flex w-full items-center gap-3.5 py-[15px] text-left text-[18px] font-semibold transition-colors",
                      on ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-[30px] shrink-0 place-items-center rounded-[9px] border font-mono text-[12px] font-bold transition-all",
                        on
                          ? "scale-105 border-primary bg-primary text-white"
                          : "border-line bg-muted text-muted-foreground",
                      )}
                    >
                      {index + 1}
                    </span>
                    {step}
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="flex justify-end">
            <div className="relative h-[608px] w-[300px] rounded-[42px] bg-[#15110E] p-3 shadow-[0_50px_90px_-36px_rgba(60,20,10,0.55),0_16px_34px_-20px_rgba(60,20,10,0.45)]">
              <span className="absolute left-1/2 top-[18px] z-9 h-[7px] w-[90px] -translate-x-1/2 rounded-[5px] bg-white/15" />
              <div className="absolute inset-3 overflow-hidden rounded-[31px] bg-paper">
                <ScanScreen active={active === 0} />
                <BillScreen active={active === 1} />
                <SplitScreen active={active === 2} />
                <TipScreen active={active === 3} />
                <PayScreen active={active === 4} />
                <DoneScreen active={active === 5} />
                <span
                  key={active}
                  style={{ width: "100%" }}
                  className="absolute bottom-0 left-0 z-8 h-[3px] bg-primary animate-[landing-progress_2200ms_linear]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import heroCard from "@/assets/landing/hero-card.png";

import { paths } from "@/lib/paths";

import { WRAP } from "../data";
import { Eyebrow } from "./section-head";
import { LandingCta } from "./landing-cta";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section className="overflow-hidden">
      <div
        className={`${WRAP} grid grid-cols-1 items-center gap-[30px] py-12 min-[880px]:grid-cols-[1.04fr_0.96fr] min-[880px]:gap-[54px] min-[880px]:pb-[84px] min-[880px]:pt-[74px]`}
      >
        <Reveal>
          <Eyebrow>Pay at the table</Eyebrow>
          <h1 className="mb-[22px] mt-[22px] text-[clamp(42px,5.6vw,62px)] font-extrabold leading-none tracking-[-0.03em]">
            Get paid at the table.
            <br />
            <span className="text-primary">In seconds.</span>
          </h1>
          <p className="mb-[30px] max-w-[32ch] text-[19px] leading-normal text-muted-foreground">
            Guests scan, see the bill, split it, tip, and pay — no waiting on
            the check, no app to download.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <LandingCta to={paths.dashboard.href}>Get started</LandingCta>
            <LandingCta variant="ghost" href="#how">
              See how it works
            </LandingCta>
          </div>
          <p className="mt-[22px] font-mono text-[12.5px] text-muted-foreground">
            <b className="font-semibold text-foreground">
              No app. No new hardware.
            </b>{" "}
            Works on the tables you already have.
          </p>
        </Reveal>

        <Reveal className="relative order-first flex items-center justify-end min-[880px]:order-0">
          <div className="absolute size-[72%] rounded-full bg-[radial-gradient(circle,rgba(239,99,71,0.30),transparent_68%)] blur-[38px] animate-[landing-glow_5s_ease-in-out_infinite]" />
          <div className="relative z-1 w-[min(310px,86%)] animate-[landing-float_6.5s_ease-in-out_infinite]">
            <span className="absolute left-[-13px] top-[-13px] z-2 size-10 rounded-tl-[12px] border-l-[3px] border-t-[3px] border-primary" />
            <div className="overflow-hidden rounded-[18px] shadow-[0_40px_80px_-34px_rgba(60,20,10,0.5),0_14px_30px_-18px_rgba(60,20,10,0.42)]">
              <img
                src={heroCard}
                alt="Fiore table card — scan the code to view and pay your bill"
                className="block w-full"
              />
            </div>
            <span className="absolute bottom-[-13px] right-[-13px] z-2 size-10 rounded-br-[12px] border-b-[3px] border-r-[3px] border-primary" />
            <div className="absolute bottom-[18%] left-[-26px] z-3 flex items-center gap-[9px] whitespace-nowrap rounded-[13px] border border-line bg-white px-[13px] py-2.5 text-[13.5px] font-semibold shadow-[0_16px_30px_-16px_rgba(60,20,10,0.4)] max-[880px]:-right-2.5 max-[880px]:left-auto">
              <span className="grid size-[22px] place-items-center rounded-full bg-primary text-[13px] text-white">
                ✓
              </span>
              Bill paid · table 51
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import cardLeft from "@/assets/landing/card-left.png";
import cardMid from "@/assets/landing/card-mid.png";
import cardRight from "@/assets/landing/card-right.png";

import { SWATCHES, WRAP } from "../data";
import { Eyebrow } from "./section-head";
import { Reveal } from "./reveal";

const cardBase =
  "absolute w-[206px] overflow-hidden rounded-[13px] bg-white shadow-[0_28px_54px_-28px_rgba(60,20,10,0.5),0_8px_18px_-12px_rgba(60,20,10,0.4)]";

export function TableCard() {
  return (
    <section id="card" className="py-[74px]">
      <div
        className={`${WRAP} grid grid-cols-1 items-center gap-[30px] min-[860px]:grid-cols-2 min-[860px]:gap-12`}
      >
        <Reveal>
          <Eyebrow>Your table card</Eyebrow>
          <h2 className="mb-3.5 mt-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.05] tracking-[-0.025em]">
            Made to match your room.
          </h2>
          <p className="mb-5 max-w-[46ch] text-[18px] text-muted-foreground">
            Pick portrait or landscape, set the accent to your brand color, and
            drop in your logo. Printed and set into a crystal-clear acrylic
            block with polished edges.
          </p>
          <p className="font-mono text-[12.5px] text-muted-foreground">
            <b className="font-semibold text-foreground">
              8–10&nbsp;mm clear acrylic
            </b>{" "}
            · A6 insert · one code per table
          </p>
          <div className="mt-6 flex gap-2.5" aria-hidden="true">
            {SWATCHES.map((color) => (
              <span
                key={color}
                style={{ background: color }}
                className="size-[30px] rounded-[8px] shadow-[0_0_0_1px_rgba(0,0,0,0.06)_inset]"
              />
            ))}
          </div>
        </Reveal>

        <Reveal className="relative flex min-h-[400px] items-center justify-center min-[860px]:min-h-[440px]">
          <div
            className={`${cardBase} z-[1] translate-x-[-122px] translate-y-[6px] rotate-[-9deg]`}
          >
            <img src={cardLeft} alt="" className="block w-full" />
          </div>
          <div
            className={`${cardBase} z-[1] translate-x-[122px] translate-y-[6px] rotate-[9deg]`}
          >
            <img src={cardRight} alt="" className="block w-full" />
          </div>
          <div className={`${cardBase} z-[3] translate-y-[-10px]`}>
            <img
              src={cardMid}
              alt="Fiore table card printed in a clear acrylic block"
              className="block w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

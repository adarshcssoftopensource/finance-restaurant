import { BENEFITS, WRAP } from "../data";
import { Reveal } from "./reveal";
import { SectionHead } from "./section-head";

export function WhyFinance() {
  return (
    <section id="why" className="py-[74px]">
      <div className={WRAP}>
        <SectionHead
          eyebrow="Why Finance"
          title="Faster tables. Bigger tips. Happier guests."
        >
          Paying is usually the slowest part of a meal. Finance makes it the
          easiest.
        </SectionHead>

        <div className="grid grid-cols-1 gap-5 min-[560px]:grid-cols-2 min-[880px]:grid-cols-3">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={(index % 3) * 70}>
                <div className="h-full rounded-[18px] border border-line bg-paper p-[26px] transition-all hover:-translate-y-1 hover:shadow-[0_18px_36px_-22px_rgba(60,20,10,0.4)]">
                  <div className="mb-[18px] grid size-11 place-items-center rounded-[12px] bg-primary/12">
                    <Icon
                      className="size-[22px] text-primary"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="mb-[7px] text-[18.5px] font-bold tracking-[-0.01em]">
                    {benefit.title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground">
                    {benefit.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

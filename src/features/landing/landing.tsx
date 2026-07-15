import { STRIP_ITEMS, WRAP } from "@/features/landing/data";
import { paths } from "@/lib/paths";
import { Hero } from "@/features/landing/components/hero";
import { HowItWorks } from "@/features/landing/components/how-it-works";
import { LandingCta } from "@/features/landing/components/landing-cta";
import { LandingHeader } from "@/features/landing/components/landing-header";
import { PosSection } from "@/features/landing/components/pos-section";
import { Pricing } from "@/features/landing/components/pricing";
import { Reveal } from "@/features/landing/components/reveal";
import { ScrollProgress } from "@/features/landing/components/scroll-progress";
import { SiteFooter } from "@/features/landing/components/site-footer";
import { TableCard } from "@/features/landing/components/table-card";
import { WaysToPay } from "@/features/landing/components/ways-to-pay";
import { WhyFinance } from "@/features/landing/components/why-finance";

function ValueStrip() {
  return (
    <div className="border-y border-line bg-muted">
      <div
        className={`${WRAP} flex flex-wrap items-center justify-center gap-x-[34px] gap-y-3.5 py-5 text-center font-mono text-[12.5px] tracking-[0.04em] text-muted-foreground`}
      >
        {STRIP_ITEMS.map((item, index) => (
          <span key={item.bold} className="flex items-center gap-[14px]">
            <span>
              {item.pre ? `${item.pre} ` : null}
              <b className="font-semibold text-foreground">{item.bold}</b>
              {item.post ? ` ${item.post}` : null}
            </span>
            {index < STRIP_ITEMS.length - 1 ? (
              <span className="size-1 rounded-full bg-primary" />
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function FinalCta() {
  return (
    <section id="cta" className="py-[74px]">
      <div className={WRAP}>
        <Reveal className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(158deg,#F2705A_0%,#ef6347_45%,#d9462c_100%)] px-11 py-14 text-center text-white">
          <div className="pointer-events-none absolute bottom-[-86px] right-[-26px] text-[280px] font-extrabold leading-none text-white/10">
            F
          </div>
          <h2 className="relative z-1 mb-3.5 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.05] tracking-tight">
            Ready to get paid at the table?
          </h2>
          <p className="relative z-1 mx-auto mb-[26px] max-w-[46ch] text-[18px] text-white/90">
            Set up your first venue in minutes. No new hardware, no guest app,
            no lock-in.
          </p>
          <LandingCta
            variant="white"
            to={paths.dashboard.href}
            className="relative z-1"
          >
            Get started
          </LandingCta>
        </Reveal>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <LandingHeader />
      <main>
        <Hero />
        <ValueStrip />
        <HowItWorks />
        <WaysToPay />
        <Pricing />
        <PosSection />
        <WhyFinance />
        <TableCard />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

import { Lock } from "lucide-react";

import { Logo } from "@/components/common/logo";
import { FOOTER_COLUMNS, WRAP } from "../data";

export function SiteFooter() {
  return (
    <footer className="mt-[74px] border-t border-line pb-10 pt-[56px]">
      <div className={WRAP}>
        <div className="flex flex-wrap justify-between gap-[30px]">
          <div>
            <Logo className="h-7" />
            <p className="mt-3.5 max-w-[30ch] text-[14px] text-muted-foreground">
              Multi-rail payments for restaurants and the businesses behind
              them.
            </p>
          </div>

          <div className="flex flex-wrap gap-[46px] text-[14.5px]">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <h4 className="mb-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {column.heading}
                </h4>
                {column.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="mb-2.5 block text-foreground opacity-[0.82] transition-colors hover:text-coral-d hover:opacity-100"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-9 flex items-center gap-[11px] rounded-[12px] border border-line bg-paper px-4 py-3.5 font-mono text-[12px] leading-[1.5] tracking-[0.02em] text-muted-foreground">
          <Lock
            className="size-[17px] flex-none text-primary"
            strokeWidth={2}
          />
          <span>
            <b className="font-semibold text-foreground">
              Bank-grade security.
            </b>{" "}
            Payments are encrypted end-to-end and processed over
            PCI-DSS-compliant rails. Funds settle directly to your own account —
            Finance never holds them.
          </span>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-line pt-[22px] font-mono text-[12px] tracking-[0.03em] text-muted-foreground">
          <span>© 2026 Finance Technologies LLC</span>
          <span>Finance is a financial technology company, not a bank.</span>
        </div>
      </div>
    </footer>
  );
}

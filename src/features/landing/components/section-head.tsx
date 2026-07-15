import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Coral mono label with the leading dash, used above every section title. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-coral-d before:h-0.5 before:w-[22px] before:rounded-[2px] before:bg-primary before:content-['']">
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-11 max-w-[680px]", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mb-3.5 mt-4 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.05] tracking-tight">
        {title}
      </h2>
      {children ? (
        <p className="max-w-[54ch] text-[18px] text-muted-foreground">
          {children}
        </p>
      ) : null}
    </div>
  );
}

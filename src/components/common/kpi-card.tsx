import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Metric tile: label (+icon), large value, optional footer note. */
export function KpiCard({
  icon,
  label,
  value,
  footer,
  className,
}: {
  icon?: ReactNode;
  label: ReactNode;
  value: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("p-[18px]", className)}>
      <div className="flex items-center gap-[7px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground [&_svg]:size-3.5 [&_svg]:text-primary">
        {icon}
        {label}
      </div>
      <div className="tnum mt-2.5 text-[29px] font-bold">{value}</div>
      {footer ? (
        <div className="mt-[5px] flex items-center gap-1.5 text-[12px] text-muted-foreground">
          {footer}
        </div>
      ) : null}
    </Card>
  );
}

import type { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

export function Delta({
  dir = "up",
  children,
  className,
}: {
  dir?: "up" | "down";
  children: ReactNode;
  className?: string;
}) {
  const Icon = dir === "up" ? TrendingUp : TrendingDown;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[3px] whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[11px] font-bold",
        dir === "up"
          ? "bg-success-soft text-success"
          : "bg-coral-soft text-coral-d",
        className,
      )}
    >
      <Icon className="size-[11px]" strokeWidth={2.8} />
      {children}
    </span>
  );
}

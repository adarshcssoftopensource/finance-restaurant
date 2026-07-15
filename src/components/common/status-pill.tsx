import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusTone =
  "success" | "warning" | "destructive" | "info" | "neutral";

const DOT: Record<StatusTone, string> = {
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-coral-d",
  info: "bg-info",
  neutral: "bg-muted-foreground",
};

const VARIANT = {
  success: "success",
  warning: "warning",
  destructive: "destructive",
  info: "info",
  neutral: "secondary",
} as const;

/** Pill with a leading status dot — the design's recurring `.pill` element. */
export function StatusPill({
  tone = "success",
  pulse = false,
  children,
  className,
}: {
  tone?: StatusTone;
  pulse?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Badge variant={VARIANT[tone]} className={className}>
      <i
        className={cn(
          "size-[5px] rounded-full",
          DOT[tone],
          pulse && "pulse-ring",
        )}
      />
      {children}
    </Badge>
  );
}

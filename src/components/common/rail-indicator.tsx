import { RAILS, type RailKey } from "@/data/rails";
import { cn } from "@/lib/utils";

/** Colored-dot + label for a payment rail (Wallet / Card / Bank / BNPL). */
export function RailIndicator({
  rail,
  label,
  className,
}: {
  rail: RailKey;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[7px] whitespace-nowrap font-mono text-[11.5px] font-semibold",
        className,
      )}
    >
      <i className={cn("size-2 shrink-0 rounded-full", RAILS[rail].dot)} />
      {label ?? RAILS[rail].label}
    </span>
  );
}

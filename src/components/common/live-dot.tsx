import { cn } from "@/lib/utils";

type Tone = "success" | "coral" | "muted";

const TONE: Record<Tone, string> = {
  success: "bg-success",
  coral: "bg-primary",
  muted: "bg-faint",
};

/** Small status dot, optionally pulsing (live sync / paying states). */
export function LiveDot({
  tone = "success",
  pulse = false,
  className,
}: {
  tone?: Tone;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block size-1.5 shrink-0 rounded-full",
        TONE[tone],
        pulse && "pulse-ring",
        className,
      )}
    />
  );
}

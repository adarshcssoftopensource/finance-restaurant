import { cn } from "@/lib/utils";

/** Coral toggle switch matching the HTML design. */
export function ToggleSwitch({
  checked,
  onChange,
  label,
  className,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-[25px] w-11 shrink-0 rounded-full transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-[21px] after:rounded-full after:bg-white after:shadow-[0_1px_3px_rgba(26,23,20,0.28)] after:transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-d",
        checked ? "bg-primary after:translate-x-[19px]" : "bg-line",
        className,
      )}
    />
  );
}

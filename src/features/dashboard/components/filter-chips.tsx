import { cn } from "@/lib/utils";

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full border px-[13px] py-[7px] font-mono text-[11.5px] font-semibold transition-colors",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-line bg-card text-ink2 hover:border-faint",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

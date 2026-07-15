/** "Source: Toast" chip used in payment tables. */
export function ToastSource({ label = "Toast" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-[5px] font-mono text-[10.5px] text-muted-foreground">
      <span className="grid size-3.5 place-items-center rounded bg-foreground text-[8px] font-extrabold text-white">
        T
      </span>
      {label}
    </span>
  );
}

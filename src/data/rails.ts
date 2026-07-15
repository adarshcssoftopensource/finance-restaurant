export type RailKey = "rw" | "rc" | "rb" | "rf";

/** Payment rails with their brand dot color (Tailwind class) and fee. */
export const RAILS: Record<
  RailKey,
  { label: string; dot: string; feePct: number }
> = {
  rw: { label: "Finance Wallet", dot: "bg-primary", feePct: 1 },
  rc: { label: "Credit & debit card", dot: "bg-foreground", feePct: 3 },
  rb: { label: "Guaranteed Bank", dot: "bg-info", feePct: 2 },
  rf: { label: "Pay over time", dot: "bg-plum", feePct: 4 },
};

export const RAIL_ORDER: RailKey[] = ["rw", "rc", "rb", "rf"];

import { useEffect, useState } from "react";
import { Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LOCATIONS, LOCATION_ORDER, type LocationKey } from "@/data/locations";
import qrImg from "@/assets/landing/qr.png";

function PrintCard({
  venue,
  table,
}: {
  venue: (typeof LOCATIONS)[LocationKey];
  table: number;
}) {
  return (
    <div className="w-[340px] overflow-hidden rounded-[22px] border bg-white shadow-[0_14px_34px_-18px_rgba(26,23,20,0.35)]">
      <div className="relative overflow-hidden bg-linear-to-br from-[#F0674B] to-coral-d px-6 pb-5 pt-[26px] text-white">
        <span className="pointer-events-none absolute -bottom-8 -right-3.5 font-display text-[150px] font-extrabold leading-none opacity-10">
          F
        </span>
        <div className="relative text-[34px] font-extrabold tracking-[-0.02em]">
          FIORE
        </div>
        <div className="relative mt-1.5 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em] opacity-95 before:h-0.5 before:w-4 before:bg-white">
          TRATTORIA · {venue.region.toUpperCase()}
        </div>
        <div className="relative mt-[15px] text-[27px] font-extrabold leading-[1.04] tracking-[-0.02em]">
          View &amp; pay
          <br />
          your bill.
        </div>
        <p className="relative mt-2 text-[12.5px] leading-snug opacity-95">
          Scan to see the bill, split it your way, tip, and pay — in seconds. No
          app to download.
        </p>
        <p className="relative mt-3.5 font-mono text-[10px] opacity-95">
          Powered by <b>Finance.</b>
        </p>
      </div>
      <div className="px-6 pb-5 pt-[18px]">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-primary px-[13px] py-1.5 font-mono text-[10.5px] font-bold tracking-[0.06em] text-white">
            SCAN TO PAY
          </span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Table
            <b className="ml-1.5 font-display text-[23px] text-foreground">
              {table}
            </b>
          </span>
        </div>
        <div className="mx-auto mt-0.5 size-[172px] rounded-[15px] border bg-white p-3">
          <img src={qrImg} alt="" className="size-full object-contain" />
        </div>
        <p className="mt-2 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.05em] text-ink2">
          Point your camera here
        </p>
        <p className="mt-4 font-mono text-[10.5px] text-ink2">
          Apple Pay · Google Pay · Cash App · Card · Bank
        </p>
        <p className="mt-4 border-t pt-3 font-mono text-[10.5px] text-muted-foreground">
          {venue.payUrl}
        </p>
      </div>
    </div>
  );
}

export function PrintSignsOverlay({
  open,
  onClose,
  defaultLocation = "soho",
}: {
  open: boolean;
  onClose: () => void;
  defaultLocation?: LocationKey;
}) {
  const [loc, setLoc] = useState<LocationKey>(defaultLocation);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const venue = LOCATIONS[loc];
  const cards = Array.from({ length: venue.tablesMapped }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-background">
      <div className="flex flex-wrap items-center gap-3 border-b bg-paper px-[22px] py-3.5">
        <div>
          <h3 className="text-[15px] font-bold">Print table QR signs</h3>
          <p className="text-[12px] text-muted-foreground">
            {venue.name} — {venue.tablesMapped} tables
          </p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2.5">
          <select
            aria-label="Location"
            value={loc}
            onChange={(e) => setLoc(e.target.value as LocationKey)}
            className="rounded-[9px] border bg-card px-[11px] py-2 text-[13px]"
          >
            {LOCATION_ORDER.map((key) => (
              <option key={key} value={key}>
                {LOCATIONS[key].name}
              </option>
            ))}
          </select>
          <Button size="sm" onClick={() => window.print()}>
            <Printer className="size-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-wrap justify-center gap-6 overflow-auto p-7 content-start">
        {cards.map((n) => (
          <PrintCard key={n} venue={venue} table={n} />
        ))}
      </div>
    </div>
  );
}

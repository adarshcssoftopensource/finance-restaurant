import { useEffect, useState } from "react";
import { ExternalLink, RotateCw, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const STEPS = [
  {
    n: 1,
    title: "Authorize Finance in Toast",
    body: "Sign in to Toast and approve read access to checks.",
  },
  {
    n: 2,
    title: "Choose your location",
    body: "Pick which Toast restaurant to connect.",
  },
  {
    n: 3,
    title: "Map your tables",
    body: "We match Toast tables to your Finance QR cards.",
  },
  {
    n: 4,
    title: "Go live",
    body: "Guests can pay at the table right away.",
  },
];

export function ConnectToastModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(26,23,20,0.5)] p-5 backdrop-blur-[3px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal
        aria-label="Connect Toast"
        className="relative w-full max-w-[460px] animate-[pop_0.25s_ease] overflow-hidden rounded-[20px] bg-paper shadow-[0_40px_80px_-24px_rgba(0,0,0,0.5)]"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-[10px] border bg-card text-ink2"
        >
          <X className="size-[17px]" strokeWidth={1.8} />
        </button>

        <div className="flex items-center gap-[13px] border-b px-6 pb-4 pt-[22px]">
          <div className="grid size-11 shrink-0 place-items-center rounded-[11px] bg-foreground text-[21px] font-extrabold text-white">
            T
          </div>
          <div>
            <h3 className="text-[17px] font-extrabold">Connect Toast</h3>
            <p className="text-[12px] text-muted-foreground">
              Add a location in about a minute
            </p>
          </div>
        </div>

        <div className="px-6 py-5">
          {STEPS.map((step) => (
            <div key={step.n} className="flex gap-[13px] py-[11px]">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-coral-tint font-mono text-[12px] font-bold text-coral-d">
                {step.n}
              </span>
              <div>
                <b className="block text-[13.5px] font-bold">{step.title}</b>
                <span className="text-[12px] text-muted-foreground">
                  {step.body}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2.5 px-6 pb-[22px]">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1">
            <ExternalLink className="size-4" />
            Authorize with Toast
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Sync button with brief "Synced just now" feedback. */
export function SyncButton({ className }: { className?: string }) {
  const [synced, setSynced] = useState(false);

  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      onClick={() => {
        setSynced(true);
        window.setTimeout(() => setSynced(false), 1800);
      }}
    >
      {synced ? (
        <>
          <RotateCw className="size-4" />
          Synced just now
        </>
      ) : (
        <>
          <RotateCw className="size-4" />
          Sync now
        </>
      )}
    </Button>
  );
}

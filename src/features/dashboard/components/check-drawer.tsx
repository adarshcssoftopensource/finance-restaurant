import { useEffect, type ReactNode } from "react";
import { RotateCcw, X } from "lucide-react";

import { RailIndicator } from "@/components/common/rail-indicator";
import { StatusPill } from "@/components/common/status-pill";
import { ToastSource } from "@/components/common/toast-source";
import { Button } from "@/components/ui/button";
import type { Payment } from "@/data/payments";
import { money } from "@/lib/format";

function splitCheck(payment: Payment) {
  const food = payment.amount - payment.tip;
  const subtotal = food / 1.08875;
  const tax = food - subtotal;
  return { subtotal, tax };
}

export function CheckDrawer({
  payment,
  onClose,
}: {
  payment: Payment | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!payment) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [payment, onClose]);

  const open = payment !== null;
  const { subtotal, tax } = payment
    ? splitCheck(payment)
    : { subtotal: 0, tax: 0 };
  const share = payment ? payment.amount / payment.guests : 0;

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-[rgba(26,23,20,0.42)] backdrop-blur-[2px] transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        role="dialog"
        aria-modal
        aria-label="Check detail"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[71] flex h-screen w-full max-w-[400px] flex-col bg-paper shadow-[-24px_0_60px_-30px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {payment ? (
          <>
            <div className="flex items-start gap-3 border-b px-[22px] pb-4 pt-5">
              <div>
                <div className="text-[20px] font-extrabold tracking-[-0.02em]">
                  Table {payment.table}
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                  {payment.guests} guests · {payment.time} · Server{" "}
                  {payment.server}
                </div>
              </div>
              <button
                type="button"
                aria-label="Close check detail"
                onClick={onClose}
                className="ml-auto grid size-9 place-items-center rounded-[10px] border bg-card text-ink2"
              >
                <X className="size-[17px]" strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-[22px] py-[18px]">
              <div className="mb-3.5">
                <StatusPill
                  tone={payment.status === "Settling" ? "warning" : "success"}
                >
                  {payment.status === "Settling"
                    ? "Settling to your account"
                    : "Paid in full"}
                </StatusPill>
              </div>

              <DrawerSection title="Check">
                <DrawerLine label="Subtotal" value={money(subtotal)} />
                <DrawerLine label="Tax" value={money(tax)} />
                <DrawerLine label="Tip" value={money(payment.tip)} />
                <DrawerLine
                  label="Total paid"
                  value={money(payment.amount)}
                  total
                />
              </DrawerSection>

              <DrawerSection title="Split across guests">
                {Array.from({ length: payment.guests }, (_, i) => (
                  <div
                    key={i}
                    className="mb-[7px] flex items-center gap-2.5 rounded-[10px] border bg-card px-[11px] py-[9px]"
                  >
                    <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-coral-tint text-[11px] font-bold text-coral-d">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] font-semibold">
                        Guest {i + 1}
                      </div>
                      <RailIndicator
                        rail={payment.rail}
                        label={payment.method}
                        className="text-[10.5px] text-muted-foreground"
                      />
                    </div>
                    <span className="tnum font-mono text-[13px] font-bold">
                      {money(share)}
                    </span>
                  </div>
                ))}
              </DrawerSection>

              <DrawerSection title="Payout">
                <div className="mt-1 rounded-xl border bg-card p-3.5">
                  <DrawerLine
                    label="Method"
                    value={
                      <RailIndicator
                        rail={payment.rail}
                        label={payment.method}
                      />
                    }
                  />
                  <DrawerLine
                    label="Finance fee"
                    value={
                      payment.fee > 0 ? `−${money(payment.fee)}` : money(0)
                    }
                  />
                  <DrawerLine
                    label="Net to you"
                    value={money(payment.net)}
                    total
                  />
                </div>
              </DrawerSection>

              <DrawerSection title="Source">
                <DrawerLine
                  label={<ToastSource />}
                  value={
                    <span className="font-mono text-muted-foreground">
                      Check #{1000 + payment.table}
                    </span>
                  }
                />
              </DrawerSection>
            </div>

            <p className="flex gap-[7px] px-[22px] pb-4 text-[11px] leading-snug text-muted-foreground">
              <RotateCcw
                className="mt-px size-3.5 shrink-0"
                strokeWidth={1.7}
              />
              Refunds return to the guest on the rail they paid — Finance routes
              it at settlement, so money never sits in a Finance balance.
            </p>

            <div className="flex gap-2.5 border-t px-[22px] py-3.5">
              <Button variant="outline" className="flex-1">
                View receipt
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-coral-soft text-coral-d"
              >
                Refund…
              </Button>
            </div>
          </>
        ) : null}
      </aside>
    </>
  );
}

function DrawerSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="mb-2 mt-[18px] first:mt-0 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
        {title}
      </div>
      {children}
    </>
  );
}

function DrawerLine({
  label,
  value,
  total,
}: {
  label: ReactNode;
  value: ReactNode;
  total?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-[7px] text-[13px] ${
        total ? "mt-1.5 border-t pt-[11px] text-[15px] font-extrabold" : ""
      }`}
    >
      <span className={total ? undefined : "text-ink2"}>{label}</span>
      <span className="tnum">{value}</span>
    </div>
  );
}

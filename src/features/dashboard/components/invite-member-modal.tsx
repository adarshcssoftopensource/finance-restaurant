import { useEffect, useState, type ReactNode } from "react";
import { Send, UserPlus, X } from "lucide-react";

import { RolePill } from "@/features/dashboard/components/role-pill";
import { Button } from "@/components/ui/button";
import type { Member } from "@/data/team";
import { LOCATION_ORDER, LOCATIONS } from "@/data/locations";

type InviteRole = "Admin" | "Manager" | "Viewer";

const ROLE_MAP: Record<InviteRole, Member["role"]> = {
  Admin: "admin",
  Manager: "manager",
  Viewer: "viewer",
};

export function InviteMemberModal({
  open,
  onClose,
  onInvite,
}: {
  open: boolean;
  onClose: () => void;
  onInvite: (member: Member) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<InviteRole>("Manager");
  const [location, setLocation] = useState("All locations");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function submit() {
    const displayName = name.trim() || "New member";
    const initials =
      displayName
        .split(/\s+/)
        .map((w) => w[0] ?? "")
        .slice(0, 2)
        .join("")
        .toUpperCase() || "NM";

    onInvite({
      id: `m-${Date.now()}`,
      name: displayName,
      email: email.trim() || "invited@fioregroup.com",
      initials,
      avatarBg: "#8A7F71",
      role: ROLE_MAP[role],
      locations: location,
      lastActive: "—",
      status: "Invited",
    });
    setName("");
    setEmail("");
    setRole("Manager");
    setLocation("All locations");
    onClose();
  }

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
        aria-label="Invite member"
        className="relative w-full max-w-[460px] overflow-hidden rounded-[20px] bg-paper shadow-[0_40px_80px_-24px_rgba(0,0,0,0.5)]"
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
          <div className="grid size-11 shrink-0 place-items-center rounded-[11px] bg-primary text-white">
            <UserPlus className="size-[22px]" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-[17px] font-extrabold">Invite a member</h3>
            <p className="text-[12px] text-muted-foreground">
              They&apos;ll get an email to join your team
            </p>
          </div>
        </div>

        <div className="space-y-[15px] px-6 py-5">
          <Field label="Full name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jordan Lee"
              className="w-full rounded-[10px] border bg-card px-3 py-2.5 text-[14px] outline-none focus:border-primary focus:shadow-[0_0_0_3px_var(--color-coral-tint)]"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jordan@fioregroup.com"
              className="w-full rounded-[10px] border bg-card px-3 py-2.5 text-[14px] outline-none focus:border-primary focus:shadow-[0_0_0_3px_var(--color-coral-tint)]"
            />
          </Field>
          <Field label="Role">
            <div className="flex flex-wrap gap-[7px]">
              {(["Admin", "Manager", "Viewer"] as InviteRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`rounded-[9px] border px-3 py-2 font-mono text-[11px] font-semibold ${
                    role === r
                      ? "border-foreground bg-foreground text-background"
                      : "border-line bg-card text-ink2"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Location access">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-[10px] border bg-card px-3 py-2.5 text-[14px]"
            >
              <option>All locations</option>
              {LOCATION_ORDER.map((key) => (
                <option key={key}>{LOCATIONS[key].name}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="flex gap-2.5 px-6 pb-[22px]">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={submit}>
            <Send className="size-4" />
            Send invite
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export function MemberAvatar({
  initials,
  bg,
  size = "md",
}: {
  initials: string;
  bg: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-full font-mono font-bold text-white ${
        size === "sm" ? "size-[34px] text-[12.5px]" : "size-9 text-[13px]"
      }`}
      style={{ background: bg }}
    >
      {initials}
    </div>
  );
}

export function RolePillDisplay({ role }: { role: Member["role"] }) {
  return <RolePill role={role} />;
}

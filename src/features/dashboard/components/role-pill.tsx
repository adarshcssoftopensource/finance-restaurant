import type { RoleKey } from "@/data/team";
import { cn } from "@/lib/utils";

const STYLE: Record<RoleKey, string> = {
  owner: "bg-[#F1E4FA] text-[#7A3FA0]",
  admin: "bg-coral-tint text-coral-d",
  manager: "bg-[#E1EFF7] text-[#2E6C93]",
  viewer: "bg-line2 text-ink2",
};

const LABEL: Record<RoleKey, string> = {
  owner: "Owner",
  admin: "Admin",
  manager: "Manager",
  viewer: "Viewer",
};

export function RolePill({ role }: { role: RoleKey }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 pl-2 font-mono text-[10.5px] font-bold",
        STYLE[role],
      )}
    >
      <i className="size-1.5 rounded-full bg-current" />
      {LABEL[role]}
    </span>
  );
}

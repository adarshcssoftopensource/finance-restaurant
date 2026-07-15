import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Shown across panels while Toast sync is interrupted. */
export function SyncErrorBanner() {
  return (
    <div
      role="alert"
      className="mb-5 flex items-center gap-[13px] rounded-xl border border-[#F1C3B7] bg-[#FBE9E4] px-4 py-[13px]"
    >
      <span className="grid size-[30px] shrink-0 place-items-center rounded-lg bg-coral-d text-white">
        <AlertTriangle className="size-[17px]" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <b className="text-[13.5px] font-bold">
          Toast sync interrupted 12 minutes ago
        </b>
        <span className="block text-[12px] text-ink2">
          New checks may not appear until you reconnect. Payments already taken
          are safe and still settling.
        </span>
      </div>
      <Button asChild size="sm" className="ml-auto">
        <Link to="/integrations">Reconnect Toast</Link>
      </Button>
    </div>
  );
}

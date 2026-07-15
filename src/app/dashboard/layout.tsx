import { Outlet } from "react-router";

import { usePreviewState } from "@/store/app-store";
import { SyncErrorBanner } from "@/components/common/sync-error-banner";
import { Sidebar } from "@/components/common/sidebar";
import { Topbar } from "@/components/common/topbar";

export default function DashboardLayout() {
  const previewState = usePreviewState();
  return (
    <div className="grid min-h-screen min-[820px]:grid-cols-[236px_1fr]">
      <Sidebar />
      <div className="flex min-w-0 flex-col">
        <Topbar />
        <main className="w-full  px-4 pb-14 pt-5 min-[820px]:px-[30px] min-[820px]:pb-16 min-[820px]:pt-[26px]">
          {previewState === "error" ? <SyncErrorBanner /> : null}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

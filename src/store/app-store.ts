import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { LocationKey } from "@/data/locations";

export type LocationSelection = LocationKey | "all";
export type DateRange = "today" | "week" | "month";
export type PreviewState = "live" | "firstrun" | "error";

type AppState = {
  location: LocationSelection;
  dateRange: DateRange;
  previewState: PreviewState;
};

type AppActions = {
  setLocation: (location: LocationSelection) => void;
  setDateRange: (dateRange: DateRange) => void;
  setPreviewState: (previewState: PreviewState) => void;
};

const useAppStore = create<AppState & { actions: AppActions }>()(
  devtools(
    (set) => ({
      location: "soho",
      dateRange: "today",
      previewState: "live",
      actions: {
        setLocation: (location) => set({ location }, false, "setLocation"),
        setDateRange: (dateRange) => set({ dateRange }, false, "setDateRange"),
        setPreviewState: (previewState) =>
          set({ previewState }, false, "setPreviewState"),
      },
    }),
    { name: "AppStore", enabled: import.meta.env.DEV },
  ),
);

export const useLocation = () => useAppStore((state) => state.location);
export const useDateRange = () => useAppStore((state) => state.dateRange);
export const usePreviewState = () => useAppStore((state) => state.previewState);
export const useAppActions = () => useAppStore((state) => state.actions);

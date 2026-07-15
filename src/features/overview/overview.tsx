import { Download } from "lucide-react";

import {
  useDateRange,
  useLocation,
  usePreviewState,
  type DateRange,
  type LocationSelection,
} from "@/store/app-store";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { ACCOUNT, LOCATIONS } from "@/data/locations";

import { ByLocationCard } from "@/features/overview/components/by-location-card";
import {
  KpiRow,
  type OverviewFigures,
} from "@/features/overview/components/kpi-row";
import { OnboardingEmpty } from "@/features/overview/components/onboarding-empty";
import { PaymentMixCard } from "@/features/overview/components/payment-mix-card";
import { RecentPaymentsCard } from "@/features/overview/components/recent-payments-card";
import { SettlementCard } from "@/features/overview/components/settlement-card";
import { SetupStrip } from "@/features/overview/components/setup-strip";

const RANGE_LABEL: Record<DateRange, string> = {
  today: "Collected today",
  week: "Collected this week",
  month: "Collected this month",
};

/** Week/month roll-ups are account-wide in the source design. */
const RANGE_ROLLUP: Record<
  Exclude<DateRange, "today">,
  Omit<OverviewFigures, "collectedLabel">
> = {
  week: {
    collected: "$31,204.90",
    tips: "$4,610.15",
    tablesPaid: "247",
    avgCheck: "$126.33",
  },
  month: {
    collected: "$138,905.40",
    tips: "$20,417.60",
    tablesPaid: "1,094",
    avgCheck: "$126.97",
  },
};

function getFigures(
  location: LocationSelection,
  dateRange: DateRange,
): OverviewFigures {
  const collectedLabel = RANGE_LABEL[dateRange];
  if (dateRange !== "today") {
    return { collectedLabel, ...RANGE_ROLLUP[dateRange] };
  }
  const source = location === "all" ? ACCOUNT : LOCATIONS[location];
  return {
    collectedLabel,
    collected: source.collected,
    tips: source.tips,
    tablesPaid: source.tablesPaid,
    avgCheck: source.avgCheck,
  };
}

export default function OverviewPage() {
  const location = useLocation();
  const dateRange = useDateRange();
  const previewState = usePreviewState();
  const isAccount = location === "all";
  const subtitle = isAccount
    ? "Payments across all locations today · Fiore"
    : `Payments taken at the table today · ${LOCATIONS[location].name}`;

  return (
    <section>
      <PageHeader
        title="Overview"
        subtitle={subtitle}
        actions={
          <Button variant="outline" size="sm">
            <Download />
            Export
          </Button>
        }
      />

      {previewState === "firstrun" ? (
        <OnboardingEmpty />
      ) : (
        <>
          {!isAccount ? <SetupStrip /> : null}
          <KpiRow figures={getFigures(location, dateRange)} />

          <div className="grid items-start gap-4 min-[1080px]:grid-cols-[1.55fr_1fr]">
            <div className="flex min-w-0 flex-col gap-4">
              {isAccount ? <ByLocationCard /> : <RecentPaymentsCard />}
            </div>
            <div className="flex flex-col gap-4">
              <PaymentMixCard />
              <SettlementCard />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

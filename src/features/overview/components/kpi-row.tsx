import { DollarSign, HandCoins, LayoutGrid, ReceiptText } from "lucide-react";

import { Delta } from "@/components/common/delta";
import { KpiCard } from "@/components/common/kpi-card";

export type OverviewFigures = {
  collectedLabel: string;
  collected: string;
  tips: string;
  tablesPaid: string;
  avgCheck: string;
};

export function KpiRow({ figures }: { figures: OverviewFigures }) {
  return (
    <div className="mb-[18px] grid grid-cols-2 gap-4 min-[1080px]:grid-cols-4">
      <KpiCard
        icon={<DollarSign />}
        label={figures.collectedLabel}
        value={figures.collected}
        footer={
          <>
            <Delta dir="up">12%</Delta> vs. yesterday
          </>
        }
      />
      <KpiCard
        icon={<HandCoins />}
        label="Tips collected"
        value={figures.tips}
        footer={
          <>
            avg <b className="tnum text-ink2">18.7%</b> · yours to distribute
          </>
        }
      />
      <KpiCard
        icon={<LayoutGrid />}
        label="Tables paid"
        value={figures.tablesPaid}
        footer={
          <>
            <Delta dir="up">6 tables</Delta> vs. yesterday
          </>
        }
      />
      <KpiCard
        icon={<ReceiptText />}
        label="Average check"
        value={figures.avgCheck}
        footer={
          <>
            paid in <b className="tnum text-ink2">24s</b> on average
          </>
        }
      />
    </div>
  );
}

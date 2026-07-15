export type AlertTone = "warning" | "destructive" | "success" | "info";

export type AlertItem = {
  id: string;
  tone: AlertTone;
  title: string;
  body: string;
  time: string;
};

export const ALERTS: AlertItem[] = [
  {
    id: "a1",
    tone: "warning",
    title: "Table 9 open 42 min",
    body: "Seated a while with no payment yet — SoHo.",
    time: "2 min ago",
  },
  {
    id: "a2",
    tone: "destructive",
    title: "Dispute opened · $156.40",
    body: "Table 18 card payment — response due Jul 8.",
    time: "1 hr ago",
  },
  {
    id: "a3",
    tone: "success",
    title: "Refund completed · $42.00",
    body: "Table 6 — returned on the original rail.",
    time: "2 hr ago",
  },
  {
    id: "a4",
    tone: "info",
    title: "Payout scheduled · $4,713.65",
    body: "Arriving tomorrow to Chase ····1857.",
    time: "3 hr ago",
  },
  {
    id: "a5",
    tone: "success",
    title: "Williamsburg reconciled with Toast",
    body: "32 checks matched · $0.00 difference.",
    time: "5 hr ago",
  },
];

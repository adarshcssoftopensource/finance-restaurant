export type PayoutStatus = "Scheduled" | "Settled";

export type Payout = {
  id: string;
  date: string;
  sub?: string;
  payments: number;
  mix: string;
  fee: number;
  amount: number;
  status: PayoutStatus;
};

export type Statement = {
  id: string;
  title: string;
  info: string;
  downloadable?: boolean;
  pending?: string;
};

export const PAYOUTS: Payout[] = [
  {
    id: "po1",
    date: "Jul 1",
    sub: "tomorrow",
    payments: 38,
    mix: "Wallet 46 · Card 31 · Bank 15 · BNPL 8",
    fee: 41.85,
    amount: 4713.65,
    status: "Scheduled",
  },
  {
    id: "po2",
    date: "Jun 30",
    payments: 44,
    mix: "Wallet 51 · Card 27 · Bank 14 · BNPL 8",
    fee: 38.2,
    amount: 5142.9,
    status: "Settled",
  },
  {
    id: "po3",
    date: "Jun 29",
    payments: 39,
    mix: "Wallet 44 · Card 33 · Bank 16 · BNPL 7",
    fee: 44.1,
    amount: 4606.2,
    status: "Settled",
  },
  {
    id: "po4",
    date: "Jun 28",
    payments: 52,
    mix: "Wallet 48 · Card 30 · Bank 15 · BNPL 7",
    fee: 51.3,
    amount: 6088.45,
    status: "Settled",
  },
  {
    id: "po5",
    date: "Jun 27",
    payments: 41,
    mix: "Wallet 45 · Card 32 · Bank 15 · BNPL 8",
    fee: 43.75,
    amount: 4821.55,
    status: "Settled",
  },
  {
    id: "po6",
    date: "Jun 26",
    payments: 30,
    mix: "Wallet 42 · Card 34 · Bank 17 · BNPL 7",
    fee: 34.6,
    amount: 3531.9,
    status: "Settled",
  },
];

export const STATEMENTS: Statement[] = [
  {
    id: "s1",
    title: "June 2026 statement",
    info: "Settlements, fees & refunds · PDF + CSV",
    downloadable: true,
  },
  {
    id: "s2",
    title: "May 2026 statement",
    info: "Settlements, fees & refunds · PDF + CSV",
    downloadable: true,
  },
  {
    id: "s3",
    title: "2026 Form 1099-K",
    info: "Reports card & third-party settlement volume · issued each January",
    pending: "Available Jan 2027",
  },
];

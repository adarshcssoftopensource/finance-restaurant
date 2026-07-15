import type { Payment } from "@/data/payments";

export type TableStatus = "open" | "view" | "pay" | "paid";

export type FloorTable = {
  id: string;
  table: number;
  guests: number;
  status: TableStatus;
  /** Full check amount when known. */
  amount?: number;
  /** Amount collected so far (paying state). */
  paidAmount?: number;
  progress?: number;
  paidCount?: number;
  detail?: string;
  /** Populated for paid tables — opens check drawer. */
  payment?: Payment;
};

export const FLOOR_STATS = {
  covers: 53,
  open: 5,
  viewing: 2,
  paying: 3,
  paid: 5,
} as const;

export const FLOOR_TABLES: FloorTable[] = [
  {
    id: "t12",
    table: 12,
    guests: 4,
    status: "pay",
    amount: 136.8,
    paidAmount: 102.6,
    progress: 75,
    paidCount: 3,
  },
  {
    id: "t3",
    table: 3,
    guests: 6,
    status: "pay",
    amount: 247.0,
    paidAmount: 164.65,
    progress: 67,
    paidCount: 4,
  },
  {
    id: "t18",
    table: 18,
    guests: 4,
    status: "pay",
    amount: 156.4,
    paidAmount: 78.2,
    progress: 50,
    paidCount: 2,
  },
  {
    id: "t7",
    table: 7,
    guests: 2,
    status: "view",
    amount: 98.5,
    detail: "· check open",
  },
  {
    id: "t22",
    table: 22,
    guests: 5,
    status: "view",
    amount: 214.3,
    detail: "· check open",
  },
  {
    id: "t5",
    table: 5,
    guests: 2,
    status: "paid",
    amount: 74.2,
    detail: "Settled · Finance Wallet",
    payment: {
      id: "fp5",
      time: "8:09 PM",
      table: 5,
      guests: 2,
      method: "Finance Wallet",
      rail: "rw",
      amount: 74.2,
      tip: 11.1,
      fee: 0.74,
      net: 73.46,
      server: "Priya",
      status: "Paid",
    },
  },
  {
    id: "t9",
    table: 9,
    guests: 2,
    status: "paid",
    amount: 184.0,
    detail: "Settled · Pay over time",
    payment: {
      id: "fp9",
      time: "8:21 PM",
      table: 9,
      guests: 2,
      method: "Pay over time",
      rail: "rf",
      amount: 184.0,
      tip: 0,
      fee: 7.36,
      net: 176.64,
      server: "Marco",
      status: "Paid",
    },
  },
  {
    id: "t15",
    table: 15,
    guests: 5,
    status: "paid",
    amount: 112.3,
    detail: "Settled · Card",
    payment: {
      id: "fp15",
      time: "8:17 PM",
      table: 15,
      guests: 5,
      method: "Card · Google Pay",
      rail: "rc",
      amount: 112.3,
      tip: 18.6,
      fee: 3.37,
      net: 108.93,
      server: "Lena",
      status: "Paid",
    },
  },
  {
    id: "t4",
    table: 4,
    guests: 3,
    status: "open",
    detail: "Seated 6m ago",
  },
  {
    id: "t8",
    table: 8,
    guests: 2,
    status: "open",
    detail: "Seated 11m ago",
  },
  {
    id: "t14",
    table: 14,
    guests: 4,
    status: "open",
    detail: "Seated 3m ago",
  },
  {
    id: "t19",
    table: 19,
    guests: 6,
    status: "open",
    detail: "Seated 18m ago",
  },
  {
    id: "t25",
    table: 25,
    guests: 2,
    status: "open",
    detail: "Seated 1m ago",
  },
  {
    id: "t11",
    table: 11,
    guests: 3,
    status: "paid",
    amount: 203.1,
    detail: "Settled · Finance Wallet",
    payment: {
      id: "fp11",
      time: "7:48 PM",
      table: 11,
      guests: 3,
      method: "Finance Wallet",
      rail: "rw",
      amount: 203.1,
      tip: 34.0,
      fee: 2.03,
      net: 201.07,
      server: "Lena",
      status: "Paid",
    },
  },
  {
    id: "t21",
    table: 21,
    guests: 3,
    status: "paid",
    amount: 62.75,
    detail: "Settled · Guaranteed Bank",
    payment: {
      id: "fp21",
      time: "8:28 PM",
      table: 21,
      guests: 3,
      method: "Guaranteed Bank",
      rail: "rb",
      amount: 62.75,
      tip: 9.4,
      fee: 1.26,
      net: 61.49,
      server: "Sam",
      status: "Paid",
    },
  },
];

export const STATUS_LABEL: Record<TableStatus, string> = {
  open: "Open",
  view: "Viewing bill",
  pay: "Paying",
  paid: "Paid",
};

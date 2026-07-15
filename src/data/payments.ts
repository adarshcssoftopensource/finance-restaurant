import type { RailKey } from "@/data/rails";

export type PaymentStatus = "Paid" | "Settling";

export type Payment = {
  id: string;
  time: string;
  table: number;
  guests: number;
  method: string;
  rail: RailKey;
  amount: number;
  tip: number;
  fee: number;
  net: number;
  server: string;
  status: PaymentStatus;
};

/** Live checks pulled from Toast (mock). Ordered most-recent first. */
export const PAYMENTS: Payment[] = [
  {
    id: "p1",
    time: "8:42 PM",
    table: 12,
    guests: 4,
    method: "Finance Wallet",
    rail: "rw",
    amount: 136.8,
    tip: 22.8,
    fee: 1.37,
    net: 135.43,
    server: "Marco",
    status: "Paid",
  },
  {
    id: "p2",
    time: "8:39 PM",
    table: 7,
    guests: 2,
    method: "Card · Apple Pay",
    rail: "rc",
    amount: 98.5,
    tip: 12.0,
    fee: 2.96,
    net: 95.54,
    server: "Lena",
    status: "Paid",
  },
  {
    id: "p3",
    time: "8:34 PM",
    table: 3,
    guests: 6,
    method: "Finance Wallet",
    rail: "rw",
    amount: 247.0,
    tip: 41.2,
    fee: 2.47,
    net: 244.53,
    server: "Priya",
    status: "Paid",
  },
  {
    id: "p4",
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
  {
    id: "p5",
    time: "8:21 PM",
    table: 9,
    guests: 2,
    method: "Pay over time",
    rail: "rf",
    amount: 184.0,
    tip: 0.0,
    fee: 7.36,
    net: 176.64,
    server: "Marco",
    status: "Paid",
  },
  {
    id: "p6",
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
  {
    id: "p7",
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
  {
    id: "p8",
    time: "8:02 PM",
    table: 18,
    guests: 4,
    method: "Card",
    rail: "rc",
    amount: 156.4,
    tip: 26.0,
    fee: 4.69,
    net: 151.71,
    server: "Sam",
    status: "Settling",
  },
  {
    id: "p9",
    time: "7:55 PM",
    table: 2,
    guests: 2,
    method: "Guaranteed Bank",
    rail: "rb",
    amount: 88.0,
    tip: 13.2,
    fee: 1.76,
    net: 86.24,
    server: "Marco",
    status: "Paid",
  },
  {
    id: "p10",
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
];

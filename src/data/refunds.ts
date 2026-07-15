import type { RailKey } from "@/data/rails";

export type Refund = {
  id: string;
  time: string;
  table: number;
  method: string;
  rail: RailKey;
  amount: number;
  partialOf?: number;
  reason: string;
  by: string;
  status: "Refunded" | "Refunding";
};

export type Dispute = {
  id: string;
  opened: string;
  table: number;
  card: string;
  amount: number;
  reasonCode: string;
  respondBy: string | null;
  status: "Needs response" | "Under review" | "Won";
};

export const REFUNDS: Refund[] = [
  {
    id: "r1",
    time: "8:12 PM",
    table: 6,
    method: "Finance Wallet",
    rail: "rw",
    amount: 42.0,
    reason: "Wrong item charged",
    by: "Daniela R.",
    status: "Refunded",
  },
  {
    id: "r2",
    time: "7:31 PM",
    table: 14,
    method: "Card",
    rail: "rc",
    amount: 42.0,
    partialOf: 96.5,
    reason: "Partial — removed dessert",
    by: "Daniela R.",
    status: "Refunding",
  },
  {
    id: "r3",
    time: "Jun 30",
    table: 22,
    method: "Guaranteed Bank",
    rail: "rb",
    amount: 118.0,
    reason: "Duplicate check",
    by: "Marco B.",
    status: "Refunded",
  },
];

export const DISPUTES: Dispute[] = [
  {
    id: "d1",
    opened: "Jul 1",
    table: 18,
    card: "····4291",
    amount: 156.4,
    reasonCode: "13.1 Merchandise",
    respondBy: "Jul 8",
    status: "Needs response",
  },
  {
    id: "d2",
    opened: "Jun 27",
    table: 4,
    card: "····7735",
    amount: 88.2,
    reasonCode: "10.4 Fraud",
    respondBy: null,
    status: "Under review",
  },
  {
    id: "d3",
    opened: "Jun 19",
    table: 9,
    card: "····1180",
    amount: 64.0,
    reasonCode: "12.6 Duplicate",
    respondBy: null,
    status: "Won",
  },
];

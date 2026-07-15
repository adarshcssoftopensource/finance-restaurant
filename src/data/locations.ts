export type LocationKey = "soho" | "wburg" | "midtown";

export type Location = {
  key: LocationKey;
  name: string;
  sub: string;
  region: string;
  city: string;
  payUrl: string;
  initial: string;
  /** Rounded "today" figure shown in the location switcher. */
  menuAmount: string;
  collected: string;
  tips: string;
  tablesPaid: string;
  avgCheck: string;
  tablesMapped: number;
};

export const LOCATIONS: Record<LocationKey, Location> = {
  soho: {
    key: "soho",
    name: "Fiore · SoHo",
    sub: "New York · NY",
    region: "New York",
    city: "SoHo",
    payUrl: "pay.finance.com/r/fiore",
    initial: "F",
    menuAmount: "$4,820",
    collected: "$4,820.50",
    tips: "$712.30",
    tablesPaid: "38",
    avgCheck: "$126.85",
    tablesMapped: 24,
  },
  wburg: {
    key: "wburg",
    name: "Fiore · Williamsburg",
    sub: "Brooklyn · NY",
    region: "Brooklyn",
    city: "Williamsburg",
    payUrl: "pay.finance.com/r/fiore-wburg",
    initial: "F",
    menuAmount: "$3,240",
    collected: "$3,240.10",
    tips: "$486.20",
    tablesPaid: "29",
    avgCheck: "$111.73",
    tablesMapped: 32,
  },
  midtown: {
    key: "midtown",
    name: "Fiore · Midtown",
    sub: "New York · NY",
    region: "New York",
    city: "Midtown",
    payUrl: "pay.finance.com/r/fiore-midtown",
    initial: "F",
    menuAmount: "$2,910",
    collected: "$2,910.75",
    tips: "$402.90",
    tablesPaid: "24",
    avgCheck: "$121.28",
    tablesMapped: 35,
  },
};

export const LOCATION_ORDER: LocationKey[] = ["soho", "wburg", "midtown"];

/** Aggregate shown when "All locations" is selected. */
export const ACCOUNT = {
  name: "All locations",
  sub: "Fiore · 3 restaurants",
  menuAmount: "$10,971",
  collected: "$10,971.35",
  tips: "$1,601.40",
  tablesPaid: "91",
  avgCheck: "$120.56",
};

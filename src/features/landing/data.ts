import {
  Check,
  Clock,
  DollarSign,
  Landmark,
  Monitor,
  Star,
  type LucideIcon,
} from "lucide-react";

/** Centered page gutter shared by every landing section (matches --maxw). */
export const WRAP = "mx-auto w-full max-w-[1200px] px-5 sm:px-[30px]";

/** In-page anchors for the sticky nav (native smooth-scroll to section id). */
export const NAV_LINKS: { href: string; label: string }[] = [
  { href: "#how", label: "How it works" },
  { href: "#pay", label: "Ways to pay" },
  { href: "#pricing", label: "Pricing" },
  { href: "#pos", label: "Your POS" },
  { href: "#why", label: "Why Finance" },
];

/** The `bold` fragment is emphasised; `pre`/`post` stay muted. */
export const STRIP_ITEMS: { pre?: string; bold: string; post?: string }[] = [
  { bold: "Scan", post: "to view" },
  { bold: "Split", post: "any way" },
  { bold: "Tip", post: "in one tap" },
  { bold: "Pay", post: "how you want" },
  { pre: "Settles to", bold: "your account" },
];

export const DEMO_STEPS: string[] = [
  "Scan the code",
  "See the bill",
  "Split it",
  "Add a tip",
  "Pay your way",
  "Done",
];

export const BENEFITS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Clock,
    title: "Turn tables faster",
    body: "No flagging down a server, no card round-trips. Guests pay when they're ready and the table frees up sooner.",
  },
  {
    icon: DollarSign,
    title: "Tips that add up",
    body: "Clear, one-tap tipping right at checkout — guests reliably leave a little more.",
  },
  {
    icon: Star,
    title: "More 5-star reviews",
    body: "A smooth finish is a good last impression — and the right moment to ask for a review.",
  },
  {
    icon: Check,
    title: "Fewer walked tabs",
    body: "Guests settle the second they decide to leave, so checks stop slipping out the door.",
  },
  {
    icon: Monitor,
    title: "Your brand on every table",
    body: "Your logo, your colors, your name. Finance stays in the background.",
  },
  {
    icon: Landmark,
    title: "Money goes to you",
    body: "Every payment settles to your own account. Finance moves the money — it never holds it.",
  },
];

export const POS_SYSTEMS: {
  name: string;
  note?: string;
  lead?: boolean;
  disabled?: boolean;
}[] = [
  { name: "Toast", note: "Integrated", lead: true },
  { name: "Square", note: "Coming soon", disabled: true },
  { name: "Clover", note: "Coming soon", disabled: true },
];

/** Table-card accent swatches (decorative brand-colour picker). */
export const SWATCHES = [
  "#EF6347",
  "#1C6E5A",
  "#3B5BA5",
  "#8E44AD",
  "#B23B2E",
  "#1A1714",
];

export const FOOTER_COLUMNS: {
  heading: string;
  links: { href: string; label: string }[];
}[] = [
  {
    heading: "Product",
    links: [
      { href: "#how", label: "How it works" },
      { href: "#pay", label: "Ways to pay" },
      { href: "#card", label: "Table cards" },
      { href: "#pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "#", label: "About Finance" },
      { href: "#", label: "Finance Wallet" },
      { href: "#", label: "Finance Business" },
      { href: "#", label: "Contact" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { href: "#cta", label: "Book a demo" },
      { href: "#cta", label: "Create account" },
      { href: "#", label: "Help center" },
    ],
  },
];

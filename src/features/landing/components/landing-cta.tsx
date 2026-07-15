import type { ReactNode } from "react";
import { Link } from "react-router";

import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "white";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-[13px] text-[15px] font-semibold transition-all";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-[0_6px_18px_-8px_rgba(217,70,44,0.7)] hover:-translate-y-px hover:bg-coral-d",
  ghost:
    "border border-line bg-transparent text-foreground hover:-translate-y-px hover:border-foreground/30",
  white:
    "bg-white text-coral-d hover:-translate-y-px hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.3)]",
};

/**
 * One CTA styled three ways. Pass `to` for an in-app route (React Router
 * link) or `href` for an in-page anchor (native smooth-scroll).
 */
export function LandingCta({
  children,
  variant = "primary",
  className,
  to,
  href,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  to?: string;
  href?: string;
}) {
  const cls = cn(BASE, VARIANTS[variant], className);
  return to ? (
    <Link to={to} className={cls}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

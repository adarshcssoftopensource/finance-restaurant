import { Link } from "react-router";

import logoSrc from "@/assets/logo.svg";
import { cn } from "@/lib/utils";

type LogoProps = Omit<React.ComponentPropsWithoutRef<"img">, "src" | "alt"> & {
  alt?: string;
  /** White logo for dark / brand-colored backgrounds */
  variant?: "default" | "inverse";
  href?: string;
};

export function Logo({
  className,
  alt = "Finance",
  variant = "default",
  href,
  ...props
}: LogoProps) {
  const image = (
    <img
      src={logoSrc}
      alt={alt}
      className={cn(
        "h-auto w-auto max-w-full",
        variant === "inverse" && "brightness-0 invert",
        className,
      )}
      {...props}
    />
  );

  if (!href) return image;

  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      <Link to={href} className="inline-flex">
        {image}
      </Link>
    );
  }

  return (
    <a href={href} className="inline-flex">
      {image}
    </a>
  );
}

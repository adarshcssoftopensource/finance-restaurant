import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-[13.5px] font-bold outline-none transition-all active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_10px_20px_-12px_rgba(217,70,44,0.6)] hover:bg-coral-d",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:brightness-95",
        outline: "border bg-card text-foreground hover:border-faint",
        secondary:
          "border bg-secondary text-secondary-foreground hover:border-faint",
        ghost: "text-ink2 hover:bg-muted hover:text-foreground",
        link: "text-coral-d underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-[17px] py-2.5 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 rounded-md px-3 text-[12.5px]",
        lg: "h-11 rounded-md px-6",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

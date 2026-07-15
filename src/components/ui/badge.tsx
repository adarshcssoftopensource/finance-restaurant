import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-full font-mono text-[10.5px] font-bold [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary/10 px-2 py-0.5 text-coral-d",
        secondary: "bg-muted px-2 py-0.5 text-ink2",
        outline: "border px-2 py-0.5 text-ink2",
        success: "bg-success-soft px-[9px] py-[3px] text-success",
        warning: "bg-warning-soft px-[9px] py-[3px] text-warning",
        info: "bg-[#E1EFF7] px-[9px] py-[3px] text-info",
        destructive: "bg-coral-soft px-[9px] py-[3px] text-coral-d",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

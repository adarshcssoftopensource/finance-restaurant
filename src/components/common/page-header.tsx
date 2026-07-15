import type { ReactNode } from "react";

/** Standard panel heading: title + subtitle on the left, actions on the right. */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-5">
      <div>
        <h1 className="text-[27px] font-extrabold tracking-[-0.03em]">
          {title}
        </h1>
        {subtitle ? (
          <div className="mt-[3px] text-[13.5px] text-muted-foreground">
            {subtitle}
          </div>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2.5">{actions}</div>
      ) : null}
    </div>
  );
}

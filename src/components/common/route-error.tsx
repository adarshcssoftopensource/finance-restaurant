import { AlertTriangle, RotateCw } from "lucide-react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router";

import { Button } from "@/components/ui/button";

function describe(error: unknown): { heading: string; detail: string } {
  if (isRouteErrorResponse(error)) {
    return {
      heading: `${error.status} · ${error.statusText}`,
      detail:
        typeof error.data === "string"
          ? error.data
          : "We couldn't load this page.",
    };
  }
  if (error instanceof Error) {
    return { heading: "Something went wrong", detail: error.message };
  }
  return {
    heading: "Something went wrong",
    detail: "An unexpected error occurred. Please try again.",
  };
}

/** Router-level boundary: renders for any thrown render error or failed lazy chunk. */
export function RouteError() {
  const { heading, detail } = describe(useRouteError());

  return (
    <div
      role="alert"
      className="grid min-h-screen place-items-center bg-background px-6"
    >
      <div className="flex max-w-md flex-col items-center gap-5 text-center">
        <div className="grid size-14 place-items-center rounded-2xl bg-coral-soft text-coral-d">
          <AlertTriangle className="size-7" />
        </div>
        <div className="space-y-1.5">
          <h1 className="text-lg font-bold text-foreground">{heading}</h1>
          <p className="text-[13px] text-muted-foreground">{detail}</p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button onClick={() => window.location.reload()}>
            <RotateCw />
            Reload
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

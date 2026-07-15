import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";

/** Temporary panel — reuses the shell while the full design is built out. */
export function PlaceholderPage({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <Card className="items-center gap-2 p-12 text-center">
        <p className="text-[15px] font-bold">Panel coming next</p>
        <p className="max-w-[46ch] text-[13px] text-muted-foreground">
          The theming, component library, and app shell are in place. This panel
          follows the same pattern as the fully-built{" "}
          <span className="font-semibold text-coral-d">Overview</span> page.
        </p>
      </Card>
    </>
  );
}

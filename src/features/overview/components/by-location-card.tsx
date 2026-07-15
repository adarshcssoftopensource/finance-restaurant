import { useAppActions } from "@/store/app-store";
import { StatusPill } from "@/components/common/status-pill";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LOCATIONS, LOCATION_ORDER, type LocationKey } from "@/data/locations";

const SHARE: Record<LocationKey, string> = {
  soho: "44%",
  wburg: "30%",
  midtown: "26%",
};

export function ByLocationCard() {
  const { setLocation } = useAppActions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>By location</CardTitle>
        <span className="font-mono text-[11px] text-muted-foreground">
          today
        </span>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Collected</TableHead>
            <TableHead className="hidden text-right min-[820px]:table-cell">
              Tables
            </TableHead>
            <TableHead className="text-right">Share</TableHead>
            <TableHead>Toast</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LOCATION_ORDER.map((key) => {
            const loc = LOCATIONS[key];
            return (
              <TableRow
                key={key}
                className="cursor-pointer"
                onClick={() => setLocation(key)}
              >
                <TableCell className="font-bold">
                  {loc.name}
                  <small className="block font-mono text-[10.5px] font-medium text-muted-foreground">
                    {loc.region}
                  </small>
                </TableCell>
                <TableCell className="tnum text-right font-bold">
                  {loc.collected}
                </TableCell>
                <TableCell className="tnum hidden text-right min-[820px]:table-cell">
                  {loc.tablesPaid}
                </TableCell>
                <TableCell className="tnum text-right">{SHARE[key]}</TableCell>
                <TableCell>
                  <StatusPill tone="success">Synced</StatusPill>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}

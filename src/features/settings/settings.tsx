import { useState, type ReactNode } from "react";
import { Check, CircleAlert, Lock, Printer, Upload } from "lucide-react";
import { Link } from "react-router";

import { paths } from "@/lib/paths";
import { StatusPill } from "@/components/common/status-pill";
import { PageHeader } from "@/components/common/page-header";
import { PrintSignsOverlay } from "@/features/dashboard/components/print-signs-overlay";
import { ToggleSwitch } from "@/features/dashboard/components/toggle-switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LOCATIONS, LOCATION_ORDER, type LocationKey } from "@/data/locations";
import { RAIL_ORDER, RAILS } from "@/data/rails";
import qrImg from "@/assets/landing/qr.png";

type Profile = {
  name: string;
  tagline: string;
  address: string;
  logo: string | null;
};

const DEFAULT_PROFILES: Record<LocationKey, Profile> = {
  soho: {
    name: "Fiore · SoHo",
    tagline: "Trattoria",
    address: "210 Mulberry St, New York, NY",
    logo: null,
  },
  wburg: {
    name: "Fiore · Williamsburg",
    tagline: "Trattoria",
    address: "134 N 7th St, Brooklyn, NY",
    logo: null,
  },
  midtown: {
    name: "Fiore · Midtown",
    tagline: "Trattoria",
    address: "52 W 52nd St, New York, NY",
    logo: null,
  },
};

export default function Settings() {
  const [loc, setLoc] = useState<LocationKey>("soho");
  const [profiles, setProfiles] = useState(DEFAULT_PROFILES);
  const [saved, setSaved] = useState(false);
  const [passMaster, setPassMaster] = useState(true);
  const [passRails, setPassRails] = useState<Record<string, boolean>>({
    rw: true,
    rb: true,
    rc: false,
    rf: false,
  });
  const [tfa, setTfa] = useState(true);
  const [printOpen, setPrintOpen] = useState(false);

  const profile = profiles[loc];
  const venue = LOCATIONS[loc];
  const shortName = profile.name.split("·")[0]?.trim().toUpperCase() ?? "FIORE";
  const passCount = Object.values(passRails).filter(Boolean).length;

  function updateProfile(patch: Partial<Profile>) {
    setProfiles((p) => ({ ...p, [loc]: { ...p[loc], ...patch } }));
  }

  function saveProfile() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <section>
      <PageHeader title="Settings" subtitle="Venue, payouts, and table cards" />

      <Card className="mb-4 overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b px-[18px] pb-3.5 pt-4">
          <div className="max-w-[50ch]">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Business profile
            </div>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              Set per location. Your logo and name appear on the table QR signs
              and the guest payment page.
            </p>
          </div>
          <select
            aria-label="Location to edit"
            value={loc}
            onChange={(e) => setLoc(e.target.value as LocationKey)}
            className="rounded-[9px] border bg-card px-[11px] py-2 text-[13px]"
          >
            {LOCATION_ORDER.map((key) => (
              <option key={key} value={key}>
                {LOCATIONS[key].name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-[26px] p-[18px] min-[820px]:grid-cols-[1fr_262px]">
          <div>
            <div className="mb-4 flex items-center gap-[15px]">
              <LogoBox logo={profile.logo} fallback={venue.initial} />
              <div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <label className="cursor-pointer">
                      <Upload className="size-4" />
                      Upload logo
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/svg+xml"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === "string") {
                              updateProfile({ logo: reader.result });
                            }
                          };
                          reader.readAsDataURL(file);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateProfile({ logo: null })}
                  >
                    Remove
                  </Button>
                </div>
                <p className="mt-[7px] max-w-[34ch] text-[11px] text-muted-foreground">
                  PNG, JPG or SVG · square works best · shown on signs & the pay
                  page
                </p>
              </div>
            </div>

            <Field label="Display name">
              <input
                value={profile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                className={INPUT}
              />
            </Field>
            <Field label="Tagline">
              <input
                value={profile.tagline}
                onChange={(e) => updateProfile({ tagline: e.target.value })}
                placeholder="Trattoria"
                className={INPUT}
              />
            </Field>
            <Field label="Address">
              <input
                value={profile.address}
                onChange={(e) => updateProfile({ address: e.target.value })}
                className={INPUT}
              />
            </Field>
            <Field label="Timezone">
              <select className={INPUT}>
                <option>America/New_York · EST</option>
                <option>America/Chicago · CST</option>
                <option>America/Denver · MST</option>
                <option>America/Los_Angeles · PST</option>
              </select>
            </Field>
            <div className="flex items-center">
              <Button size="sm" onClick={saveProfile}>
                <Check className="size-4" />
                Save changes
              </Button>
              <span
                className={`ml-3 font-mono text-[11px] text-success transition-opacity ${saved ? "opacity-100" : "opacity-0"}`}
              >
                Saved · synced to signs & pay page
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-[11px]">
            <div className="w-[232px] overflow-hidden rounded-[30px] border-[7px] border-foreground bg-white shadow-[0_18px_36px_-18px_rgba(26,23,20,0.42)]">
              <div className="bg-linear-to-br from-[#F0674B] to-coral-d px-4 pb-4 pt-[18px] text-white">
                <LogoBox
                  logo={profile.logo}
                  fallback={venue.initial}
                  small
                  className="mb-2 bg-white/20 text-white"
                />
                <div className="font-display text-[23px] font-extrabold leading-none tracking-[-0.02em]">
                  {shortName}
                </div>
                <div className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.13em] opacity-90">
                  {profile.tagline.toUpperCase()} · {venue.region.toUpperCase()}
                </div>
                <div className="mt-[11px] font-display text-[17px] font-extrabold tracking-[-0.01em]">
                  View & pay your bill.
                </div>
              </div>
              <div className="px-4 pb-[17px] pt-[15px]">
                <div className="font-mono text-[8.5px] font-bold tracking-wider text-muted-foreground">
                  SCAN TO PAY · TABLE 12
                </div>
                <div className="mx-auto my-[11px] size-[122px] rounded-[11px] border p-[9px]">
                  <img
                    src={qrImg}
                    alt=""
                    className="size-full object-contain"
                  />
                </div>
                <div className="text-center font-mono text-[9px] text-muted-foreground">
                  {venue.payUrl}
                </div>
              </div>
            </div>
            <p className="font-mono text-[10.5px] text-faint">
              What guests see when they scan
            </p>
          </div>
        </div>
      </Card>

      <SettingsBlock>
        <SettingRow
          label="Payout account"
          value="Chase Business · ····1857"
          action={
            <Button variant="outline" size="sm">
              Update
            </Button>
          }
        />
        <SettingRow
          label="Payout schedule"
          value="Next-day payout · every rail"
          action={
            <Button variant="outline" size="sm">
              Change
            </Button>
          }
        />
        <SettingRow
          label="How settlement works"
          value="Guests pay at the table and funds settle straight to your payout account. Finance orchestrates the payment but never holds or touches your money."
          muted
        />
      </SettingsBlock>

      <SettingsBlock>
        <SettingRow
          label="Processing fees"
          value={
            <>
              Per transaction, next-day payout:
              <br />
              <b>1%</b> Finance Wallet · <b>2%</b> Guaranteed Bank{" "}
              <span className="text-muted-foreground">(U.S. only)</span> ·{" "}
              <b>3%</b> Credit & debit card · <b>4%</b> Pay over time
            </>
          }
          muted
        />
      </SettingsBlock>

      <SettingsBlock>
        <SettingRow
          label="Pass fees to customers"
          value="Add the Finance fee to the guest's total at checkout, so you keep 100% of the check. Pass every rail, or turn on only the ones you choose."
          muted
          action={
            <ToggleSwitch
              checked={passMaster}
              onChange={setPassMaster}
              label="Pass fees to customers"
            />
          }
        />
        <div
          className={`px-[18px] pb-1.5 pt-0.5 ${!passMaster ? "pointer-events-none opacity-40" : ""}`}
        >
          {RAIL_ORDER.map((key) => (
            <div
              key={key}
              className="flex items-center gap-[11px] border-b border-line2 py-3 last:border-b-0"
            >
              <i
                className={`size-[9px] shrink-0 rounded-full ${RAILS[key].dot}`}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13.5px] font-semibold">
                    {RAILS[key].label}
                  </span>
                  <span className="rounded-md bg-line2 px-[7px] py-0.5 font-mono text-[11px] font-bold text-ink2">
                    {RAILS[key].feePct}%
                  </span>
                </div>
                {key === "rc" ? (
                  <p className="mt-1 flex items-center gap-1 text-[11.5px] text-warning">
                    <CircleAlert className="size-3.5" />
                    Surcharging is regulated — network caps, some states, not on
                    debit
                  </p>
                ) : null}
              </div>
              <ToggleSwitch
                checked={passRails[key] ?? false}
                onChange={(on) => setPassRails((r) => ({ ...r, [key]: on }))}
                label={`Pass ${RAILS[key].label} fee`}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-line2 px-[18px] py-[13px] text-[12.5px] text-ink2">
          <Lock
            className="size-[15px] shrink-0 text-primary"
            strokeWidth={1.9}
          />
          {!passMaster ? (
            <span>Off — you absorb every Finance fee on every check.</span>
          ) : passCount === 4 ? (
            <span>
              Passing <b>every</b> fee to guests — you keep <b>100%</b> of every
              check.
            </span>
          ) : passCount === 0 ? (
            <span>
              No rails selected yet — flip a rail on to pass its fee to guests.
            </span>
          ) : (
            <span>
              Passing fees on <b>{passCount} of 4</b> rails — guests cover those
              and you keep <b>100%</b>. You absorb the fee on the other{" "}
              {4 - passCount}.
            </span>
          )}
        </div>
      </SettingsBlock>

      <SettingsBlock>
        <SettingRow
          label="Table QR signs"
          value="24 active · one on every table"
          action={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPrintOpen(true)}
              >
                <Printer className="size-4" />
                Print signs
              </Button>
              <Button variant="outline" size="sm">
                Order printed
              </Button>
            </>
          }
        />
        <SettingRow
          label="Tips"
          value="Default 20% · guests can adjust · or lock a set tip"
          action={
            <Button variant="outline" size="sm">
              Edit
            </Button>
          }
        />
      </SettingsBlock>

      <SettingsBlock>
        <SettingRow
          label="Two-factor authentication"
          value="Require a second step at sign-in for everyone with Admin or Owner access. Strongly recommended for accounts that move money."
          muted
          action={
            <ToggleSwitch
              checked={tfa}
              onChange={setTfa}
              label="Two-factor authentication"
            />
          }
        />
        <SettingRow
          label="Signed-in devices"
          value="3 active · MacBook · iPhone · iPad (SoHo host stand)"
          action={
            <Button variant="outline" size="sm">
              Manage
            </Button>
          }
        />
        <SettingRow
          label="Audit log"
          value="Every refund, fee change, payout edit & invite · kept for 2 years"
          action={
            <Button variant="outline" size="sm" asChild>
              <Link to={paths.dashboard.team.href}>View log</Link>
            </Button>
          }
        />
      </SettingsBlock>

      <SettingsBlock>
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line2 px-[18px] pb-3.5 pt-4">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Business verification
            </div>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              KYC / KYB — required before money can move. Managed with your
              sponsor bank.
            </p>
          </div>
          <StatusPill tone="success">Verified</StatusPill>
        </div>
        <VeriRow
          title="Legal entity"
          sub="Fiore Hospitality LLC · EIN ··7043"
        />
        <VeriRow
          title="Beneficial owners"
          sub="2 owners verified · 25%+ ownership"
        />
        <VeriRow
          title="Payout bank account"
          sub="Chase Business ····1857 · micro-deposits confirmed"
        />
        <VeriRow
          title="Fiore · Midtown location"
          sub="New location added — verification in review"
          pending
        />
      </SettingsBlock>

      <PrintSignsOverlay
        key={loc}
        open={printOpen}
        onClose={() => setPrintOpen(false)}
        defaultLocation={loc}
      />
    </section>
  );
}

const INPUT =
  "w-full rounded-[10px] border bg-card px-3 py-2.5 text-[14px] outline-none focus:border-primary focus:shadow-[0_0_0_3px_var(--color-coral-tint)]";

function SettingsBlock({ children }: { children: ReactNode }) {
  return (
    <Card className="mb-4 overflow-hidden shadow-[0_1px_2px_rgba(26,23,20,0.04),0_12px_28px_-20px_rgba(26,23,20,0.22)]">
      {children}
    </Card>
  );
}

function SettingRow({
  label,
  value,
  action,
  muted,
}: {
  label: string;
  value: ReactNode;
  action?: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line2 px-[18px] py-4 last:border-b-0">
      <div className={muted ? "max-w-[56ch]" : undefined}>
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </div>
        <div
          className={`mt-[3px] ${muted ? "text-[12.5px] leading-relaxed text-ink2" : "text-[14px] font-semibold"}`}
        >
          {value}
        </div>
      </div>
      {action ? <div className="flex flex-wrap gap-2">{action}</div> : null}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-[15px]">
      <label className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function LogoBox({
  logo,
  fallback,
  small,
  className,
}: {
  logo: string | null;
  fallback: string;
  small?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`grid shrink-0 place-items-center overflow-hidden rounded-[15px] border bg-foreground font-display font-extrabold text-white ${small ? "size-10 rounded-[10px] text-[19px]" : "size-[66px] text-[27px]"} ${className ?? ""}`}
    >
      {logo ? (
        <img src={logo} alt="" className="size-full object-cover" />
      ) : (
        fallback
      )}
    </div>
  );
}

function VeriRow({
  title,
  sub,
  pending,
}: {
  title: string;
  sub: string;
  pending?: boolean;
}) {
  return (
    <div className="flex items-center gap-[13px] border-b border-line2 px-[18px] py-[13px] last:border-b-0">
      <span
        className={`grid size-[30px] shrink-0 place-items-center rounded-lg ${pending ? "bg-warning-soft" : "bg-success-soft"}`}
      >
        <Check
          className={`size-4 ${pending ? "text-warning" : "text-success"}`}
          strokeWidth={2.4}
        />
      </span>
      <div>
        <b className="block text-[13.5px] font-bold">{title}</b>
        <span className="font-mono text-[11px] text-muted-foreground">
          {sub}
        </span>
      </div>
      <StatusPill tone={pending ? "warning" : "success"} className="ml-auto">
        {pending ? "Pending" : "Verified"}
      </StatusPill>
    </div>
  );
}

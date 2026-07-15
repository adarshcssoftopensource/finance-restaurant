import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError } from "@/components/ui/field";
import {
  AuthBackLink,
  AuthCta,
  AuthHeading,
  AuthLegal,
  AuthOrDivider,
  AuthProgress,
  SelectField,
  TextField,
  ToastAuthButton,
} from "@/features/auth/components/auth-form";
import { PasswordField } from "@/features/auth/components/password-field";
import { useAuthDraft } from "@/store/auth-store";
import {
  kybBankSchema,
  kybBusinessSchema,
  kybOwnersSchema,
  signUpAccountSchema,
  signUpRestaurantSchema,
  type KybBankValues,
  type KybBusinessValues,
  type KybOwnersValues,
  type SignUpAccountValues,
  type SignUpRestaurantValues,
} from "@/features/auth/schemas";
import { paths } from "@/lib/paths";

const SIGNUP_STEPS = [
  { label: "ACCOUNT", title: "Create your account" },
  { label: "RESTAURANT", title: "About your restaurant" },
  { label: "BUSINESS", title: "Business details" },
  { label: "OWNERS", title: "Owners & control" },
  { label: "PAYOUT BANK", title: "Where payouts land" },
  { label: "DONE", title: "Verification submitted" },
] as const;

const LOCATION_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2-5", label: "2–5" },
  { value: "6-20", label: "6–20" },
  { value: "20+", label: "20+" },
];

const POS_OPTIONS = [
  { value: "toast", label: "Toast" },
  { value: "square", label: "Square (waitlist)" },
  { value: "clover", label: "Clover (waitlist)" },
  { value: "other", label: "Other / none" },
];

const ENTITY_OPTIONS = [
  { value: "llc", label: "LLC" },
  { value: "corporation", label: "Corporation" },
  { value: "partnership", label: "Partnership" },
  { value: "sole-proprietorship", label: "Sole proprietorship" },
  { value: "nonprofit", label: "Nonprofit" },
];

const STATE_OPTIONS = [
  { value: "New York", label: "New York" },
  { value: "Delaware", label: "Delaware" },
  { value: "Wyoming", label: "Wyoming" },
  { value: "California", label: "California" },
  { value: "Texas", label: "Texas" },
  { value: "Other", label: "Other…" },
];

const ROLE_OPTIONS = [
  { value: "owner", label: "Owner / Member" },
  { value: "ceo", label: "CEO" },
  { value: "president", label: "President" },
  { value: "partner", label: "Managing partner" },
  { value: "officer", label: "Other officer" },
];

const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const ACCOUNT_TYPES = [
  { value: "checking", label: "Business checking" },
  { value: "savings", label: "Business savings" },
];

const DONE_STEPS = [
  {
    title: "Business details submitted",
    detail: "Reviewed with our sponsor bank",
    done: true,
  },
  {
    title: "Owners & control submitted",
    detail: "Identity checks usually clear in minutes",
    done: true,
  },
  {
    title: "Bank verification pending",
    detail: "Two micro-deposits arriving in 1–2 business days",
    done: false,
  },
];

export default function SignUpPage() {
  const [step, setStep] = useState(1);

  switch (step) {
    case 1:
      return <AccountStep onNext={() => setStep(2)} />;
    case 2:
      return (
        <RestaurantStep onBack={() => setStep(1)} onNext={() => setStep(3)} />
      );
    case 3:
      return (
        <BusinessStep onBack={() => setStep(2)} onNext={() => setStep(4)} />
      );
    case 4:
      return <OwnersStep onBack={() => setStep(3)} onNext={() => setStep(5)} />;
    case 5:
      return <BankStep onBack={() => setStep(4)} onNext={() => setStep(6)} />;
    case 6:
      return <DoneStep />;
    default:
      return <AccountStep onNext={() => setStep(2)} />;
  }
}

function AccountStep({ onNext }: { onNext: () => void }) {
  const { setEmail, setName } = useAuthDraft();
  const form = useForm<SignUpAccountValues>({
    resolver: zodResolver(signUpAccountSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  return (
    <form
      onSubmit={(event) => {
        void form.handleSubmit((values) => {
          setEmail(values.email);
          setName(values.name);
          onNext();
        })(event);
      }}
      aria-label="Create your account — step 1"
    >
      <AuthProgress step={1} total={6} label={SIGNUP_STEPS[0].label} />
      <AuthHeading
        title={SIGNUP_STEPS[0].title}
        subtitle="Takes about two minutes. Guests can be paying at the table this week."
      />

      <ToastAuthButton>Sign up with Toast</ToastAuthButton>
      <AuthOrDivider />

      <div className="space-y-4">
        <TextField
          control={form.control}
          name="name"
          label="Your name"
          autoComplete="name"
          placeholder="Jordan Lee"
        />
        <TextField
          control={form.control}
          name="email"
          label="Work email"
          type="email"
          autoComplete="email"
          placeholder="you@yourrestaurant.com"
        />
        <PasswordField
          control={form.control}
          name="password"
          label="Password"
          showMeter
          description="At least 10 characters with a number or symbol."
        />
      </div>

      <AuthCta>
        Continue
        <ArrowIcon />
      </AuthCta>
      <AuthLegal>
        By continuing you agree to the <Link to="#">Terms</Link> and{" "}
        <Link to="#">Privacy Policy</Link>.
      </AuthLegal>
    </form>
  );
}

function RestaurantStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const { setRestaurantName } = useAuthDraft();
  const form = useForm<SignUpRestaurantValues>({
    resolver: zodResolver(signUpRestaurantSchema),
    defaultValues: {
      restaurantName: "",
      locations: "1",
      pos: "toast",
      city: "",
    },
  });

  return (
    <form
      onSubmit={(event) => {
        void form.handleSubmit((values) => {
          setRestaurantName(values.restaurantName);
          onNext();
        })(event);
      }}
      aria-label="Create your account — step 2"
    >
      <AuthProgress step={2} total={6} label={SIGNUP_STEPS[1].label} />
      <AuthBackLink onClick={onBack} />
      <AuthHeading
        title={SIGNUP_STEPS[1].title}
        subtitle="We use this to set up your account, signs, and payouts."
      />

      <div className="space-y-4">
        <TextField
          control={form.control}
          name="restaurantName"
          label="Restaurant name"
          autoComplete="organization"
          placeholder="Fiore Trattoria"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <SelectField
            control={form.control}
            name="locations"
            label="Locations"
            options={LOCATION_OPTIONS}
          />
          <SelectField
            control={form.control}
            name="pos"
            label="Point of sale"
            options={POS_OPTIONS}
          />
        </div>
        <TextField
          control={form.control}
          name="city"
          label="City"
          autoComplete="address-level2"
          placeholder="New York, NY"
        />
      </div>

      <AuthCta>
        Continue to business verification
        <ArrowIcon />
      </AuthCta>
      <AuthLegal>
        Federal law requires us to verify your business before payouts can
        begin.
      </AuthLegal>
    </form>
  );
}

function BusinessStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const form = useForm<KybBusinessValues>({
    resolver: zodResolver(kybBusinessSchema),
    defaultValues: {
      legalName: "",
      dba: "",
      entityType: "llc",
      ein: "",
      formationState: "New York",
      phone: "",
      address: "",
    },
  });

  const formatEin = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    return digits.length > 2
      ? `${digits.slice(0, 2)}-${digits.slice(2)}`
      : digits;
  };

  return (
    <form
      onSubmit={(event) => {
        void form.handleSubmit(onNext)(event);
      }}
      aria-label="Business details"
    >
      <AuthProgress step={3} total={6} label={SIGNUP_STEPS[2].label} />
      <AuthBackLink onClick={onBack} />
      <AuthHeading
        title={SIGNUP_STEPS[2].title}
        subtitle="Exactly as they appear on your IRS documents."
      />

      <div className="space-y-4">
        <TextField
          control={form.control}
          name="legalName"
          label="Legal business name"
          autoComplete="organization"
          placeholder="Fiore Hospitality LLC"
        />
        <TextField
          control={form.control}
          name="dba"
          label="Doing business as (optional)"
          placeholder="Fiore Trattoria"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <SelectField
            control={form.control}
            name="entityType"
            label="Entity type"
            options={ENTITY_OPTIONS}
          />
          <TextField
            control={form.control}
            name="ein"
            label="EIN"
            inputMode="numeric"
            placeholder="12-3456789"
            maxLength={10}
            onChange={(event) => {
              const formatted = formatEin(event.target.value);
              event.target.value = formatted;
              form.setValue("ein", formatted, { shouldValidate: true });
            }}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <SelectField
            control={form.control}
            name="formationState"
            label="Formation state"
            options={STATE_OPTIONS}
          />
          <TextField
            control={form.control}
            name="phone"
            label="Business phone"
            type="tel"
            autoComplete="tel"
            placeholder="(212) 555-0142"
          />
        </div>
        <TextField
          control={form.control}
          name="address"
          label="Registered business address"
          autoComplete="street-address"
          placeholder="210 Mulberry St, New York, NY 10012"
        />
      </div>

      <AuthCta>
        Continue
        <ArrowIcon />
      </AuthCta>

      <div className="mt-4 rounded-[11px] border border-line bg-card px-3.5 py-2.5 text-[11.5px] leading-relaxed text-muted-foreground">
        <b className="text-ink2">Why we ask:</b> U.S. federal law requires
        payment platforms to verify the businesses they serve. Handled with our
        sponsor bank.
      </div>
    </form>
  );
}

function OwnersStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const form = useForm<KybOwnersValues>({
    resolver: zodResolver(kybOwnersSchema),
    defaultValues: {
      controlPerson: {
        fullName: "",
        role: "owner",
        dob: "",
        ssn: "",
        homeAddress: "",
        ownershipPct: "",
        isOwner: "yes",
      },
      extraOwners: [],
      certified: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "extraOwners",
  });

  return (
    <form
      onSubmit={(event) => {
        void form.handleSubmit(onNext)(event);
      }}
      aria-label="Owners and control"
    >
      <AuthProgress step={4} total={6} label={SIGNUP_STEPS[3].label} />
      <AuthBackLink onClick={onBack} />
      <AuthHeading
        title={SIGNUP_STEPS[3].title}
        subtitle={
          <>
            Everyone who owns <b>25% or more</b>, plus one person with
            significant control (CEO, manager, or similar).
          </>
        }
      />

      <OwnerCard title="Control person" tag="REQUIRED">
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextField
            control={form.control}
            name="controlPerson.fullName"
            label="Full legal name"
            autoComplete="name"
            placeholder="Jordan Lee"
          />
          <SelectField
            control={form.control}
            name="controlPerson.role"
            label="Role"
            options={ROLE_OPTIONS}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextField
            control={form.control}
            name="controlPerson.dob"
            label="Date of birth"
            inputMode="numeric"
            placeholder="MM / DD / YYYY"
            maxLength={14}
          />
          <PasswordField
            control={form.control}
            name="controlPerson.ssn"
            label="SSN"
          />
        </div>
        <TextField
          control={form.control}
          name="controlPerson.homeAddress"
          label="Home address"
          autoComplete="street-address"
          placeholder="Street, city, state, ZIP"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextField
            control={form.control}
            name="controlPerson.ownershipPct"
            label="Ownership %"
            inputMode="numeric"
            placeholder="e.g. 60"
            maxLength={3}
          />
          <SelectField
            control={form.control}
            name="controlPerson.isOwner"
            label="Also a 25%+ owner?"
            options={YES_NO}
          />
        </div>
      </OwnerCard>

      {fields.map((field, index) => (
        <OwnerCard
          key={field.id}
          title={`Beneficial owner ${index + 1}`}
          onRemove={() => remove(index)}
        >
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextField
              control={form.control}
              name={`extraOwners.${index}.fullName`}
              label="Full legal name"
              placeholder="Full name"
            />
            <TextField
              control={form.control}
              name={`extraOwners.${index}.ownershipPct`}
              label="Ownership %"
              inputMode="numeric"
              placeholder="25–100"
              maxLength={3}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextField
              control={form.control}
              name={`extraOwners.${index}.dob`}
              label="Date of birth"
              inputMode="numeric"
              placeholder="MM / DD / YYYY"
              maxLength={14}
            />
            <PasswordField
              control={form.control}
              name={`extraOwners.${index}.ssn`}
              label="SSN"
            />
          </div>
          <TextField
            control={form.control}
            name={`extraOwners.${index}.homeAddress`}
            label="Home address"
            placeholder="Street, city, state, ZIP"
          />
        </OwnerCard>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            fullName: "",
            ownershipPct: "",
            dob: "",
            ssn: "",
            homeAddress: "",
          })
        }
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line px-3 py-2.5 text-[13px] font-bold text-ink2 hover:border-primary hover:bg-coral-tint hover:text-coral-d"
      >
        + Add another 25%+ owner
      </button>

      <Field className="mt-4 flex-row items-start">
        <Controller
          control={form.control}
          name="certified"
          render={({ field, fieldState }) => (
            <>
              <Checkbox
                id="certified"
                className="size-4!"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
              <div>
                <label
                  htmlFor="certified"
                  className="text-[12.5px] leading-relaxed text-ink2"
                >
                  I certify, to the best of my knowledge, that the information
                  provided is complete and correct, and I&apos;m authorized to
                  submit it for this business.
                </label>
                <FieldError errors={[fieldState.error]} />
              </div>
            </>
          )}
        />
      </Field>

      <AuthCta>
        Continue
        <ArrowIcon />
      </AuthCta>
    </form>
  );
}

function BankStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const form = useForm<KybBankValues>({
    resolver: zodResolver(kybBankSchema),
    defaultValues: {
      nickname: "",
      routing: "",
      accountType: "checking",
      accountNumber: "",
      confirmAccountNumber: "",
    },
  });

  return (
    <form
      onSubmit={(event) => {
        void form.handleSubmit(onNext)(event);
      }}
      aria-label="Payout bank account"
    >
      <AuthProgress step={5} total={6} label={SIGNUP_STEPS[4].label} />
      <AuthBackLink onClick={onBack} />
      <AuthHeading
        title={SIGNUP_STEPS[4].title}
        subtitle={
          <>
            Your business bank account. Guest payments settle here directly —{" "}
            <b>next day, every rail</b>. Finance never holds your money.
          </>
        }
      />

      <ToastAuthButton>Connect your bank instantly</ToastAuthButton>
      <AuthOrDivider>OR ENTER MANUALLY</AuthOrDivider>

      <div className="space-y-4">
        <TextField
          control={form.control}
          name="nickname"
          label="Account nickname"
          placeholder="Chase Business Checking"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextField
            control={form.control}
            name="routing"
            label="Routing number"
            inputMode="numeric"
            placeholder="9 digits"
            maxLength={9}
          />
          <SelectField
            control={form.control}
            name="accountType"
            label="Account type"
            options={ACCOUNT_TYPES}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <PasswordField
            control={form.control}
            name="accountNumber"
            label="Account number"
          />
          <PasswordField
            control={form.control}
            name="confirmAccountNumber"
            label="Confirm account"
          />
        </div>
      </div>

      <AuthCta>
        Submit for verification
        <CheckIcon />
      </AuthCta>
      <AuthLegal>
        Manual entry is confirmed with two micro-deposits (1–2 business days).
        The account must belong to <b>the business</b>, not an individual.
      </AuthLegal>
    </form>
  );
}

function DoneStep() {
  const navigate = useNavigate();
  const email = useAuthDraft((s) => s.email) || "you@yourrestaurant.com";

  return (
    <section aria-label="Verification submitted">
      <AuthProgress step={6} total={6} label={SIGNUP_STEPS[5].label} />

      <div className="mb-4 grid size-[58px] place-items-center rounded-2xl bg-success-soft">
        <CheckIcon className="size-[26px]" />
      </div>

      <AuthHeading
        title="You're in — verification is running"
        subtitle={
          <>
            We sent a confirmation link to <b>{email}</b>. You can set up your
            restaurant now; payouts switch on the moment verification clears.
          </>
        }
      />

      <div className="mt-4">
        {DONE_STEPS.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 border-b border-line2 py-2.5 last:border-b-0"
          >
            <div
              className={
                item.done
                  ? "grid size-7 place-items-center rounded-lg bg-success-soft"
                  : "grid size-7 place-items-center rounded-lg bg-warning-soft"
              }
            >
              {item.done ? (
                <CheckIcon className="size-[15px] text-success" />
              ) : (
                <ClockIcon />
              )}
            </div>
            <div>
              <b className="block text-[13px] font-bold">{item.title}</b>
              <span className="font-mono text-[10.5px] text-muted-foreground">
                {item.detail}
              </span>
            </div>
          </div>
        ))}
      </div>

      <AuthCta
        type="button"
        onClick={() => void navigate(paths.dashboard.href)}
      >
        Go to your dashboard
        <ArrowIcon />
      </AuthCta>
    </section>
  );
}

function OwnerCard({
  title,
  tag,
  onRemove,
  children,
}: {
  title: string;
  tag?: string;
  onRemove?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3.5 rounded-[14px] border border-line bg-card p-4">
      <div className="mb-1 flex items-center justify-between">
        <b className="text-[13px] font-extrabold">{title}</b>
        {tag ? (
          <span className="rounded-full bg-coral-tint px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.08em] text-coral-d">
            {tag}
          </span>
        ) : (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-md px-2 py-1 font-mono text-[10px] font-bold text-muted-foreground hover:bg-coral-tint hover:text-coral-d"
          >
            REMOVE
          </button>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-4"} aria-hidden>
      <path
        d="M5 13l4 4L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[15px] text-warning" aria-hidden>
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M12 7v5l3 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      />
    </svg>
  );
}

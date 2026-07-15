import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { Checkbox } from "@/components/ui/checkbox";
import {
  AuthBackLink,
  AuthCta,
  AuthHeading,
  AuthOrDivider,
  TextField,
  ToastAuthButton,
} from "@/features/auth/components/auth-form";
import { OtpField } from "@/features/auth/components/otp-field";
import { PasswordField } from "@/features/auth/components/password-field";
import {
  mfaSchema,
  signInSchema,
  type MfaValues,
  type SignInValues,
} from "@/features/auth/schemas";
import { paths } from "@/lib/paths";

type SignInStep = "credentials" | "mfa";

export default function SignInPage() {
  const [step, setStep] = useState<SignInStep>("credentials");

  if (step === "mfa") {
    return <MfaStep onBack={() => setStep("credentials")} />;
  }

  return <CredentialsStep onNext={() => setStep("mfa")} />;
}

function CredentialsStep({ onNext }: { onNext: () => void }) {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  return (
    <form
      onSubmit={(event) => {
        void form.handleSubmit(onNext)(event);
      }}
      aria-label="Sign in"
    >
      <AuthHeading
        title="Welcome back"
        subtitle="Sign in to run your floor, payments, and payouts."
      />

      <ToastAuthButton>Continue with Toast</ToastAuthButton>
      <AuthOrDivider />

      <div className="space-y-4">
        <TextField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@yourrestaurant.com"
        />
        <PasswordField
          control={form.control}
          name="password"
          label="Password"
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-[13px]">
        <Controller
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <label className="flex cursor-pointer items-center gap-2 text-ink2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
              Keep me signed in
            </label>
          )}
        />
        <Link
          to={paths.auth.forgotPassword.href}
          className="font-bold text-coral-d"
        >
          Forgot password?
        </Link>
      </div>

      <AuthCta>
        Sign in
        <ArrowIcon />
      </AuthCta>
    </form>
  );
}

function MfaStep({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();
  const form = useForm<MfaValues>({
    resolver: zodResolver(mfaSchema),
    defaultValues: { code: "" },
  });

  return (
    <form
      onSubmit={(event) => {
        void form.handleSubmit(() => void navigate(paths.dashboard.href))(
          event,
        );
      }}
      aria-label="Two-factor authentication"
    >
      <AuthBackLink onClick={onBack} />
      <AuthHeading
        title="Check your phone"
        subtitle={
          <>
            Enter the 6-digit code from your authenticator app. Required for{" "}
            <b>Owner & Admin</b> accounts.
          </>
        }
      />

      <OtpField control={form.control} name="code" />

      <AuthCta>
        Verify & sign in
        <CheckIcon />
      </AuthCta>

      <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
        Didn&apos;t get it?{" "}
        <button type="button" className="font-bold text-coral-d">
          Resend code
        </button>{" "}
        ·{" "}
        <button
          type="button"
          className="font-mono text-[11px] font-bold text-coral-d"
        >
          Use a backup code
        </button>
      </p>
    </form>
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        d="M5 13l4 4L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      />
    </svg>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { AuthCta, AuthHeading } from "@/features/auth/components/auth-form";
import { PasswordField } from "@/features/auth/components/password-field";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/features/auth/schemas";
import { paths } from "@/lib/paths";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit(() => navigate(paths.auth.signIn.href))(event);
      }}
      aria-label="Choose a new password"
    >
      <AuthHeading
        title="Choose a new password"
        subtitle={
          <>
            For <b>jason@fioregroup.com</b> · you&apos;ll be signed out
            everywhere else.
          </>
        }
      />

      <PasswordField
        control={form.control}
        name="password"
        label="New password"
        showMeter
      />
      <PasswordField
        control={form.control}
        name="confirmPassword"
        label="Confirm password"
      />

      <AuthCta>
        Set password & sign in
        <CheckIcon />
      </AuthCta>
    </form>
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

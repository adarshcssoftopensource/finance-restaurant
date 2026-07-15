import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import {
  AuthBackLink,
  AuthCta,
  AuthHeading,
  TextField,
} from "@/features/auth/components/auth-form";
import { useAuthDraft } from "@/store/auth-store";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/features/auth/schemas";
import { paths } from "@/lib/paths";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const setResetEmail = useAuthDraft((s) => s.setResetEmail);
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit((values) => {
          setResetEmail(values.email);
          void navigate(
            paths.auth.forgotPasswordSent.getHref({ email: values.email }),
          );
        })(event);
      }}
      aria-label="Reset your password"
    >
      <AuthBackLink onClick={() => void navigate(paths.auth.signIn.href)} />
      <AuthHeading
        title="Reset your password"
        subtitle="Enter your email and we'll send a reset link. For security, payout details can't be changed for 24 hours after a reset."
      />

      <TextField
        control={form.control}
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@yourrestaurant.com"
      />

      <AuthCta>
        Send reset link
        <SendIcon />
      </AuthCta>
    </form>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      />
    </svg>
  );
}

import { useNavigate } from "react-router";

import { AuthCta, AuthHeading } from "@/features/auth/components/auth-form";
import { useAuthDraft } from "@/store/auth-store";
import { paths } from "@/lib/paths";

export default function ForgotPasswordSentPage() {
  const navigate = useNavigate();
  const email = useAuthDraft((s) => s.resetEmail) || "you@yourrestaurant.com";

  return (
    <section aria-label="Reset link sent">
      <div className="mb-4 grid size-[58px] place-items-center rounded-2xl bg-success-soft">
        <svg
          viewBox="0 0 24 24"
          className="size-[26px] text-success"
          aria-hidden
        >
          <path
            d="M5 13l4 4L19 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
          />
        </svg>
      </div>

      <AuthHeading
        title="Check your inbox"
        subtitle={
          <>
            If an account exists for <b>{email}</b>, a reset link is on its way.
            It expires in 30 minutes.
          </>
        }
      />

      <AuthCta
        type="button"
        className="border-[1.5px] border-foreground bg-card text-foreground hover:bg-line2"
        onClick={() => void navigate(paths.auth.signIn.href)}
      >
        Back to sign in
        <ArrowIcon />
      </AuthCta>

      <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
        Nothing after a few minutes? Check spam or{" "}
        <button type="button" className="font-bold text-coral-d">
          resend
        </button>
        .
      </p>
    </section>
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

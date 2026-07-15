import { NAV_LINKS, WRAP } from "../data";
import { LandingCta } from "./landing-cta";
import { paths } from "@/lib/paths";
import { Logo } from "@/components/common/logo";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
      <div className={`${WRAP} flex h-[66px] items-center justify-between`}>
        <Logo className="h-6" />

        <nav className="hidden items-center gap-7 text-[14.5px] font-medium min-[860px]:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative transition-colors after:absolute after:bottom-[-5px] after:left-0 after:h-0.5 after:w-0 after:rounded-[2px] after:bg-primary after:transition-[width] after:duration-200 hover:text-coral-d hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          <LandingCta
            variant="ghost"
            to={paths.auth.signIn.href}
            className="hidden sm:inline-flex"
          >
            Sign in
          </LandingCta>
          <LandingCta to={paths.auth.signUp.href}>Get started</LandingCta>
        </div>
      </div>
    </header>
  );
}

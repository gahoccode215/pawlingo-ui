import Link from "next/link";
import type { ReactNode } from "react";

type AuthPageShellProps = {
  children: ReactNode;
  mode: "login" | "register";
};

const panelContent = {
  login: {
    label: "Welcome back",
    title: "Return to your learning rhythm.",
    description:
      "A few focused minutes can keep useful English close at hand.",
  },
  register: {
    label: "Begin with PawLingo",
    title: "Make English part of your day.",
    description:
      "Build a steady practice around the words and phrases you will actually use.",
  },
} as const;

export function AuthPageShell({ children, mode }: AuthPageShellProps) {
  const content = panelContent[mode];

  return (
    <main className="min-h-[100dvh] bg-background text-foreground">
      <div className="grid min-h-[100dvh] lg:grid-cols-[minmax(0,1.08fr)_minmax(28rem,0.92fr)]">
        <section className="flex min-h-[100dvh] flex-col bg-background px-5 py-6 sm:px-8 sm:py-8 md:px-12 lg:px-16 xl:px-24">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-3 rounded-[12px] text-[17px] font-semibold tracking-[-0.025em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <span className="grid size-9 place-items-center rounded-[12px] bg-primary text-sm font-bold text-primary-foreground">
              P
            </span>
            PawLingo
          </Link>

          <div className="flex flex-1 items-center py-10 sm:py-14">
            <div className="mx-auto w-full max-w-[27.5rem]">{children}</div>
          </div>
        </section>

        <aside
          aria-label="Learning with PawLingo"
          className="relative hidden min-h-[100dvh] overflow-hidden bg-primary px-12 py-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between xl:px-16 xl:py-14"
        >
          <div
            aria-hidden="true"
            className="absolute -right-28 -top-24 size-80 rounded-full border border-primary-foreground/10"
          />
          <div
            aria-hidden="true"
            className="absolute -right-4 top-24 size-40 rounded-full border border-primary-foreground/10"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-36 left-12 h-2 w-20 rounded-full bg-accent"
          />

          <p className="relative text-sm font-semibold tracking-[-0.02em] text-primary-foreground/80">
            English for everyday life
          </p>

          <div className="relative max-w-[34rem] py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/65">
              {content.label}
            </p>
            <h2 className="mt-5 text-[clamp(3rem,4.7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-balance">
              {content.title}
            </h2>
            <p className="mt-7 max-w-[30rem] text-base leading-7 text-primary-foreground/75">
              {content.description}
            </p>
          </div>

          <p
            aria-hidden="true"
            className="relative text-[clamp(4.5rem,8vw,8rem)] font-semibold leading-none tracking-[-0.08em] text-primary-foreground/12"
          >
            hello<span className="text-accent">.</span>
          </p>
        </aside>
      </div>
    </main>
  );
}

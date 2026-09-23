import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="min-h-[100dvh] bg-auth-backdrop p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[calc(100dvh-32px)] max-w-[1280px] flex-col overflow-hidden rounded-[16px] border border-line bg-canvas sm:min-h-[calc(100dvh-48px)] lg:min-h-[calc(100dvh-64px)]">
        <header className="flex h-[72px] shrink-0 items-center border-b border-line px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="text-[24px] font-semibold tracking-[-0.9px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
          >
            PawLingo
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8 sm:py-10">{children}</div>
      </div>
    </main>
  );
}

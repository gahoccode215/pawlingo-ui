"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeNavigation = useCallback(() => {
    setNavigationOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <a
        href="#dashboard-main"
        className="fixed left-4 top-3 z-50 -translate-y-20 rounded-[12px] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>

      <DashboardHeader
        navigationOpen={navigationOpen}
        onMenuClick={() => setNavigationOpen((current) => !current)}
        menuButtonRef={menuButtonRef}
      />
      <DashboardSidebar open={navigationOpen} onClose={closeNavigation} />

      <main
        id="dashboard-main"
        tabIndex={-1}
        className="min-h-[calc(100dvh-72px)] md:pl-[5.25rem] lg:pl-64"
      >
        <div className="mx-auto w-full max-w-[90rem] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-12">
          {children}
        </div>
      </main>
    </div>
  );
}

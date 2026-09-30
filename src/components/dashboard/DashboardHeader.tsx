"use client";

import Link from "next/link";
import type { RefObject } from "react";

import { DashboardIcon } from "./DashboardIcon";

type DashboardHeaderProps = {
  navigationOpen: boolean;
  onMenuClick: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
};

export function DashboardHeader({
  navigationOpen,
  onMenuClick,
  menuButtonRef,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 h-[72px] border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex h-full w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          className="inline-flex w-fit items-center gap-3 rounded-[12px] text-[17px] font-semibold tracking-[-0.025em] text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <span className="grid size-9 place-items-center rounded-[12px] bg-primary text-sm font-bold text-primary-foreground">
            P
          </span>
          PawLingo
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            disabled
            title="Notifications are not available yet"
            aria-label="Notifications are not available yet"
            className="hidden size-10 cursor-not-allowed place-items-center rounded-[12px] text-muted-foreground opacity-55 sm:grid"
          >
            <DashboardIcon name="bell" />
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={`${navigationOpen ? "Close" : "Open"} navigation menu`}
            aria-controls="dashboard-navigation"
            aria-expanded={navigationOpen}
            onClick={onMenuClick}
            className="grid size-10 place-items-center rounded-[12px] border border-border bg-card text-foreground transition-[background-color,border-color,transform] hover:border-primary/35 hover:bg-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20 active:translate-y-px md:hidden"
          >
            <DashboardIcon name="menu" />
          </button>

          <div
            role="img"
            aria-label="User profile placeholder"
            title="User profile"
            className="grid size-10 place-items-center rounded-[12px] border border-border bg-muted text-xs font-semibold tracking-[-0.02em] text-muted-foreground"
          >
            PL
          </div>
        </div>
      </div>
    </header>
  );
}

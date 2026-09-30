"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { DashboardIcon, type DashboardIconName } from "./DashboardIcon";

type DashboardSidebarProps = {
  open: boolean;
  onClose: () => void;
};

type NavigationItem = {
  label: string;
  icon: DashboardIconName;
  href?: string;
};

const primaryNavigation: NavigationItem[] = [
  { label: "Dashboard", icon: "home", href: "/dashboard" },
  { label: "Learning", icon: "book" },
  { label: "Vocabulary", icon: "vocabulary" },
  { label: "Listening", icon: "headphones" },
  { label: "Speaking", icon: "mic" },
  { label: "Progress", icon: "target" },
];

const secondaryNavigation: NavigationItem[] = [
  { label: "Settings", icon: "settings" },
];

function NavigationItem({ item, active, onNavigate }: {
  item: NavigationItem;
  active: boolean;
  onNavigate: () => void;
}) {
  const content = (
    <>
      <DashboardIcon name={item.icon} className="size-[19px] shrink-0" />
      <span className="md:sr-only lg:not-sr-only">{item.label}</span>
      {!item.href ? (
        <span className="ml-auto text-[11px] font-medium text-muted-foreground md:hidden lg:inline">
          Soon
        </span>
      ) : null}
    </>
  );

  const className = `flex min-h-11 w-full items-center gap-3 rounded-[12px] px-3 text-left text-[14px] font-medium transition-[background-color,color,transform] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:justify-center md:px-0 lg:justify-start lg:px-3 ${
    active
      ? "bg-secondary text-secondary-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground active:translate-y-px"
  }`;

  if (item.href) {
    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={className}
        title={item.label}
        onClick={onNavigate}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled
      title={`${item.label} is not available yet`}
      className={`${className} cursor-not-allowed opacity-55 hover:bg-transparent hover:text-muted-foreground`}
    >
      {content}
    </button>
  );
}

export function DashboardSidebar({ open, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={open ? 0 : -1}
        className={`fixed inset-x-0 bottom-0 top-[72px] z-20 bg-foreground/20 transition-opacity md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        id="dashboard-navigation"
        aria-label="Learning navigation"
        className={`fixed bottom-0 left-0 top-[72px] z-30 flex w-72 flex-col border-r border-border bg-card px-4 py-5 transition-transform duration-200 md:w-[5.25rem] md:translate-x-0 md:px-3 lg:w-64 lg:px-4 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex min-h-11 items-center justify-between px-2 md:hidden">
          <p className="text-sm font-semibold tracking-[-0.02em] text-foreground">
            Navigation
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-[12px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:translate-y-px"
          >
            <DashboardIcon name="close" />
          </button>
        </div>

        <nav aria-label="Dashboard sections" className="mt-5 md:mt-1">
          <p className="px-3 pb-3 text-xs font-semibold text-muted-foreground md:sr-only lg:not-sr-only">
            Learning space
          </p>
          <div className="space-y-1.5">
            {primaryNavigation.map((item) => (
              <NavigationItem
                key={item.label}
                item={item}
                active={Boolean(item.href && pathname === item.href)}
                onNavigate={onClose}
              />
            ))}
          </div>
        </nav>

        <div className="mt-auto border-t border-border pt-4">
          {secondaryNavigation.map((item) => (
            <NavigationItem
              key={item.label}
              item={item}
              active={false}
              onNavigate={onClose}
            />
          ))}
        </div>
      </aside>
    </>
  );
}

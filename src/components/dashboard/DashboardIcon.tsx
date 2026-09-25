import type { ReactNode } from "react";

export type DashboardIconName =
  | "arrow"
  | "bell"
  | "book"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "flame"
  | "headphones"
  | "home"
  | "lock"
  | "menu"
  | "message"
  | "mic"
  | "play"
  | "search"
  | "settings"
  | "spark"
  | "target"
  | "trophy"
  | "user"
  | "vocabulary";

type DashboardIconProps = {
  name: DashboardIconName;
  className?: string;
};

export function DashboardIcon({
  name,
  className = "size-[18px]",
}: DashboardIconProps) {
  const paths: Record<DashboardIconName, ReactNode> = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z" /><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    flame: <path d="M13.5 2.8c.7 4-2.2 4.8-1.3 7.4.5 1.4 2 1.6 2.8.2 1-1.7.4-3.8.4-4.4 3.2 2.2 5.1 5.2 5.1 8.4a7.5 7.5 0 0 1-15 0c0-4 2.6-7.4 6.5-10.6-.2 2.9.9 4.5 2.1 4.5 2 0 1.5-3.5 2.7-8.1Z" />,
    headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M6 13H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2zm12 0h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2z" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /><path d="M8 9h8m-8 4h5" /></>,
    mic: <><rect x="8" y="3" width="8" height="12" rx="4" /><path d="M5 11a7 7 0 0 0 14 0m-7 7v3m-4 0h8" /></>,
    play: <path d="m9 7 8 5-8 5z" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.5-2.5 1a7 7 0 0 0-1.8-1L14.2 3h-4l-.4 2.8a7 7 0 0 0-1.8 1l-2.6-1-2 3.5 2.1 1.7a7 7 0 0 0 0 2l-2.1 1.6 2 3.5 2.6-1a7 7 0 0 0 1.8 1l.4 2.9h4l.4-2.8a7 7 0 0 0 1.8-1l2.5 1 2-3.5-2-1.7c.1-.3.1-.7.1-1Z" /></>,
    spark: <><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" /><path d="m5 15 .8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8z" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
    trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0zM12 13v4m-4 4h8m-6-4h4" /><path d="M8 6H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    vocabulary: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 8h6m-6 4h10m-10 4h7" /></>,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
    >
      {paths[name]}
    </svg>
  );
}

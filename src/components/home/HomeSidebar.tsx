import { BookOpen, Gamepad2, Heart, Settings, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface SidebarLink {
  icon: typeof BookOpen;
  label: string;
  href?: string;
  comingSoon?: boolean;
}

interface SidebarGroup {
  label: string;
  links: SidebarLink[];
}

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    label: "Học tập",
    links: [
      { icon: BookOpen, label: "Từ vựng", href: "/vocabularies" },
      { icon: Heart, label: "Từ vựng của tôi", href: "/me/vocabularies" },
    ],
  },
  {
    label: "Cộng đồng",
    links: [
      { icon: Trophy, label: "Bảng xếp hạng", comingSoon: true },
      { icon: Users, label: "Bạn bè", comingSoon: true },
    ],
  },
  {
    label: "Khác",
    links: [
      { icon: Gamepad2, label: "Trò chơi", comingSoon: true },
      { icon: Settings, label: "Cài đặt", comingSoon: true },
    ],
  },
];

export default function HomeSidebar() {
  return (
    <nav className="flex gap-1 overflow-x-auto px-5 py-3 sm:px-8 lg:fixed lg:top-14 lg:bottom-0 lg:left-0 lg:z-30 lg:w-[220px] lg:flex-col lg:gap-4 lg:overflow-y-auto lg:border-r lg:border-ink/10 lg:bg-cream lg:px-4 lg:py-6">
      {SIDEBAR_GROUPS.map((group) => (
        <div key={group.label} className="contents lg:flex lg:flex-col lg:gap-1">
          <p className="hidden px-3 text-[11px] font-bold uppercase tracking-wide text-ink/35 lg:block">
            {group.label}
          </p>
          {group.links.map((item) =>
            item.comingSoon ? (
              <div
                key={item.label}
                className="flex shrink-0 items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-ink/35 cursor-not-allowed"
                aria-disabled="true"
              >
                <item.icon className="size-4.5 shrink-0" />
                <span className="whitespace-nowrap">{item.label}</span>
                <Badge className="ml-auto hidden lg:inline-flex bg-sand-100 text-ink/40 text-[9px] font-bold px-1.5 py-0.5 whitespace-nowrap">
                  SẮP RA MẮT
                </Badge>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="flex shrink-0 items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-ink/70 hover:bg-surface hover:text-coral-600 transition-colors"
              >
                <item.icon className="size-4.5 shrink-0" />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            ),
          )}
        </div>
      ))}
    </nav>
  );
}

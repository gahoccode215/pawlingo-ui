import { BookOpen, Gamepad2, Heart, Settings, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface SidebarLink {
  icon: typeof BookOpen;
  label: string;
  href?: string;
  comingSoon?: boolean;
}

const SIDEBAR_LINKS: SidebarLink[] = [
  { icon: BookOpen, label: "Từ vựng", href: "/vocabularies" },
  { icon: Heart, label: "Từ vựng của tôi", href: "/me/vocabularies" },
  { icon: Trophy, label: "Bảng xếp hạng", comingSoon: true },
  { icon: Users, label: "Bạn bè", comingSoon: true },
  { icon: Gamepad2, label: "Trò chơi", comingSoon: true },
  { icon: Settings, label: "Cài đặt", comingSoon: true },
];

export default function HomeSidebar() {
  return (
    <nav className="lg:sticky lg:top-[4.5rem] flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
      {SIDEBAR_LINKS.map((item) =>
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
    </nav>
  );
}

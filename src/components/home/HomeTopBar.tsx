"use client";

import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth/AuthContext";

// /home has no site-wide Header (see SiteChrome.tsx) — this replaces just
// the two things that component provided here: a way back to the marketing
// site and a way to log out.
export default function HomeTopBar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  const initial = user?.email.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-surface/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-display font-bold text-lg text-foreground shrink-0"
        >
          <span className="text-2xl">🐾</span> PawLingo
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-full bg-coral-500 font-display font-bold text-sm text-white outline-none transition-colors hover:bg-coral-600 focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {initial}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>
              <User />
              Hồ sơ
              <Badge className="ml-auto bg-sand-100 text-ink/40 text-[9px] font-bold px-1.5 py-0.5">
                SẮP RA MẮT
              </Badge>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Settings />
              Cài đặt
              <Badge className="ml-auto bg-sand-100 text-ink/40 text-[9px] font-bold px-1.5 py-0.5">
                SẮP RA MẮT
              </Badge>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

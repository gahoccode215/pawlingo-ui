"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

// /home has no site-wide Header (see SiteChrome.tsx) — this replaces just
// the two things that component provided here: a way back to the marketing
// site and a way to log out.
export default function HomeTopBar() {
  const { logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-surface/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-display font-bold text-lg text-foreground shrink-0"
        >
          <span className="text-2xl">🐾</span> PawLingo
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm font-semibold text-ink/60 hover:text-ink transition-colors"
        >
          <LogOut className="size-4" />
          Đăng xuất
        </button>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/AuthContext";
import { cn } from "@/lib/utils";

const AUTH_LINK_ACTIVE = cn(
  buttonVariants({ variant: "pop" }),
  "h-auto text-sm px-4 sm:px-5 py-2.5 whitespace-nowrap",
);
const AUTH_LINK_INACTIVE =
  "hidden sm:inline-block text-sm font-semibold text-foreground/70 hover:text-foreground px-3 py-2 transition-colors";

const AUTH_LINK_ACTIVE_MOBILE = cn(
  buttonVariants({ variant: "pop" }),
  "h-auto w-full text-center text-sm px-4 py-2.5",
);
const AUTH_LINK_INACTIVE_MOBILE =
  "text-center px-4 py-2.5 rounded-full text-sm font-semibold text-foreground/70 hover:bg-surface transition-colors";

const NAV_LINKS = [
  { href: "#why", label: "Vì sao PawLingo" },
  { href: "#for-you", label: "Dành cho bạn" },
  { href: "/vocabularies", label: "Từ vựng" },
  { href: "/me/vocabularies", label: "Từ vựng của tôi" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  // Register is the prominent CTA everywhere except the login page itself,
  // where the two swap so whichever page you're on is the highlighted one.
  const isLoginActive = pathname === "/login";

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto bg-surface/90 backdrop-blur border border-ink/10 rounded-full shadow-sm h-14 grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6">
        {/* Logo (left) */}
        <a
          href={'/'}
          className="flex items-center gap-2 font-display font-bold text-lg text-foreground shrink-0"
        >
          <span className="text-2xl">🐾</span> PawLingo
        </a>

        {/* Main menu (center) */}
        <nav className="hidden lg:flex items-center justify-center gap-8 text-sm font-semibold text-foreground/70">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-coral-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Login / Register (right) */}
        <div className="flex items-center justify-end gap-1 sm:gap-3">
          {user ? (
            <>
              <Link
                href="/home"
                className="hidden sm:inline-block truncate max-w-[180px] text-sm font-semibold text-foreground/70 hover:text-foreground px-3 py-2 transition-colors"
              >
                {user.email}
              </Link>
              <button type="button" onClick={handleLogout} className={AUTH_LINK_ACTIVE}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={isLoginActive ? AUTH_LINK_ACTIVE : AUTH_LINK_INACTIVE}
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className={isLoginActive ? AUTH_LINK_INACTIVE : AUTH_LINK_ACTIVE}
              >
                Đăng ký miễn phí
              </Link>
            </>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="lg:hidden ml-1 rounded-full"
            aria-label="Mở/đóng menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden max-w-5xl mx-auto mt-2 bg-surface border border-ink/10 rounded-3xl shadow-sm px-5 sm:px-6 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="block px-2 py-2.5 rounded-lg text-sm font-semibold text-foreground/70 hover:bg-surface hover:text-coral-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2 mt-2 border-t border-border flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/home"
                  onClick={closeMenu}
                  className={`truncate ${AUTH_LINK_INACTIVE_MOBILE}`}
                >
                  {user.email}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  className={AUTH_LINK_ACTIVE_MOBILE}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className={isLoginActive ? AUTH_LINK_ACTIVE_MOBILE : AUTH_LINK_INACTIVE_MOBILE}
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className={isLoginActive ? AUTH_LINK_INACTIVE_MOBILE : AUTH_LINK_ACTIVE_MOBILE}
                >
                  Đăng ký miễn phí
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

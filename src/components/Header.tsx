"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeaderAuthActions from "./HeaderAuthActions";

const NAV_LINKS = [
  { href: "#why", label: "Vì sao PawLingo" },
  { href: "#for-you", label: "Dành cho bạn" },
  { href: "/vocabularies", label: "Từ vựng" },
  { href: "/me/vocabularies", label: "Từ vựng của tôi" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6">
      <div className="relative max-w-6xl mx-auto flex items-center justify-between gap-4 h-14">
        {/* Logo — its own standalone element, pinned left, no shared
            background with nav/auth. */}
        <a
          href={'/'}
          className="flex items-center gap-2 font-display font-bold text-lg text-foreground shrink-0"
        >
          <span className="text-2xl">🐾</span> PawLingo
        </a>

        {/* Main menu — its own floating pill, absolutely centered on the
            header independent of logo/auth width, so it never shifts when
            they resize. Previously the whole header (logo+nav+auth) shared
            one big pill background, which visually nested the auth "frame"
            below inside another frame — each area now has its own distinct
            background instead. */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-foreground/70 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface/90 backdrop-blur border border-ink/10 rounded-full shadow-sm px-6 py-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-coral-600 transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Login / Register — its own standalone element, pinned right, with
            its own coral-tinted pill frame (not nested inside a shared
            header background) so it reads as a clearly separate widget. */}
        <div className="flex items-center justify-end gap-2 sm:gap-4 shrink-0">
          <div className="flex items-center gap-1 sm:bg-coral-500/[0.07] sm:border sm:border-coral-500/20 sm:rounded-full sm:p-1 sm:hover:bg-coral-500/[0.12] transition-colors">
            <HeaderAuthActions />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="lg:hidden ml-1 rounded-full bg-surface/90 backdrop-blur border border-ink/10 shadow-sm"
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
            <HeaderAuthActions variant="mobile" onNavigate={closeMenu} />
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState } from "react";

const NAV_LINKS = [
  { href: "#why", label: "Why PawLingo" },
  { href: "#features", label: "Features" },
  { href: "#for-you", label: "For You" },
  { href: "#waitlist", label: "Waitlist" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/85 backdrop-blur border-b border-ink/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Logo (left) */}
        <a
          href="#top"
          className="flex items-center gap-2 font-display font-bold text-lg text-ink shrink-0"
        >
          <span className="text-2xl">🐾</span> PawLingo
        </a>

        {/* Main menu (center) */}
        <nav className="hidden lg:flex items-center justify-center gap-8 text-sm font-semibold text-ink/70">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-coral-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Login / Register (right) */}
        <div className="flex items-center justify-end gap-1 sm:gap-3">
          <a
            href="#waitlist"
            className="hidden sm:inline-block text-sm font-semibold text-ink/70 hover:text-ink px-3 py-2 transition-colors"
          >
            Log in
          </a>
          <a
            href="#waitlist"
            className="bg-coral-500 hover:bg-coral-600 text-white font-display font-semibold text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all whitespace-nowrap"
          >
            Sign Up Free
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="lg:hidden ml-1 w-9 h-9 flex items-center justify-center rounded-full hover:bg-ink/5 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-ink/5 bg-cream px-5 sm:px-8 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="block px-2 py-2.5 rounded-lg text-sm font-semibold text-ink/70 hover:bg-white hover:text-coral-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 mt-2 border-t border-ink/10 flex flex-col gap-2">
            <a
              href="#waitlist"
              onClick={closeMenu}
              className="text-center px-4 py-2.5 rounded-full text-sm font-semibold text-ink/70 hover:bg-white transition-colors"
            >
              Log in
            </a>
            <a
              href="#waitlist"
              onClick={closeMenu}
              className="text-center bg-coral-500 hover:bg-coral-600 text-white font-display font-semibold text-sm px-4 py-2.5 rounded-full shadow-pop transition-all"
            >
              Sign Up Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

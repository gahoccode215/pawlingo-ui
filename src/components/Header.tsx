"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [{ href: "#why", label: "Vì sao PawLingo" }];

const FEATURE_LINKS = [{ href: "/learn", label: "Học từ vựng" }];

const NAV_LINKS_AFTER_FEATURES = [
  { href: "#for-you", label: "Dành cho bạn" },
  { href: "#waitlist", label: "Danh sách chờ" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileFeaturesOpen(false);
  };

  useEffect(() => {
    if (!isFeaturesOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (!featuresRef.current?.contains(event.target as Node)) {
        setIsFeaturesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFeaturesOpen]);

  return (
    <header className="sticky top-0 z-50 bg-cream/85 backdrop-blur border-b border-ink/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Logo (left) */}
        <a
          href={'/'}
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

          <div ref={featuresRef} className="relative">
            <button
              type="button"
              onClick={() => setIsFeaturesOpen((open) => !open)}
              className="flex items-center gap-1 hover:text-coral-600 transition-colors"
              aria-haspopup="true"
              aria-expanded={isFeaturesOpen}
            >
              Tính năng
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-3.5 h-3.5 transition-transform ${isFeaturesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isFeaturesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white rounded-2xl shadow-card border border-ink/5 p-2">
                {FEATURE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsFeaturesOpen(false)}
                    className="block px-3 py-2 rounded-xl text-sm font-semibold text-ink/70 hover:bg-coral-50 hover:text-coral-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS_AFTER_FEATURES.map((link) => (
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
          <Link
            href="/login"
            className="hidden sm:inline-block text-sm font-semibold text-ink/70 hover:text-ink px-3 py-2 transition-colors"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="bg-coral-500 hover:bg-coral-600 text-white font-display font-semibold text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all whitespace-nowrap"
          >
            Đăng ký miễn phí
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="lg:hidden ml-1 w-9 h-9 flex items-center justify-center rounded-full hover:bg-ink/5 transition-colors"
            aria-label="Mở/đóng menu"
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

          <div>
            <button
              type="button"
              onClick={() => setIsMobileFeaturesOpen((open) => !open)}
              className="w-full flex items-center justify-between px-2 py-2.5 rounded-lg text-sm font-semibold text-ink/70 hover:bg-white hover:text-coral-600 transition-colors"
              aria-expanded={isMobileFeaturesOpen}
              aria-controls="mobile-features-menu"
            >
              Tính năng
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-3.5 h-3.5 transition-transform ${isMobileFeaturesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMobileFeaturesOpen && (
              <div id="mobile-features-menu" className="pl-4 space-y-1">
                {FEATURE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="block px-2 py-2.5 rounded-lg text-sm font-semibold text-ink/60 hover:bg-white hover:text-coral-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS_AFTER_FEATURES.map((link) => (
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
            <Link
              href="/login"
              onClick={closeMenu}
              className="text-center px-4 py-2.5 rounded-full text-sm font-semibold text-ink/70 hover:bg-white transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              onClick={closeMenu}
              className="text-center bg-coral-500 hover:bg-coral-600 text-white font-display font-semibold text-sm px-4 py-2.5 rounded-full shadow-pop transition-all"
            >
              Đăng ký miễn phí
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
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

interface HeaderAuthActionsProps {
  variant?: "desktop" | "mobile";
  /** Mobile menu closes itself after any navigation/logout click. */
  onNavigate?: () => void;
}

export default function HeaderAuthActions({
  variant = "desktop",
  onNavigate,
}: HeaderAuthActionsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  // Register is the prominent CTA everywhere except the login page itself,
  // where the two swap so whichever page you're on is the highlighted one.
  const isLoginActive = pathname === "/login";

  async function handleLogout() {
    onNavigate?.();
    await logout();
    router.push("/");
  }

  const isMobile = variant === "mobile";
  const activeClass = isMobile ? AUTH_LINK_ACTIVE_MOBILE : AUTH_LINK_ACTIVE;
  const inactiveClass = isMobile ? AUTH_LINK_INACTIVE_MOBILE : AUTH_LINK_INACTIVE;

  if (user) {
    return (
      <>
        <Link
          href="/home"
          onClick={onNavigate}
          className={
            isMobile
              ? `truncate ${inactiveClass}`
              : "hidden sm:inline-block truncate max-w-[180px] text-sm font-semibold text-foreground/70 hover:text-foreground px-3 py-2 transition-colors"
          }
        >
          {user.email}
        </Link>
        <button type="button" onClick={handleLogout} className={activeClass}>
          Đăng xuất
        </button>
      </>
    );
  }

  return (
    <>
      {/* `key` changes with isLoginActive so React remounts a fresh node
          instead of patching className in place — a freshly mounted element
          never plays a CSS transition (no "before" state to animate from),
          which is what previously caused a visible square-to-pill radius
          flash when swapping between the plain-text and pill-button styles. */}
      <Link
        key={isLoginActive ? "login-active" : "login-inactive"}
        href="/login"
        onClick={onNavigate}
        className={isLoginActive ? activeClass : inactiveClass}
      >
        Đăng nhập
      </Link>
      <Link
        key={isLoginActive ? "register-inactive" : "register-active"}
        href="/register"
        onClick={onNavigate}
        className={isLoginActive ? inactiveClass : activeClass}
      >
        Đăng ký miễn phí
      </Link>
    </>
  );
}

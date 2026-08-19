"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { applyTheme, getStoredTheme, type Theme } from "@/lib/theme";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Matches the server-rendered default ("light") so hydration never
  // mismatches; the blocking init script already set the real theme on
  // <html> before paint, and this effect just syncs React state to it.
  const [theme, setTheme] = useState<Theme>("light");

  // The blocking init script (see layout.tsx) already set the real theme on
  // <html> before this ever mounts. React's own first render must still
  // match the server-rendered "light" default to avoid a hydration
  // mismatch, so the correction is deferred a microtask rather than applied
  // synchronously in the effect body.
  useEffect(() => {
    Promise.resolve().then(() => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "dark" || current === "light" ? current : (getStoredTheme() ?? "light"));
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

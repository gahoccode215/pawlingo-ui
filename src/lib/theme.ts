export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "pawlingo:theme";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(raw) ? raw : null;
}

export function applyTheme(theme: Theme): void {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

// Runs as a blocking inline script (see layout.tsx) before hydration, so the
// correct theme is on <html> before first paint — no flash of the wrong
// theme. Default is "light" (no system-preference lookup), matching the
// server-rendered HTML. Keep this logic in sync with getStoredTheme() above.
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = window.localStorage.getItem("${THEME_STORAGE_KEY}");
    var theme = stored === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

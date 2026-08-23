"use client";

import { createContext, useCallback, useContext, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { ApiError } from "@/lib/api";
import type { AuthUser } from "@/types/auth";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogleIdToken: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// signIn() with redirect:false never rejects on a bad credential — it
// resolves with { error, code }. Re-throw as ApiError so callers can keep
// using their existing `error instanceof ApiError` + getAuthErrorMessage flow.
// The original backend HTTP status doesn't survive this round-trip (NextAuth
// only carries the string `code`), and nothing reads `.status` on this path.
async function signInOrThrow(provider: string, credentials: Record<string, string>) {
  const result = await signIn(provider, { ...credentials, redirect: false });
  if (result?.error) {
    throw new ApiError(result.code ?? "INTERNAL_ERROR", result.error, 0);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  // Silent refresh failed (refresh token expired/revoked/reused) — force a
  // clean sign-out instead of letting the app run with a stale session.
  useEffect(() => {
    if (session?.error === "RefreshTokenError") {
      signOut({ redirect: false }).then(() => router.push("/login"));
    }
  }, [session?.error, router]);

  const register = useCallback(async (email: string, password: string) => {
    await signInOrThrow("backend-register", { email, password });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await signInOrThrow("backend-login", { email, password });
  }, []);

  const loginWithGoogleIdToken = useCallback(async (idToken: string) => {
    await signInOrThrow("backend-google", { idToken });
  }, []);

  const logout = useCallback(async () => {
    await signOut({ redirect: false });
  }, []);

  const hasRefreshError = session?.error === "RefreshTokenError";

  return (
    <AuthContext.Provider
      value={{
        user: hasRefreshError ? null : (session?.user ?? null),
        status: hasRefreshError ? "unauthenticated" : sessionStatus,
        register,
        login,
        loginWithGoogleIdToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

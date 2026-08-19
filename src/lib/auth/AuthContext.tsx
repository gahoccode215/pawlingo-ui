"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { UNAUTHORIZED_EVENT } from "@/lib/api";
import { getCurrentUser, loginUser, loginWithGoogle, registerUser } from "@/lib/auth/api";
import { clearToken, getToken, setToken } from "@/lib/auth/token";
import type { AuthUser } from "@/types/auth";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogleIdToken: (idToken: string) => Promise<{ isNewUser: boolean }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>(() =>
    getToken() ? "loading" : "unauthenticated",
  );
  const router = useRouter();

  // Hydrate from a stored token on app start (login's own response has no
  // profile fields, so /auth/me is the source of truth here).
  useEffect(() => {
    const token = getToken();
    if (!token) return;
    getCurrentUser()
      .then((profile) => {
        setUser(profile);
        setStatus("authenticated");
      })
      .catch(() => {
        clearToken();
        setUser(null);
        setStatus("unauthenticated");
      });
  }, []);

  useEffect(() => {
    function handleUnauthorized() {
      setUser(null);
      setStatus("unauthenticated");
      router.push("/login");
    }
    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
  }, [router]);

  const register = useCallback(async (email: string, password: string) => {
    const response = await registerUser({ email, password });
    setToken(response.accessToken);
    setUser({ id: response.id, email: response.email, goal: response.goal });
    setStatus("authenticated");
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginUser({ email, password });
    setToken(response.accessToken);
    const profile = await getCurrentUser();
    setUser(profile);
    setStatus("authenticated");
  }, []);

  const loginWithGoogleIdToken = useCallback(async (idToken: string) => {
    const response = await loginWithGoogle({ idToken });
    setToken(response.accessToken);
    setUser({ id: response.id, email: response.email, goal: response.goal });
    setStatus("authenticated");
    return { isNewUser: response.isNewUser };
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, status, register, login, loginWithGoogleIdToken, logout }}
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

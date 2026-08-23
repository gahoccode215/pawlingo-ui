import { apiRequest } from "@/lib/api";
import type {
  AuthUser,
  GoogleLoginRequest,
  GoogleLoginResponse,
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

export function registerUser(input: RegisterRequest): Promise<RegisterResponse> {
  return apiRequest<RegisterResponse>("/auth/register", { method: "POST", body: input });
}

export function loginUser(input: LoginRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/auth/login", { method: "POST", body: input });
}

export function loginWithGoogle(input: GoogleLoginRequest): Promise<GoogleLoginResponse> {
  return apiRequest<GoogleLoginResponse>("/auth/google", { method: "POST", body: input });
}

export function getCurrentUser(accessToken: string): Promise<AuthUser> {
  return apiRequest<AuthUser>("/auth/me", { token: accessToken });
}

export function refreshTokens(refreshToken: string): Promise<RefreshResponse> {
  return apiRequest<RefreshResponse>("/auth/refresh", {
    method: "POST",
    body: { refreshToken },
  });
}

// Public endpoint — safe to call even if the access token has already
// expired; unknown/already-revoked refresh tokens silently no-op server-side.
export function logoutUser(refreshToken: string): Promise<null> {
  return apiRequest<null>("/auth/logout", { method: "POST", body: { refreshToken } });
}

import { apiRequest } from "@/lib/api";
import type {
  AuthUser,
  GoogleLoginRequest,
  GoogleLoginResponse,
  LoginRequest,
  LoginResponse,
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

export function getCurrentUser(): Promise<AuthUser> {
  return apiRequest<AuthUser>("/auth/me", { auth: true });
}

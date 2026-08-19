export type Goal = "beginner" | "test-prep" | "professional" | "for-child";

export interface AuthUser {
  id: string;
  email: string;
  goal: Goal;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse extends AuthUser {
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
}

export interface GoogleLoginRequest {
  idToken: string;
}

export interface GoogleLoginResponse extends AuthUser {
  accessToken: string;
  expiresIn: number;
  isNewUser: boolean;
}

export type ApiErrorCode =
  | "DUPLICATE_EMAIL"
  | "INVALID_CREDENTIALS"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "INTERNAL_ERROR"
  | "GOOGLE_TOKEN_INVALID"
  | "GOOGLE_EMAIL_NOT_VERIFIED"
  | "ACCOUNT_EXISTS_WITH_PASSWORD"
  | "NETWORK_ERROR";

export interface ApiErrorBody {
  code: ApiErrorCode | (string & {});
  message: string;
}

export interface ApiEnvelope<T> {
  success: boolean;
  data: T | null;
  error: ApiErrorBody | null;
}

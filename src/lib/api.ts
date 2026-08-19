import { clearToken, getToken } from "@/lib/auth/token";
import type { ApiEnvelope, ApiErrorCode } from "@/types/auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";
const API_BASE_URL = `${BACKEND_URL}/api/v1`;

// AuthContext listens for this to clear user state and redirect to /login.
export const UNAUTHORIZED_EVENT = "pawlingo:unauthorized";

export class ApiError extends Error {
  code: ApiErrorCode | (string & {});
  status: number;

  constructor(code: ApiErrorCode | (string & {}), message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = false } = options;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("NETWORK_ERROR", "Network request failed", 0);
  }

  let envelope: ApiEnvelope<T> | null = null;
  try {
    envelope = (await response.json()) as ApiEnvelope<T>;
  } catch {
    // No/non-JSON body (e.g. 204, proxy error page) — fall through to the
    // !envelope?.success check below, which treats it as a failure.
  }

  if (!response.ok || !envelope?.success) {
    const code = envelope?.error?.code ?? "INTERNAL_ERROR";
    const message = envelope?.error?.message ?? response.statusText;

    // Only a 401 on a request we sent a token with means the session itself
    // is invalid — a 401 from a public endpoint (e.g. wrong login password)
    // is a normal validation error, not a session expiry.
    if (response.status === 401 && auth && typeof window !== "undefined") {
      clearToken();
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }

    throw new ApiError(code, message, response.status);
  }

  return envelope.data as T;
}

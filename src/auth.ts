
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

import { loginSchema } from "@/schemas/auth.schema";

type TokenData = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
};

type ApiResponse<T> = {
    success: boolean;
    data: T | null;
    error: {
        code: string;
        message: string;
    } | null;
    meta: unknown | null;
};

const API_URL = process.env.BACKEND_API_URL;
const REFRESH_PATH = "/api/v1/auth/refresh";
const REFRESH_BUFFER_MS = 3_000;

// Lưu kết quả refresh ngắn hạn để những request
// dùng cùng token cũ nhận cùng một kết quả.
const REFRESH_CACHE_MS = 60_000;

type RefreshResult = {
    promise: Promise<JWT>;
    createdAt: number;
};

const refreshCache = new Map<string, RefreshResult>();

function failedRefresh(token: JWT): JWT {
    return {
        ...token,
        accessToken: undefined,
        refreshToken: undefined,
        accessTokenExpiresAt: undefined,
        error: "RefreshTokenError",
    };
}

async function performRefresh(token: JWT): Promise<JWT> {
    if (!API_URL || !token.refreshToken) {
        return failedRefresh(token);
    }

    try {
        console.log("[AUTH] Refresh started");

        const response = await fetch(
            `${API_URL}${REFRESH_PATH}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refreshToken: token.refreshToken,
                }),
                cache: "no-store",
            }
        );

        if (!response.ok) {
            console.error(
                "[AUTH] Refresh HTTP status:",
                response.status
            );
            return failedRefresh(token);
        }

        const result: ApiResponse<TokenData> =
            await response.json();

        if (
            !result.success ||
            !result.data?.accessToken ||
            !result.data?.refreshToken ||
            !Number.isFinite(result.data.expiresIn) ||
            result.data.expiresIn <= 0
        ) {
            console.error(
                "[AUTH] Invalid refresh response:",
                result.error?.code
            );
            return failedRefresh(token);
        }

        console.log("[AUTH] Refresh successful");

        return {
            ...token,
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
            accessTokenExpiresAt:
                Date.now() + result.data.expiresIn * 1000,
            error: undefined,
        };
    } catch (error) {
        console.error("[AUTH] Refresh failed:", error);
        return failedRefresh(token);
    }
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
    if (!token.refreshToken) {
        return failedRefresh(token);
    }

    const key = token.refreshToken;
    const now = Date.now();

    // Dọn các kết quả quá cũ.
    for (const [cacheKey, entry] of refreshCache) {
        if (now - entry.createdAt > REFRESH_CACHE_MS) {
            refreshCache.delete(cacheKey);
        }
    }

    const cached = refreshCache.get(key);

    if (cached) {
        console.log("[AUTH] Reusing refresh result");
        return cached.promise;
    }

    const promise = performRefresh(token);

    refreshCache.set(key, {
        promise,
        createdAt: now,
    });

    return promise;
}

export const { handlers, auth, signIn, signOut } =
    NextAuth({
        session: {
            strategy: "jwt",
            maxAge: 30 * 24 * 60 * 60,
        },

        pages: {
            signIn: "/login",
        },

        providers: [
            Credentials({
                credentials: {
                    email: {
                        label: "Email",
                        type: "email",
                    },
                    password: {
                        label: "Password",
                        type: "password",
                    },
                },

                async authorize(credentials) {
                    const parsed =
                        loginSchema.safeParse(credentials);

                    if (!parsed.success || !API_URL) {
                        return null;
                    }

                    try {
                        const response = await fetch(
                            `${API_URL}/api/v1/auth/login`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(parsed.data),
                                cache: "no-store",
                            }
                        );

                        if (!response.ok) {
                            console.error(
                                "[AUTH] Login HTTP status:",
                                response.status
                            );
                            return null;
                        }

                        const result: ApiResponse<TokenData> =
                            await response.json();

                        if (
                            !result.success ||
                            !result.data?.accessToken ||
                            !result.data?.refreshToken ||
                            !Number.isFinite(result.data.expiresIn) ||
                            result.data.expiresIn <= 0
                        ) {
                            return null;
                        }

                        return {
                            id: "temporary-auth-user",
                            accessToken: result.data.accessToken,
                            refreshToken: result.data.refreshToken,
                            expiresIn: result.data.expiresIn,
                        };
                    } catch (error) {
                        console.error("[AUTH] Login failed:", error);
                        return null;
                    }
                },
            }),
        ],

        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    return {
                        ...token,
                        accessToken: user.accessToken,
                        refreshToken: user.refreshToken,
                        accessTokenExpiresAt:
                            Date.now() + user.expiresIn * 1000,
                        error: undefined,
                    };
                }

                if (token.error === "RefreshTokenError") {
                    return token;
                }

                if (
                    token.accessToken &&
                    token.accessTokenExpiresAt &&
                    Date.now() <
                    token.accessTokenExpiresAt -
                    REFRESH_BUFFER_MS
                ) {
                    return token;
                }

                return refreshAccessToken(token);
            },

            async session({ session, token }) {
                session.accessToken = token.accessToken;
                session.error = token.error;

                return session;
            },
        },
    });

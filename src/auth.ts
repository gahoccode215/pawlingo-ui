import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const REFRESH_SKEW_MS = 30_000;
const REFRESH_RESULT_TTL_MS = 10_000;
const MAX_REFRESH_RESULTS = 100;

type RefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
};

type CachedRefreshResult = {
    value: RefreshTokenResponse;
    expiresAt: number;
};

// A rotating refresh token may only be used once. Deduplicate requests that
// reach the server at nearly the same time (prefetches, parallel RSC requests,
// or multiple tabs) so they all reuse the same rotated token pair.
const refreshRequests = new Map<string, Promise<RefreshTokenResponse>>();
const refreshResults = new Map<string, CachedRefreshResult>();

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            authorize: async (credentials) => {
                if (
                    typeof credentials.email !== "string" ||
                    typeof credentials.password !== "string"
                ) {
                    return null;
                }

                const response = await fetch(
                    `${process.env.BACKEND_URL}/api/v1/auth/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    return null;
                }

                const result = await response.json();

                if (!result.success || !result.data) {
                    return null;
                }

                return {
                    id: credentials.email,
                    email: credentials.email,

                    accessToken: result.data.accessToken,
                    refreshToken: result.data.refreshToken,
                    expiresIn: result.data.expiresIn,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.accessTokenExpiresAt =
                    Date.now() + user.expiresIn * 1000;
                return token;
            }

            if (
                !token.accessToken ||
                !token.refreshToken ||
                typeof token.accessTokenExpiresAt !== "number"
            ) {
                return null;
            }

            if (Date.now() < token.accessTokenExpiresAt - REFRESH_SKEW_MS) {
                return token;
            }

            try {
                const refreshed = await refreshAccessTokenOnce(
                    token.refreshToken
                );

                return {
                    ...token,
                    accessToken: refreshed.accessToken,
                    refreshToken: refreshed.refreshToken,
                    accessTokenExpiresAt:
                        Date.now() + refreshed.expiresIn * 1000,
                };
            } catch {
                // Returning null makes Auth.js clear the broken JWT cookie.
                // The route proxy then redirects protected requests to login.
                return null;
            }
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
});

async function refreshAccessTokenOnce(
    refreshToken: string
): Promise<RefreshTokenResponse> {
    const now = Date.now();
    const cached = refreshResults.get(refreshToken);

    if (cached && cached.expiresAt > now) {
        return cached.value;
    }

    if (cached) {
        refreshResults.delete(refreshToken);
    }

    const existingRequest = refreshRequests.get(refreshToken);

    if (existingRequest) {
        return existingRequest;
    }

    const request = refreshAccessToken(refreshToken)
        .then((value) => {
            if (refreshResults.size >= MAX_REFRESH_RESULTS) {
                const oldestKey = refreshResults.keys().next().value;

                if (oldestKey) {
                    refreshResults.delete(oldestKey);
                }
            }

            refreshResults.set(refreshToken, {
                value,
                expiresAt: Date.now() + REFRESH_RESULT_TTL_MS,
            });

            return value;
        })
        .finally(() => {
            refreshRequests.delete(refreshToken);
        });

    refreshRequests.set(refreshToken, request);
    return request;
}

async function refreshAccessToken(
    refreshToken: string
): Promise<RefreshTokenResponse> {
    const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/auth/refresh`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken,
            }),
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to refresh access token");
    }

    const result = await response.json();

    if (!result.success || !result.data) {
        throw new Error("Invalid refresh response");
    }

    return result.data;
}

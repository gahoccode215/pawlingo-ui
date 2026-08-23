import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ApiError } from "@/lib/api";
import { getCurrentUser, loginUser, loginWithGoogle, logoutUser, refreshTokens, registerUser } from "@/lib/auth/api";

// Refresh a little before actual expiry so an in-flight request never races
// the access token expiring mid-call.
const REFRESH_SKEW_MS = 30_000;

class BackendAuthError extends CredentialsSignin {
  code: string;

  constructor(code: string) {
    super();
    this.code = code;
  }
}

function backendErrorCode(error: unknown): string {
  return error instanceof ApiError ? error.code : "INTERNAL_ERROR";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      id: "backend-login",
      name: "Email/Password Login",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        try {
          const tokens = await loginUser({
            email: credentials.email as string,
            password: credentials.password as string,
          });
          const profile = await getCurrentUser(tokens.accessToken);
          return {
            id: profile.id,
            email: profile.email,
            goal: profile.goal,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            expiresIn: tokens.expiresIn,
          };
        } catch (error) {
          throw new BackendAuthError(backendErrorCode(error));
        }
      },
    }),
    Credentials({
      id: "backend-register",
      name: "Register",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        try {
          const result = await registerUser({
            email: credentials.email as string,
            password: credentials.password as string,
          });
          return {
            id: result.id,
            email: result.email,
            goal: result.goal,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            expiresIn: result.expiresIn,
          };
        } catch (error) {
          throw new BackendAuthError(backendErrorCode(error));
        }
      },
    }),
    Credentials({
      id: "backend-google",
      name: "Google",
      credentials: { idToken: {} },
      async authorize(credentials) {
        try {
          const result = await loginWithGoogle({ idToken: credentials.idToken as string });
          return {
            id: result.id,
            email: result.email,
            goal: result.goal,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            expiresIn: result.expiresIn,
          };
        } catch (error) {
          throw new BackendAuthError(backendErrorCode(error));
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = Date.now() + user.expiresIn * 1000;
        token.user = { id: user.id!, email: user.email!, goal: user.goal };
        delete token.error;
        return token;
      }

      if (!token.refreshToken || Date.now() < token.expiresAt - REFRESH_SKEW_MS) {
        return token;
      }

      try {
        const refreshed = await refreshTokens(token.refreshToken);
        token.accessToken = refreshed.accessToken;
        token.refreshToken = refreshed.refreshToken;
        token.expiresAt = Date.now() + refreshed.expiresIn * 1000;
        delete token.error;
      } catch {
        // Generic INVALID_REFRESH_TOKEN (expired/revoked/reused) — the
        // client-side AuthProvider watches for this and forces a sign-out.
        token.error = "RefreshTokenError";
      }

      return token;
    },
    async session({ session, token }) {
      // @auth/core's session callback types `session.user` as an intersection
      // that also includes AdapterUser (for database-strategy adapters) even
      // though we're JWT-only with no adapter configured — the assertion is
      // safe since our own augmented shape is all this app ever reads.
      session.user = token.user as typeof session.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  events: {
    async signOut(message) {
      const refreshToken = "token" in message ? message.token?.refreshToken : undefined;
      if (!refreshToken) return;
      try {
        await logoutUser(refreshToken);
      } catch {
        // Best-effort server-side revoke; local session is already clearing.
      }
    },
  },
});

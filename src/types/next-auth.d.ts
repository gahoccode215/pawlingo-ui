// `next-auth` and `next-auth/jwt` only *type-re-export* Session/User/JWT from
// `@auth/core` — augmenting those re-export modules doesn't merge into the
// original interfaces the callbacks actually use, so we augment the
// `@auth/core` modules directly (confirmed via tsc, not assumed).
import type { DefaultSession } from "next-auth";
import type { Goal } from "@/types/auth";

declare module "@auth/core/types" {
  interface User {
    goal: Goal;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      goal: Goal;
    } & DefaultSession["user"];
    accessToken: string;
    error?: "RefreshTokenError";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    user: {
      id: string;
      email: string;
      goal: Goal;
    };
    error?: "RefreshTokenError";
  }
}

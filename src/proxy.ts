import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/next-auth";

// Server-side gate for authenticated-only routes — HomeDashboard already
// redirects unauthenticated visitors client-side via useEffect, but that
// still ships/renders the page shell first. This catches it at the edge
// before any page code runs.
export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/home/:path*"],
};

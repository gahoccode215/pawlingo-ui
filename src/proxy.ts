import { NextResponse } from "next/server";

import { auth } from "@/auth";

const ACCESS_TOKEN_HEADER = "x-pawlingo-access-token";
const protectedRoutes = ["/my-profile"];

function isProtectedRoute(pathname: string) {
    return protectedRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );
}

export default auth((request) => {
    const requestHeaders = new Headers(request.headers);
    const accessToken = request.auth?.accessToken;

    // Never trust a value supplied by the browser for this internal header.
    requestHeaders.delete(ACCESS_TOKEN_HEADER);

    if (!accessToken && isProtectedRoute(request.nextUrl.pathname)) {
        const loginUrl = new URL("/login", request.nextUrl.origin);
        const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
        const hadSessionCookie = request.cookies
            .getAll()
            .some(({ name }) => name.includes("authjs.session-token"));

        loginUrl.searchParams.set("callbackUrl", callbackUrl);

        if (hadSessionCookie) {
            loginUrl.searchParams.set("reason", "session_expired");
        }

        return NextResponse.redirect(loginUrl);
    }

    if (accessToken) {
        requestHeaders.set(ACCESS_TOKEN_HEADER, accessToken);
    }

    return NextResponse.next({
        request: { headers: requestHeaders },
    });
});

export const config = {
    matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

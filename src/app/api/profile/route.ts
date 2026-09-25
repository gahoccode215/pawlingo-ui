import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if (
        !session?.accessToken ||
        session.error === "RefreshTokenError"
    ) {
        return NextResponse.json(
            {
                success: false,
                error: "SESSION_EXPIRED",
            },
            { status: 401 }
        );
    }

    const apiUrl = process.env.BACKEND_API_URL;

    if (!apiUrl) {
        return NextResponse.json(
            {
                success: false,
                error: "SERVER_CONFIG_ERROR",
            },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `${apiUrl}/api/v1/auth/me`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        response.status === 401
                            ? "UNAUTHORIZED"
                            : "BACKEND_ERROR",
                },
                {
                    status: response.status,
                }
            );
        }

        const result = await response.json();

        return NextResponse.json(result, {
            headers: {
                "Cache-Control": "no-store",
            },
        });
    } catch (error) {
        console.error("[PROFILE] Backend request failed");

        return NextResponse.json(
            {
                success: false,
                error: "BACKEND_UNAVAILABLE",
            },
            { status: 502 }
        );
    }
}
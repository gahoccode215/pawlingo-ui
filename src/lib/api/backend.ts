import "server-only";

import { headers as requestHeaders } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;
const ACCESS_TOKEN_HEADER = "x-pawlingo-access-token";

if (!BACKEND_URL) {
    throw new Error("BACKEND_URL is not configured");
}

export async function backendFetch(
    path: string,
    options: RequestInit = {}
) {
    const incomingHeaders = await requestHeaders();
    const accessToken = incomingHeaders.get(ACCESS_TOKEN_HEADER);
    const headers = new Headers(options.headers);

    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return fetch(`${BACKEND_URL}${path}`, {
        ...options,
        headers,
    });
}

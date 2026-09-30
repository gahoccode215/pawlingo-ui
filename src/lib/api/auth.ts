// src/lib/api/auth.ts

import "server-only";

import { sendRequest } from "@/lib/api/client";

import type {
    RegisterFormValues,
    LoginFormValues,
} from "@/schemas/auth.schema";

export async function registerApi(
    data: RegisterFormValues
): Promise<IApiResponse<null>> {
    return sendRequest<null, RegisterFormValues>({
        url: `${process.env.BACKEND_API_URL}/api/v1/auth/register`,
        method: "POST",
        body: data,
        cache: "no-store",
    });
}

export async function loginApi(
    credentials: LoginFormValues
): Promise<IApiResponse<ILoginResponse>> {
    return sendRequest<ILoginResponse, LoginFormValues>({
        url: `${process.env.BACKEND_API_URL}/api/v1/auth/login`,
        method: "POST",
        body: credentials,
        cache: "no-store",
    });
}
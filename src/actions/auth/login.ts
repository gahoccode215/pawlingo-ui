//actions/auth/login.ts

"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import {
    loginSchema,
    type LoginFormValues,
} from "@/schemas/auth.schema";

type LoginActionResult =
    | { success: true }
    | { success: false; error: string };

export async function loginAction(
    values: LoginFormValues
): Promise<LoginActionResult> {
    const parsed = loginSchema.safeParse(values);

    if (!parsed.success) {
        return {
            success: false,
            error: "Thông tin đăng nhập không hợp lệ",
        };
    }

    try {
        await signIn("credentials", {
            email: parsed.data.email,
            password: parsed.data.password,
            redirect: false,
        });

        return { success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === "CredentialsSignin") {
                return {
                    success: false,
                    error: "Email hoặc mật khẩu không chính xác",
                };
            }

            return {
                success: false,
                error: "Đăng nhập thất bại. Vui lòng thử lại.",
            };
        }

        throw error;
    }
}
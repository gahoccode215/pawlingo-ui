"use server";

import { registerSchema } from "@/schemas/auth.schema";
import { registerApi } from "@/lib/api/auth";
import type { RegisterFormValues } from "@/schemas/auth.schema";

type RegisterActionResult =
    | { success: true }
    | { success: false; error: string };

export async function registerAction(
    values: RegisterFormValues
): Promise<RegisterActionResult> {

    // 1. Validate dữ liệu phía server
    const parsed = registerSchema.safeParse(values);

    if (!parsed.success) {
        return {
            success: false,
            error: "Dữ liệu đăng ký không hợp lệ",
        };
    }

    try {
        // 2. Gọi Spring Boot thông qua registerApi
        const response = await registerApi(parsed.data);

        // 3. Xử lý lỗi từ backend
        if (!response.success) {
            if (response.error?.code === "DUPLICATE_EMAIL") {
                return {
                    success: false,
                    error: "Email này đã được đăng ký",
                };
            }

            return {
                success: false,
                error:
                    response.error?.message ??
                    "Đăng ký thất bại",
            };
        }

        // 4. Đăng ký thành công
        return {
            success: true,
        };

    } catch (error) {
        console.error("Register failed:", error);

        return {
            success: false,
            error: "Không thể kết nối đến máy chủ",
        };
    }
}
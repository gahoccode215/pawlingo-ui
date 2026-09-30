import { z } from "zod";

export const registerSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(1, "Vui lòng nhập họ và tên")
        .max(100, "Họ và tên không được quá 100 ký tự"),
    email: z
        .string()
        .min(1, "Vui lòng nhập email")
        .email("Email không hợp lệ"),

    password: z
        .string()
        .min(1, "Vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Vui lòng nhập email")
        .email("Email không hợp lệ"),

    password: z
        .string()
        .min(1, "Vui lòng nhập mật khẩu"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

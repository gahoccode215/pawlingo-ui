"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    loginSchema,
    type LoginFormValues,
} from "@/schemas/auth.schema";

import { loginAction } from "@/actions/auth/login";
import { LoginFormUI } from "@/components/auth/LoginFormUI";

export default function LoginForm() {
    const router = useRouter();

    const [serverError, setServerError] = useState("");
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: LoginFormValues) {
        setServerError("");

        startTransition(async () => {
            try {
                const result = await loginAction(values);

                if (!result.success) {
                    setServerError(result.error);
                    return;
                }

                router.replace("/dashboard");
                router.refresh();
            } catch {
                setServerError(
                    "Không thể đăng nhập. Vui lòng thử lại."
                );
            }
        });
    }

    const isLoading = isPending || isSubmitting;

    return (
        <LoginFormUI
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            serverError={serverError}
            isLoading={isLoading}
        />
    );
}
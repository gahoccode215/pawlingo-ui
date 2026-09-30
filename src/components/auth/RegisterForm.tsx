"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    registerSchema,
    type RegisterFormValues,
} from "@/schemas/auth.schema";

import { registerAction } from "@/actions/auth/register";
import { RegisterFormUI } from "./RegisterFormUI";

export function RegisterForm() {
    const router = useRouter();

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit",
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<RegisterFormValues> =
        async (values) => {
            setServerError("");

            try {
                const result = await registerAction(values);

                if (!result.success) {
                    setServerError(result.error);
                    return;
                }

                router.replace("/login?registered=true");
            } catch {
                setServerError(
                    "Đã xảy ra lỗi. Vui lòng thử lại."
                );
            }
        };

    return (
        <RegisterFormUI
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            serverError={serverError}
        />
    );
}
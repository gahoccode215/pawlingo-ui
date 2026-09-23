"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormValues,
} from "@/schemas/auth.schema";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-[420px]">
      <div>
        <h1 className="text-[38px] font-semibold leading-tight tracking-[-0.045em]">Tạo tài khoản</h1>
        <p className="mt-2 text-[15px] leading-6 text-muted">
          Bắt đầu xây dựng lộ trình học từ vựng của bạn.
        </p>
      </div>

      <form className="mt-8" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder="ban@example.com"
              {...register("email")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="register-password">Mật khẩu</Label>
            <Input
              id="register-password"
              type="password"
              autoComplete="new-password"
              placeholder="Tạo mật khẩu"
              {...register("password")}
            />
            <p className="text-[13px] leading-5 text-muted">Sử dụng ít nhất 8 ký tự.</p>
          </div>
        </div>

        <Button type="submit" className="mt-7 w-full">
          Đăng ký
        </Button>

        {errors.email && (
          <p className="text-[13px] text-red-500">
            {errors.email.message}
          </p>
        )}

        {errors.password ? (
          <p className="text-[13px] text-red-500">
            {errors.password.message}
          </p>
        ) : (
          <p className="text-[13px] leading-5 text-muted">
            Sử dụng ít nhất 8 ký tự.
          </p>
        )}

        <p className="mt-7 text-center text-[14px] text-muted">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="font-medium text-cobalt hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
          >
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
}

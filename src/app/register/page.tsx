import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Đăng ký | PawLingo",
  description: "Tạo tài khoản PawLingo để bắt đầu lộ trình học từ vựng.",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-auth-backdrop px-5 py-12 sm:px-8">
      <RegisterForm />
    </main>
  );
}

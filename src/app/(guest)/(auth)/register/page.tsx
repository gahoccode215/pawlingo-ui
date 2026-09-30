import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create an account | PawLingo",
  description: "Create a PawLingo account and begin your English practice.",
};

export default function RegisterPage() {
  return (
    <AuthPageShell mode="register">
      <RegisterForm />
    </AuthPageShell>
  );
}
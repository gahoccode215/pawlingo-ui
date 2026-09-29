import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { LoginFormUI } from "@/components/auth/LoginFormUI";

export const metadata: Metadata = {
  title: "Sign in | PawLingo",
  description: "Sign in to continue learning English with PawLingo.",
};

export default function LoginPage() {
  return (
    <AuthPageShell mode="login">
      <LoginFormUI />
    </AuthPageShell>
  );
}

import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập | PawLingo",
  description: "Đăng nhập để tiếp tục lộ trình học tiếng Anh trên PawLingo.",
};

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string | string[];
    reason?: string | string[];
  }>;
};

function safeCallbackUrl(value: string | string[] | undefined) {
  const callbackUrl = Array.isArray(value) ? value[0] : value;

  if (
    callbackUrl &&
    callbackUrl.startsWith("/") &&
    !callbackUrl.startsWith("//") &&
    !callbackUrl.startsWith("/login")
  ) {
    return callbackUrl;
  }

  return "/my-profile";
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <AuthShell>
      <LoginForm
        callbackUrl={safeCallbackUrl(params.callbackUrl)}
        sessionExpired={params.reason === "session_expired"}
      />
    </AuthShell>
  );
}

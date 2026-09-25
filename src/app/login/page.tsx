import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập | PawLingo",
  description:
    "Đăng nhập để tiếp tục lộ trình học tiếng Anh trên PawLingo.",
};

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string | string[];
    reason?: string | string[];
  }>;
};

function safeCallbackUrl(
  value: string | string[] | undefined
): string {
  const fallback = "/my-profile";

  if (typeof value !== "string") {
    return fallback;
  }

  // Chỉ chấp nhận đường dẫn nội bộ
  if (
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001F\u007F]/.test(value)
  ) {
    return fallback;
  }

  try {
    const url = new URL(value, "http://localhost");

    if (url.origin !== "http://localhost") {
      return fallback;
    }

    // Tránh chuyển hướng quay lại trang login
    if (
      url.pathname === "/login" ||
      url.pathname.startsWith("/login/")
    ) {
      return fallback;
    }

    return url.pathname + url.search + url.hash;
  } catch {
    return fallback;
  }
}

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;

  const callbackUrl = safeCallbackUrl(
    params.callbackUrl
  );

  const sessionExpired =
    params.reason === "session_expired";

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-auth-backdrop px-5 py-12 sm:px-8">
      <LoginForm
        callbackUrl={callbackUrl}
        sessionExpired={sessionExpired}
      />
    </main>
  );
}
import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import SiteChrome from "@/components/SiteChrome";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { auth } from "@/lib/auth/next-auth";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PawLingo — Học tiếng Anh, nuôi lớn thú cưng",
  description:
    "PawLingo là ứng dụng học tiếng Anh nơi thú cưng của bạn lớn lên nhờ tiến bộ Nghe, Nói, Đọc, Viết thực sự — không phải nhờ mua coin.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Resolved server-side (reads the session cookie) so SessionProvider never
  // starts at "loading" — without this, Header briefly renders the logged-out
  // Đăng nhập/Đăng ký buttons on every page load before flipping to the real
  // user info once the client-side session fetch resolves. This opts every
  // route out of static prerendering (all become server-rendered per
  // request) — an accepted tradeoff to kill the auth-state flash sitewide.
  const session = await auth();

  return (
    <html lang="vi" className={`${baloo.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <SessionProvider session={session}>
          <AuthProvider>
            <SiteChrome>{children}</SiteChrome>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

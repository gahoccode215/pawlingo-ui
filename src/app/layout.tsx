import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${baloo.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

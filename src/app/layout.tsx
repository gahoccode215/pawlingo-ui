import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const geist = Geist({
  subsets: ["latin", "vietnamese"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PawLingo | Học từ vựng có lộ trình",
  description:
    "PawLingo giúp người Việt học từ vựng theo lộ trình, luyện gợi nhớ và ôn lại đúng lúc.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi" className={geist.variable}>
      <body className="bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}

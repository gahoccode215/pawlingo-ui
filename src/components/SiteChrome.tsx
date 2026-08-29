"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// Routes that get their own dedicated layout (e.g. /home's sidebar
// dashboard) instead of the marketing site's floating Header/Footer.
const CHROMELESS_PREFIXES = ["/home"];

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isChromeless = CHROMELESS_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (isChromeless) return <>{children}</>;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

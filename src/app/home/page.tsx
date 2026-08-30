import type { Metadata } from "next";
import HomeDashboard from "@/components/home/HomeDashboard";

export const metadata: Metadata = {
  title: "Trang chủ — PawLingo",
  description: "Tổng quan học tập và tiến độ của bạn.",
};

export default function HomePage() {
  return <HomeDashboard />;
}

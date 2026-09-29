import type { Metadata } from "next";

import UserDashboard from "@/components/dashboard/UserDashboard";

export const metadata: Metadata = {
  title: "Không gian học | PawLingo",
  description: "Tiếp tục lộ trình học tiếng Anh mỗi ngày cùng PawLingo.",
};

export default function DashboardPage() {
  return <UserDashboard />;
}

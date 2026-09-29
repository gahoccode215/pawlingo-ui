import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | PawLingo",
  description: "Không gian quản trị hoạt động học tập của PawLingo.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}

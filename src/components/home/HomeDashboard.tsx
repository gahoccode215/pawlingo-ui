"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth/AuthContext";

export default function HomeDashboard() {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-5">
        <p className="text-sm text-ink/50">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
      <p className="text-sm font-bold text-coral-600 uppercase tracking-wide">
        Chào mừng trở lại
      </p>
      <h1 className="font-display font-extrabold text-3xl mt-2 break-all">{user.email}</h1>

      <div className="mt-8 max-w-md">
        <Card className="rounded-3xl shadow-card border-ink/5 p-6 gap-0 relative text-center">
          <Badge className="absolute top-4 right-4 bg-honey-300 text-charcoal text-[10px] font-bold px-2 py-1">
            SẮP RA MẮT
          </Badge>
          <div className="flex justify-center my-4">
            <div className="text-7xl animate-float select-none">🐶</div>
          </div>
          <p className="font-display font-bold text-lg">Thú cưng của bạn</p>
          <p className="mt-1 text-sm text-ink/50">
            Chỉ số Nghe/Nói/Đọc/Viết và quá trình tiến hoá sẽ sớm xuất hiện ở đây.
          </p>
        </Card>
      </div>
    </div>
  );
}

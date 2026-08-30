"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth/AuthContext";
import { TOPIC_ICONS, TOPIC_LABELS, TOPIC_LIST } from "@/lib/vocabulary/labels";
import HomeLearningOverview from "./HomeLearningOverview";
import HomeSidebar from "./HomeSidebar";
import HomeTopBar from "./HomeTopBar";

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
    <div className="min-h-screen">
      <HomeTopBar />
      <HomeSidebar />

      <div className="lg:pl-[220px]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
          <p className="text-sm font-bold text-coral-600 uppercase tracking-wide">
            Chào mừng trở lại
          </p>
          <h1 className="font-display font-extrabold text-3xl mt-2 break-all">{user.email}</h1>

          <div className="mt-8">
            <HomeLearningOverview goal={user.goal} />
          </div>

          <section className="mt-10">
            <h2 className="font-display font-bold text-xl">Học từ vựng</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/vocabularies"
                className="bg-surface rounded-3xl shadow-card border border-ink/5 p-6 hover:border-coral-300 hover:-translate-y-1 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2"
              >
                <div className="text-3xl" aria-hidden="true">
                  📖
                </div>
                <p className="font-display font-bold text-lg mt-2">Khám phá từ vựng</p>
                <p className="mt-1 text-sm text-ink/50">
                  Tìm kiếm và lọc theo cấp độ, loại từ, chủ đề.
                </p>
              </Link>

              <Link
                href="/me/vocabularies"
                className="bg-surface rounded-3xl shadow-card border border-ink/5 p-6 hover:border-coral-300 hover:-translate-y-1 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2"
              >
                <div className="text-3xl" aria-hidden="true">
                  ❤️
                </div>
                <p className="font-display font-bold text-lg mt-2">Từ vựng của tôi</p>
                <p className="mt-1 text-sm text-ink/50">Xem lại các từ bạn đã lưu và yêu thích.</p>
              </Link>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-display font-bold text-xl">Khám phá theo chủ đề</h2>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {TOPIC_LIST.map((topic) => (
                <Link
                  key={topic}
                  href={`/vocabularies?topic=${topic}`}
                  className="bg-surface rounded-2xl shadow-card border border-ink/5 p-4 text-center hover:border-coral-300 hover:-translate-y-1 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2"
                >
                  <div className="text-2xl" aria-hidden="true">
                    {TOPIC_ICONS[topic]}
                  </div>
                  <p className="mt-1.5 text-sm font-semibold">{TOPIC_LABELS[topic]}</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-10 max-w-md">
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
      </div>
    </div>
  );
}

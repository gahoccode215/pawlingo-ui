"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { getTopics } from "@/lib/vocab/topics";
import { getTopicProgress } from "@/lib/vocab/progress";

export default function HomeDashboard() {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  const topicProgress = useMemo(
    () => getTopics().map((topic) => ({ topic, progress: getTopicProgress(topic) })),
    [],
  );

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

      <div className="mt-8 grid md:grid-cols-[1fr_1.4fr] gap-6">
        <div className="bg-surface rounded-3xl shadow-card border border-ink/5 p-6 relative text-center">
          <span className="absolute top-4 right-4 text-[10px] font-bold bg-honey-300 text-ink px-2 py-1 rounded-full">
            SẮP RA MẮT
          </span>
          <div className="flex justify-center my-4">
            <div className="text-7xl animate-float select-none">🐶</div>
          </div>
          <p className="font-display font-bold text-lg">Thú cưng của bạn</p>
          <p className="mt-1 text-sm text-ink/50">
            Chỉ số Nghe/Nói/Đọc/Viết và quá trình tiến hoá sẽ sớm xuất hiện ở đây.
          </p>
        </div>

        <div className="bg-surface rounded-3xl shadow-card border border-ink/5 p-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <p className="font-display font-bold text-lg">Học từ vựng</p>
            <Link
              href="/learn"
              className="bg-coral-500 hover:bg-coral-600 text-white font-display font-semibold text-sm px-4 py-2 rounded-full shadow-pop active:translate-y-0.5 active:shadow-none transition-all whitespace-nowrap"
            >
              Tiếp tục học 🐾
            </Link>
          </div>

          <div className="space-y-4">
            {topicProgress.map(({ topic, progress }) => (
              <div key={topic.id}>
                <div className="flex justify-between text-xs font-semibold text-ink/60 mb-1">
                  <span>
                    {topic.icon} {topic.label}
                  </span>
                  <span>
                    {progress.masteredCount} / {progress.totalCount}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-ink/5 overflow-hidden">
                  <div
                    className="bar-fill h-full rounded-full bg-teal-400"
                    style={{
                      width:
                        progress.totalCount === 0
                          ? "0%"
                          : `${(progress.masteredCount / progress.totalCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

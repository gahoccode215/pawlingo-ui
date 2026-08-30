"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth/AuthContext";
import { TOPIC_ICONS, TOPIC_LABELS, TOPIC_LIST } from "@/lib/vocabulary/labels";
import HomeLearningOverview, { GOAL_LABELS } from "./HomeLearningOverview";
import HomeSidebar from "./HomeSidebar";
import HomeTopBar from "./HomeTopBar";

const IELTS_SKILLS = ["Nghe", "Đọc", "Viết", "Nói"];

const PRIMARY_VOCAB_PILL =
  "inline-flex items-center gap-1.5 rounded-full border border-coral-300 bg-coral-50 px-3.5 py-2 text-sm font-semibold text-coral-600 hover:bg-coral-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2";

const TOPIC_PILL =
  "inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface px-3.5 py-2 text-sm font-semibold text-ink/70 hover:border-coral-300 hover:text-coral-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral-500 focus-visible:outline-offset-2";

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
          <p className="mt-1 text-sm text-ink/50">Mục tiêu học: {GOAL_LABELS[user.goal]}</p>

          <div className="mt-8">
            <HomeLearningOverview />
          </div>

          <section className="mt-12">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display font-bold text-xl">Từ vựng</h2>
              <Link
                href="/vocabularies"
                className="text-sm font-semibold text-coral-600 hover:underline shrink-0"
              >
                Xem tất cả →
              </Link>
            </div>
            <p className="mt-1 text-sm text-ink/50">
              Khám phá theo chủ đề hoặc xem lại những từ bạn đã lưu.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/vocabularies" className={PRIMARY_VOCAB_PILL}>
                📖 Khám phá từ vựng
              </Link>
              <Link href="/me/vocabularies" className={PRIMARY_VOCAB_PILL}>
                ❤️ Từ vựng của tôi
              </Link>
              {TOPIC_LIST.map((topic) => (
                <Link key={topic} href={`/vocabularies?topic=${topic}`} className={TOPIC_PILL}>
                  {TOPIC_ICONS[topic]} {TOPIC_LABELS[topic]}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-xl">IELTS</h2>
              <Badge className="bg-honey-300 text-charcoal text-[10px] font-bold px-2 py-1">
                SẮP RA MẮT
              </Badge>
            </div>
            <p className="mt-1 text-sm text-ink/50">
              4 kỹ năng Nghe, Đọc, Viết, Nói bám sát format đề thi thật.
            </p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {IELTS_SKILLS.map((skill) => (
                <div
                  key={skill}
                  className="rounded-xl border border-dashed border-ink/15 px-4 py-3 text-center text-sm font-semibold text-ink/35"
                  aria-disabled="true"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-xl">Luyện nói cùng AI</h2>
              <Badge className="bg-honey-300 text-charcoal text-[10px] font-bold px-2 py-1">
                SẮP RA MẮT
              </Badge>
            </div>
            <p className="mt-1 text-sm text-ink/50">
              AI chấm điểm phát âm và phản hồi chi tiết từng buổi luyện nói.
            </p>
            <div
              className="mt-4 rounded-xl border border-dashed border-ink/15 px-4 py-6 text-center text-sm font-semibold text-ink/35"
              aria-disabled="true"
            >
              Sắp ra mắt — quay lại sau nhé
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

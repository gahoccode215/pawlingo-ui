import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SKILLS = [
  { icon: "👂", label: "Nghe", level: "Lv.4", width: "70%", color: "bg-teal-400" },
  { icon: "🗣️", label: "Nói", level: "Lv.2", width: "35%", color: "bg-coral-400" },
  { icon: "📖", label: "Đọc", level: "Lv.5", width: "85%", color: "bg-honey-500" },
  { icon: "✍️", label: "Viết", level: "Lv.1", width: "18%", color: "bg-ink/40" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-14 pb-20 md:pt-20 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 border border-ink/10 rounded-full px-3.5 py-1.5 text-xs font-semibold text-ink/70">
            🐣 Bản dựng Tuần 1 · MVP thử nghiệm
          </span>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.04] tracking-tight mt-5">
            Học tiếng Anh.
            <span className="block text-coral-600">Tiến bộ thật, đo được.</span>
          </h1>
          <p className="mt-5 text-lg text-ink/70 max-w-md leading-relaxed">
            Không phải vì bạn mua coin, đổi skin, hay giữ streak. Bạn tiến bộ vì{" "}
            <span className="font-semibold text-ink">bạn thực sự luyện tập</span> — Từ
            vựng, 4 kỹ năng IELTS, và nói chuyện cùng AI. Tiến bộ thật, đo được thật.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild variant="pop" className="h-auto px-7 py-3.5">
              <a href="/register">Bắt đầu miễn phí 🐾</a>
            </Button>
            <a
              href="#why"
              className="font-semibold text-ink/70 hover:text-ink px-2 py-3.5 transition-colors"
            >
              Sao không chỉ cần streak? →
            </a>
          </div>
        </div>

        {/* Pet stat card mockup */}
        <div className="relative flex justify-center md:justify-end">
          <Card className="w-full max-w-sm rounded-3xl shadow-card p-6 border-ink/10 relative gap-0">
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="font-display font-bold text-lg">Tiến độ của bạn</p>
                <p className="text-xs text-ink/50 font-medium">Tuần này</p>
              </div>
              <span className="bg-honey-100 text-honey-500 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                ⚡ 82%
              </span>
            </div>

            <div className="flex justify-center my-5">
              <div className="text-8xl animate-float select-none">🎯</div>
            </div>

            <div className="space-y-3">
              {SKILLS.map((skill) => (
                <div key={skill.label}>
                  <div className="flex justify-between text-xs font-semibold text-ink/60 mb-1">
                    <span>
                      {skill.icon} {skill.label}
                    </span>
                    <span>{skill.level}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-ink/5 overflow-hidden">
                    <div
                      className={`bar-fill h-full rounded-full ${skill.color}`}
                      style={{ width: skill.width }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-cream rounded-xl px-3.5 py-2.5 text-xs text-ink/60 font-medium flex items-center gap-2">
              💬 &ldquo;Hoàn thành 3 bài luyện nói nữa để lên trình độ tiếp theo. Không
              áp lực đâu... thôi thì hơi áp lực một chút.&rdquo;
            </div>
          </Card>
          <div className="hidden sm:block absolute -bottom-5 -left-5 bg-teal-500 text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-pop rotate-[-6deg] animate-floatSlow">
            +12 XP hôm nay 🎉
          </div>
        </div>
      </div>
    </section>
  );
}

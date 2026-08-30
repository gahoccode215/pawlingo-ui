import { Coins, Flame, Heart, Lock, Mic, PawPrint, Sprout, TrendingDown, Trophy, X } from "lucide-react";
import { Card } from "@/components/ui/card";

const OTHER_APPS = [
  { icon: Flame, text: `"Đừng để mất streak 47 ngày!" (thuần tuý gây tội lỗi)` },
  { icon: Trophy, text: "Bảng xếp hạng khiến người mới cảm thấy tụt lại" },
  { icon: Coins, text: "Vật phẩm/skin mua bằng coin — chỉ để trang trí" },
  { icon: TrendingDown, text: "XP chẳng còn ý nghĩa gì khi tắt app" },
];

const PAWLINGO = [
  {
    icon: Heart,
    text: "Streak, XP vẫn có — nhưng chỉ là điểm cộng vui vẻ. Tiến bộ kỹ năng thật của bạn — Nghe, Nói, Đọc, Viết — mới là thứ được đo, không phải một con số ngày liên tiếp",
  },
  { icon: Lock, text: "Bảng tiến độ riêng tư, không phải bảng xếp hạng công khai" },
  {
    icon: Sprout,
    text: "Tiến bộ của bạn gắn liền với kỹ năng Nghe/Nói/Đọc/Viết thật sự, không phải với những con số ảo",
  },
  {
    icon: Mic,
    text: "AI chấm điểm phát âm cho bạn phản hồi cụ thể từng buổi luyện nói, không chỉ đúng/sai",
  },
];

export default function WhySection() {
  return (
    <section id="why" className="bg-surface border-y border-ink/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-bold text-coral-600 uppercase tracking-wide">
            Vấn đề
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mt-2">
            Streak khiến bạn tội lỗi. Bảng xếp hạng khiến bạn căng thẳng.
          </h2>
          <p className="mt-4 text-ink/60 text-lg">
            Hầu hết các app tạo động lực bằng những con số khiến bạn lo lắng lại từ đầu mỗi
            sáng. Chúng tôi tin bạn sẽ quay lại vì thấy được tiến bộ thật của chính mình —
            từng kỹ năng, từng buổi luyện tập.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <Card className="rounded-3xl border-ink/10 p-7 bg-surface gap-0">
            <p className="font-display font-bold text-ink/50 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <X className="size-4" /> App khác
            </p>
            <ul className="space-y-3 text-ink/60">
              {OTHER_APPS.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <item.icon className="size-4 shrink-0 mt-0.5 text-ink/40" />
                  {item.text}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="rounded-3xl border border-coral-300 p-7 bg-surface relative gap-0">
            <p className="font-display font-bold text-coral-600 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <PawPrint className="size-4" /> PawLingo
            </p>
            <ul className="space-y-3 text-ink/80">
              {PAWLINGO.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <item.icon className="size-4 shrink-0 mt-0.5 text-coral-500" />
                  {item.text}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}

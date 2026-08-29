import { Card } from "@/components/ui/card";

const OTHER_APPS = [
  { icon: "🔥", text: `"Đừng để mất streak 47 ngày!" (thuần tuý gây tội lỗi)` },
  { icon: "🏆", text: "Bảng xếp hạng khiến người mới cảm thấy tụt lại" },
  { icon: "🪙", text: "Thú cưng/skin mua bằng coin — chỉ để trang trí" },
  { icon: "📉", text: "XP chẳng còn ý nghĩa gì khi tắt app" },
];

const PAWLINGO = [
  {
    icon: "❤️",
    text: "Năng lượng thú cưng giảm khi bạn vắng mặt — vì nó nhớ bạn, không phải vì một con số",
  },
  { icon: "📊", text: "Bảng tiến độ riêng tư, không phải bảng xếp hạng công khai" },
  { icon: "🌱", text: "Tiến hoá gắn liền với kỹ năng Nghe/Nói/Đọc/Viết thật sự" },
  { icon: "🎩", text: "Coin vẫn tồn tại — nhưng chỉ để mua mũ, trang phục, không bao giờ ảnh hưởng đến tăng trưởng" },
];

export default function WhySection() {
  return (
    <section id="why" className="bg-surface border-y border-ink/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-bold text-coral-600 uppercase tracking-wide">
            Vấn đề
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl mt-2">
            Streak khiến bạn tội lỗi. Bảng xếp hạng khiến bạn căng thẳng.
          </h2>
          <p className="mt-4 text-ink/60 text-lg">
            Hầu hết các app tạo động lực bằng những con số khiến bạn lo lắng lại từ đầu mỗi
            sáng. Chúng tôi tin bạn sẽ quay lại vì thứ bạn thực sự quan tâm — như một chú
            thú cưng đang trông chờ vào bạn.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <Card className="rounded-3xl border-ink/10 p-7 bg-cream/60 gap-0">
            <p className="font-display font-bold text-ink/50 text-sm uppercase tracking-wide mb-4">
              😰 App khác
            </p>
            <ul className="space-y-3 text-ink/60">
              {OTHER_APPS.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <span>{item.icon}</span> {item.text}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="rounded-3xl border-2 border-coral-300 p-7 bg-surface relative gap-0">
            <p className="font-display font-bold text-coral-600 text-sm uppercase tracking-wide mb-4">
              🐾 PawLingo
            </p>
            <ul className="space-y-3 text-ink/80">
              {PAWLINGO.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <span>{item.icon}</span> {item.text}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}

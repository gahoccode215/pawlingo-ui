import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const FEATURES = [
  {
    icon: "🐾",
    iconBg: "bg-coral-500/12",
    title: "Hệ thống thú cưng",
    description:
      "Chỉ số cho Nghe, Nói, Đọc và Viết. Bỏ luyện tập thì năng lượng âm thầm giảm — không xấu hổ, chỉ là một lời nhắc quay lại.",
  },
  {
    icon: "🗂️",
    iconBg: "bg-teal-500/12",
    title: "Học từ vựng",
    description:
      "Bài học flashcard nhỏ gọn (10–20 từ) với lặp lại ngắt quãng nhẹ nhàng — từ nào sai sẽ xuất hiện lại nhiều hơn.",
  },
  {
    icon: "🎙️",
    iconBg: "bg-honey-500/15",
    title: "Luyện phát âm",
    description:
      "AI chấm điểm bằng cách so sánh giọng bạn với người bản xứ, từng âm vị một. Sẽ có ở giai đoạn sau.",
    badge: "SẮP RA MẮT",
  },
  {
    icon: "📈",
    iconBg: "bg-foreground/8",
    title: "Bảng tiến độ",
    description:
      "Góc nhìn riêng tư về những gì bạn đã học — kèm chế độ xem cho phụ huynh với tài khoản trẻ em. Không có bảng xếp hạng công khai.",
  },
];

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-sm font-bold text-teal-600 uppercase tracking-wide">
          Bạn nhận được gì
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl mt-2">
          Xoay quanh một vòng lặp: học, và xem chúng lớn lên.
        </h2>
      </div>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((feature) => (
          <Card
            key={feature.title}
            className="rounded-3xl shadow-card border-ink/5 p-6 gap-0 hover:-translate-y-1.5 transition-transform relative"
          >
            {feature.badge && (
              <Badge className="absolute top-4 right-4 bg-honey-300 text-charcoal text-[10px] font-bold px-2 py-1">
                {feature.badge}
              </Badge>
            )}
            <div
              className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center text-3xl mb-4`}
            >
              {feature.icon}
            </div>
            <h3 className="font-display font-bold text-lg">{feature.title}</h3>
            <p className="mt-2 text-sm text-ink/60 leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

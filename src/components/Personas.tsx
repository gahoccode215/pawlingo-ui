import { Briefcase, Sprout, Target, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const PERSONAS = [
  {
    icon: Sprout,
    title: "Người mới bắt đầu",
    quote:
      "Mình chỉ muốn một thói quen hằng ngày nhẹ nhàng — không quát mắng khi mình bỏ lỡ một ngày.",
  },
  {
    icon: Users,
    title: "Phụ huynh",
    quote:
      "Tôi mua cho con. Nội dung an toàn, và tôi thực sự thấy con đang học gì — không chỉ là số streak.",
  },
  {
    icon: Briefcase,
    title: "Người đi làm",
    quote:
      "Thú cưng dễ thương thật, nhưng tôi cần đo lường kỹ năng thực sự. App này không hề trẻ con.",
  },
  {
    icon: Target,
    title: "Người luyện thi",
    quote:
      "Bộ từ vựng có cấu trúc và mục tiêu rõ ràng — chỉ số thú cưng gần như là một kế hoạch học tập.",
  },
];

export default function Personas() {
  return (
    <section id="for-you" className="bg-surface border-y border-ink/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-bold text-coral-600 uppercase tracking-wide">
            Dành cho mọi người học
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mt-2">
            Thân thiện với người mới. Nghiêm túc với người lớn.
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PERSONAS.map((persona) => (
            <Card key={persona.title} className="rounded-3xl bg-cream p-6 border-ink/10 gap-0">
              <div className="w-11 h-11 rounded-xl bg-ink/5 flex items-center justify-center mb-3">
                <persona.icon className="size-5 text-ink" />
              </div>
              <p className="font-display font-bold">{persona.title}</p>
              <p className="mt-2 text-sm text-ink/60 leading-relaxed">
                &ldquo;{persona.quote}&rdquo;
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

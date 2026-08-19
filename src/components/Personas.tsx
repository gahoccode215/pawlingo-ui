const PERSONAS = [
  {
    icon: "🌱",
    title: "Người mới bắt đầu",
    quote:
      "Mình chỉ muốn một thói quen hằng ngày nhẹ nhàng — không quát mắng khi mình bỏ lỡ một ngày.",
  },
  {
    icon: "👨‍👧",
    title: "Phụ huynh",
    quote:
      "Tôi mua cho con. Nội dung an toàn, và tôi thực sự thấy con đang học gì — không chỉ là số streak.",
  },
  {
    icon: "💼",
    title: "Người đi làm",
    quote:
      "Thú cưng dễ thương thật, nhưng tôi cần đo lường kỹ năng thực sự. App này không hề trẻ con.",
  },
  {
    icon: "🎯",
    title: "Người luyện thi",
    quote:
      "Bộ từ vựng có cấu trúc và mục tiêu rõ ràng — chỉ số thú cưng gần như là một kế hoạch học tập.",
  },
];

export default function Personas() {
  return (
    <section id="for-you" className="bg-white border-y border-ink/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-bold text-coral-600 uppercase tracking-wide">
            Dành cho mọi người học
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl mt-2">
            Thân thiện với người mới. Nghiêm túc với người lớn.
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PERSONAS.map((persona) => (
            <div
              key={persona.title}
              className="rounded-3xl bg-cream p-6 border border-ink/5"
            >
              <div className="text-3xl mb-3">{persona.icon}</div>
              <p className="font-display font-bold">{persona.title}</p>
              <p className="mt-2 text-sm text-ink/60 leading-relaxed">
                &ldquo;{persona.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

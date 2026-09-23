const pathSignals = [
  {
    title: "Trình độ",
    detail: "Bắt đầu từ nhóm từ phù hợp với nền tảng hiện tại.",
  },
  {
    title: "Chủ đề",
    detail: "Học theo những tình huống bạn thực sự cần sử dụng.",
  },
  {
    title: "Mức độ phổ biến",
    detail: "Ưu tiên những từ xuất hiện thường xuyên trong tiếng Anh.",
  },
  {
    title: "Mục tiêu",
    detail: "Đi tiếp theo hướng giao tiếp, học tập hoặc công việc.",
  },
];

export default function PathSection() {
  return (
    <section id="lo-trinh" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-14 px-5 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div className="max-w-[460px] md:sticky md:top-24 md:self-start">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.052em]">
            Không phải một danh sách ngẫu nhiên.
          </h2>
          <p className="mt-5 max-w-[420px] text-[17px] leading-7 text-muted">
            Lộ trình kết hợp trình độ, chủ đề, tần suất và mục tiêu để chọn nội dung tiếp theo.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2">
          {pathSignals.map((signal) => (
            <article key={signal.title} className="min-h-48 bg-canvas p-6 sm:p-8">
              <h3 className="text-[21px] font-semibold tracking-[-0.4px]">{signal.title}</h3>
              <p className="mt-3 max-w-[300px] leading-6 text-muted">{signal.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

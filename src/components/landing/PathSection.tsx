const pathSignals = [
  {
    title: "Trình độ hiện tại",
    detail: "Bắt đầu từ nơi bạn đang đứng, không học lại những gì đã chắc.",
    className: "bg-cobalt text-on-cobalt md:col-span-7 md:row-span-2",
    detailClassName: "text-on-cobalt/80",
  },
  {
    title: "Tình huống cần dùng",
    detail: "Ưu tiên ngôn ngữ cho giao tiếp, học tập hoặc công việc.",
    className: "bg-cobalt-soft text-ink md:col-span-5",
    detailClassName: "text-muted",
  },
  {
    title: "Tần suất xuất hiện",
    detail: "Gặp những từ phổ biến trước khi đi vào nhóm chuyên sâu.",
    className: "bg-surface-raised text-ink md:col-span-5",
    detailClassName: "text-muted",
  },
  {
    title: "Kết quả mỗi buổi",
    detail: "Luôn biết mình vừa học gì và nội dung nào cần quay lại.",
    className: "bg-surface text-ink md:col-span-12",
    detailClassName: "text-muted",
  },
];

export default function PathSection() {
  return (
    <section id="lo-trinh" className="bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-10">
        <div className="landing-reveal max-w-[820px]">
          <h2 className="landing-display text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            Lộ trình được chọn, không được đoán.
          </h2>
          <p className="landing-copy mt-5 max-w-[590px] text-[18px] leading-8 text-muted">
            Bốn tín hiệu giúp PawLingo quyết định nội dung phù hợp tiếp theo.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(230px,auto)] gap-3 md:grid-cols-12">
          {pathSignals.map((signal) => (
            <article
              key={signal.title}
              className={`landing-reveal flex min-h-[230px] flex-col justify-between rounded-[18px] p-6 sm:p-8 ${signal.className}`}
            >
              <div className="mt-auto pt-16">
                <h3 className="max-w-[520px] text-[clamp(1.8rem,3.4vw,3.3rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                  {signal.title}
                </h3>
                <p className={`landing-copy mt-4 max-w-[440px] text-[16px] leading-7 ${signal.detailClassName}`}>
                  {signal.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

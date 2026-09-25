const futureModules = [
  { name: "Listening", label: "Nghe" },
  { name: "Reading", label: "Đọc" },
  { name: "Speaking", label: "Nói" },
  { name: "Grammar", label: "Ngữ pháp" },
  { name: "Writing", label: "Viết" },
];

export default function EcosystemSection() {
  return (
    <section id="he-sinh-thai" className="border-y border-line bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-10">
        <div className="landing-reveal max-w-[850px]">
          <h2 className="landing-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            Bắt đầu bằng từ vựng. Đi xa hơn bằng ngôn ngữ.
          </h2>
          <p className="landing-copy mt-5 max-w-[610px] text-[18px] leading-8 text-muted">
            Vocabulary là module đầu tiên. Các kỹ năng còn lại sẽ cùng dùng một lộ trình học thống nhất.
          </p>
        </div>

        <div className="mt-14 grid gap-3 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="landing-reveal flex min-h-[420px] flex-col justify-between rounded-[18px] bg-cobalt p-7 text-on-cobalt sm:p-10">
            <p className="text-[15px] font-medium text-on-cobalt/75">Đang tập trung phát triển</p>
            <div>
              <h3 className="text-[clamp(3.4rem,7vw,7rem)] font-semibold leading-none tracking-[-0.07em]">Vocabulary</h3>
              <p className="landing-copy mt-5 max-w-[510px] text-[17px] leading-7 text-on-cobalt/80">
                Học từ trong ngữ cảnh, luyện gợi nhớ và quay lại theo lịch ôn.
              </p>
            </div>
          </article>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 rounded-[18px] border border-line bg-surface-raised p-7 sm:p-10">
            {futureModules.map((module) => (
              <div key={module.name} className="landing-reveal min-h-[110px]">
                <p className="text-[clamp(1.5rem,3vw,2.6rem)] font-semibold tracking-[-0.045em]">{module.name}</p>
                <p className="mt-2 text-[14px] text-muted">{module.label} · tiếp theo</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

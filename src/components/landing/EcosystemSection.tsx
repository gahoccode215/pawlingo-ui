const futureModules = ["Listening", "Reading", "Speaking", "Grammar", "Writing"];

export default function EcosystemSection() {
  return (
    <section id="he-sinh-thai" className="bg-canvas py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-[700px]">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.052em]">
            Bắt đầu với từ vựng. Mở rộng theo thời gian.
          </h2>
          <p className="mt-5 max-w-[560px] text-[17px] leading-7 text-muted">
            Vocabulary là module đang được tập trung phát triển. Các kỹ năng khác thuộc định hướng tiếp theo của PawLingo.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <article className="flex min-h-[330px] flex-col justify-between rounded-[16px] bg-cobalt p-7 text-[#f9fbff] sm:p-9">
            <div>
              <p className="text-[14px] text-[#e8f0ff]">Đang phát triển</p>
              <h3 className="mt-3 text-[42px] font-semibold tracking-[-1.5px]">Vocabulary</h3>
            </div>
            <p className="max-w-[440px] text-[18px] leading-7 text-[#e8f0ff]">
              Lộ trình từ vựng, phiên học chủ động, lịch ôn và hướng dẫn bước tiếp theo.
            </p>
          </article>

          <div className="border-t border-line">
            {futureModules.map((module) => (
              <div key={module} className="flex min-h-16 items-center justify-between gap-4 border-b border-line py-4">
                <p className="text-[19px] font-medium tracking-[-0.3px]">{module}</p>
                <p className="text-[14px] text-muted">Sắp có</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

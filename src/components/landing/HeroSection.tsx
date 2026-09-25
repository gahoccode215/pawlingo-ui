export default function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-canvas">
      <div className="mx-auto grid min-h-[calc(100dvh-68px)] max-w-[1320px] items-center gap-10 px-4 py-10 sm:px-7 md:py-14 lg:grid-cols-12 lg:gap-8 lg:px-10">
        <div className="relative z-[1] max-w-[720px] lg:col-span-7 lg:pr-8">
          <p className="mb-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-cobalt">
            Tiếng Anh cho người Việt
          </p>
          <h1 className="landing-display text-[clamp(3.5rem,7.1vw,6.8rem)] font-semibold leading-[0.88] tracking-[-0.072em]">
            Tiếng Anh, rõ đường để tiến.
          </h1>
          <p className="landing-copy mt-7 max-w-[520px] text-[18px] leading-7 text-muted sm:text-[20px] sm:leading-8">
            Học đúng nội dung, luyện đúng cách và quay lại đúng lúc.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#hoc-thu" className="button button-primary whitespace-nowrap">
              Học thử
            </a>
            <a href="#cach-hoc" className="button button-ghost whitespace-nowrap">
              Xem cách học
            </a>
          </div>
        </div>

        <div className="relative hidden min-h-[560px] lg:col-span-5 lg:block" aria-label="Minh họa một từ vựng đang được học">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-[18px] border border-line bg-surface-raised p-6 shadow-[0_28px_80px_rgba(36,87,214,0.12)] sm:p-8 lg:-right-10 lg:left-0">
            <div className="flex items-center justify-between border-b border-line pb-5 text-[14px] text-muted">
              <span>từ đang học</span>
              <span>B1 · adjective</span>
            </div>
            <div className="py-8 sm:py-10">
              <p className="hero-word text-[clamp(3.8rem,8vw,6.6rem)] font-semibold leading-none tracking-[-0.07em]">
                reliable
              </p>
              <p className="mt-4 text-[17px] text-muted">/rɪˈlaɪəbəl/</p>
              <p className="mt-8 max-w-[390px] text-[21px] leading-8">
                She is a reliable teammate who always finishes her work.
              </p>
            </div>
            <div className="flex items-center justify-between gap-5 border-t border-line pt-5">
              <p className="text-[14px] text-muted">Bạn nhớ nghĩa của từ này?</p>
              <p className="text-[17px] font-semibold text-cobalt">đáng tin cậy</p>
            </div>
          </div>

          <div className="hero-float absolute right-0 top-5 rounded-full bg-cobalt px-5 py-3 text-[14px] font-semibold text-on-cobalt sm:right-4 lg:-right-5 lg:top-12">
            nghe, hiểu, nhớ
          </div>
          <div className="hero-float-delayed absolute bottom-5 left-0 rounded-full border border-line bg-cobalt-soft px-5 py-3 text-[14px] font-semibold text-cobalt sm:left-5 lg:-left-8 lg:bottom-10">
            ôn lại đúng lúc
          </div>
        </div>
      </div>
    </section>
  );
}

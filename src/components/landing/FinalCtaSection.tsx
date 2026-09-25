export default function FinalCtaSection() {
  return (
    <section id="bat-dau" className="bg-cobalt py-24 text-on-cobalt sm:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-10">
        <div className="landing-reveal flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <h2 className="landing-display max-w-[850px] text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.91] tracking-[-0.065em]">
              Một từ hôm nay. Một nền tảng vững ngày mai.
            </h2>
            <p className="landing-copy mt-6 max-w-[520px] text-[18px] leading-8 text-on-cobalt/80">
              Bắt đầu bằng một lượt gợi nhớ ngắn và cảm nhận cách PawLingo tổ chức việc học.
            </p>
          </div>
          <a
            href="#hoc-thu"
            className="button shrink-0 whitespace-nowrap bg-on-cobalt text-cobalt hover:-translate-y-1 focus-visible:outline-on-cobalt"
          >
            Học thử
          </a>
        </div>
      </div>
    </section>
  );
}

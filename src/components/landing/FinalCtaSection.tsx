export default function FinalCtaSection() {
  return (
    <section id="bat-dau" className="border-t border-line bg-surface py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="max-w-[700px] text-[clamp(2.4rem,4.8vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.052em]">
            Xây nền từ vựng vững hơn, từng buổi một.
          </h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-7 text-muted">
            Thử một bài học mẫu để xem cách PawLingo tổ chức việc học và ôn từ.
          </p>
        </div>
        <a href="#hoc-thu" className="button button-primary w-full whitespace-nowrap sm:w-auto">
          Học thử
        </a>
      </div>
    </section>
  );
}

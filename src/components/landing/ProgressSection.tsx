const reviewStates = [
  {
    word: "Học",
    title: "Nội dung mới vừa sức",
    detail: "Từ mới được chọn theo trình độ và mục tiêu bạn đang theo đuổi.",
  },
  {
    word: "Ôn",
    title: "Nội dung cũ đúng thời điểm",
    detail: "Từ chưa chắc quay lại trước khi chúng biến mất khỏi trí nhớ.",
  },
  {
    word: "Tiến",
    title: "Bước tiếp theo luôn rõ",
    detail: "Mỗi buổi kết thúc bằng một hướng đi cụ thể cho lần học kế tiếp.",
  },
];

export default function ProgressSection() {
  return (
    <section id="tien-do" className="bg-canvas py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-4 sm:px-7 md:grid-cols-12 md:gap-8 lg:px-10">
        <div className="landing-reveal md:col-span-5 md:sticky md:top-28 md:self-start">
          <h2 className="landing-display max-w-[520px] text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            Tiến bộ không phải một con số.
          </h2>
          <p className="landing-copy mt-5 max-w-[470px] text-[18px] leading-8 text-muted">
            Đó là khả năng biết mình đã chắc gì, còn yếu gì và nên làm gì tiếp theo.
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {reviewStates.map((item) => (
            <article key={item.word} className="landing-reveal border-b border-line py-10 first:pt-0 md:py-14">
              <p className="text-[clamp(3.8rem,7vw,7rem)] font-semibold leading-none tracking-[-0.07em] text-cobalt">
                {item.word}
              </p>
              <h3 className="mt-7 text-[22px] font-semibold tracking-[-0.4px]">{item.title}</h3>
              <p className="landing-copy mt-3 max-w-[470px] text-[16px] leading-7 text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

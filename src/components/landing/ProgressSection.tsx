const reviewStates = [
  {
    title: "Đã học",
    detail: "Xem lại những từ đã gặp và trạng thái hiện tại của chúng.",
  },
  {
    title: "Cần ôn",
    detail: "Những từ chưa chắc được đưa lên trước trong buổi tiếp theo.",
  },
  {
    title: "Nên học tiếp",
    detail: "Nội dung mới được chọn dựa trên lộ trình đang theo.",
  },
];

export default function ProgressSection() {
  return (
    <section id="tien-do" className="border-y border-line bg-surface py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:items-start md:gap-24">
        <div>
          <h2 className="max-w-[640px] text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.052em]">
            Luôn biết bước tiếp theo.
          </h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-7 text-muted">
            Tiến độ không chỉ là một con số. Nó giúp bạn quyết định nên ôn hay học mới.
          </p>
        </div>

        <div className="border-t border-line">
          {reviewStates.map((item) => (
            <article key={item.title} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[0.7fr_1.3fr] sm:gap-8">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="leading-6 text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const learningFlow = [
  {
    verb: "Gặp",
    cue: "trong câu",
    detail: "Từ mới xuất hiện trong một câu có nghĩa, không đứng một mình.",
  },
  {
    verb: "Hiểu",
    cue: "đủ lớp nghĩa",
    detail: "Nghĩa, cách dùng và phát âm được đặt cạnh nhau để dễ kết nối.",
  },
  {
    verb: "Gợi nhớ",
    cue: "tự trả lời",
    detail: "Bạn tự trả lời trước khi xem đáp án, thay vì chỉ đọc lại.",
  },
  {
    verb: "Quay lại",
    cue: "theo lịch ôn",
    detail: "Từ chưa chắc được đưa về đúng buổi ôn tiếp theo.",
  },
];

export default function MethodSection() {
  return (
    <>
      <section id="tu-vung" className="border-y border-line bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-10">
          <div className="landing-reveal max-w-[1040px]">
            <h2 className="landing-display text-[clamp(2.8rem,6.2vw,6.2rem)] font-medium leading-[0.94] tracking-[-0.06em]">
              Bạn không cần học nhiều hơn. Bạn cần học đúng lúc.
            </h2>
          </div>

          <div className="mt-16 grid gap-10 border-t border-line pt-8 md:grid-cols-2 md:gap-20 lg:ml-[25%]">
            <div>
              <h3 className="text-[20px] font-semibold tracking-[-0.35px]">Bỏ cách học theo danh sách</h3>
              <p className="landing-copy mt-3 max-w-[430px] text-[17px] leading-7 text-muted">
                Một từ chỉ thật sự hữu ích khi bạn hiểu nó trong câu và có thể tự gọi lại khi cần.
              </p>
            </div>
            <div>
              <h3 className="text-[20px] font-semibold tracking-[-0.35px]">Giữ một nhịp học rõ ràng</h3>
              <p className="landing-copy mt-3 max-w-[430px] text-[17px] leading-7 text-muted">
                PawLingo chọn nội dung tiếp theo để mỗi buổi học nối tiếp buổi trước, không bắt đầu lại từ đầu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="cach-hoc" className="bg-canvas py-24 sm:py-32">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-10">
          <div className="landing-reveal max-w-[760px]">
            <h2 className="landing-display text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
              Một vòng học khép kín.
            </h2>
            <p className="landing-copy mt-5 max-w-[560px] text-[18px] leading-8 text-muted">
              Mỗi lần gặp lại đều có mục đích, từ làm quen đến sử dụng chủ động.
            </p>
          </div>

          <ol className="mt-14 grid overflow-hidden rounded-[18px] border border-line bg-line md:grid-cols-4">
            {learningFlow.map((item) => (
              <li
                key={item.verb}
                className="group min-h-[220px] bg-surface-raised p-6 transition-colors hover:bg-cobalt-soft sm:p-7 md:min-h-[290px]"
              >
                <div className="flex h-full flex-col justify-between">
                  <span className="text-[14px] font-medium text-muted">{item.cue}</span>
                  <div className="mt-16">
                    <h3 className="text-[clamp(1.8rem,3vw,2.7rem)] font-semibold tracking-[-0.045em]">
                      {item.verb}
                    </h3>
                    <p className="landing-copy mt-3 max-w-[250px] text-[15px] leading-6 text-muted">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

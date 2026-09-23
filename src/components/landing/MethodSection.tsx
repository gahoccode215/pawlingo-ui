const learningFlow = ["Khám phá", "Hiểu nghĩa", "Gợi nhớ", "Ôn lại", "Ghi nhớ"];

export default function MethodSection() {
  return (
    <>
      <section id="tu-vung" className="border-y border-line bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <h2 className="max-w-[940px] text-[clamp(2.25rem,4.8vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.05em]">
            Ghi nhớ một danh sách từ chưa đủ. Bạn cần gặp từ trong ngữ cảnh và quay lại đúng lúc.
          </h2>

          <div className="mt-16 grid gap-8 border-t border-line pt-8 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <h3 className="text-[24px] font-semibold tracking-[-0.5px]">PawLingo giải quyết điều gì?</h3>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="font-medium">Không còn học ngẫu nhiên</p>
                <p className="mt-2 max-w-[340px] leading-6 text-muted">
                  Từ vựng được sắp xếp để bạn luôn biết nội dung phù hợp tiếp theo.
                </p>
              </div>
              <div>
                <p className="font-medium">Không bỏ quên từ đã học</p>
                <p className="mt-2 max-w-[340px] leading-6 text-muted">
                  Các từ cần luyện lại được đưa về đúng phiên ôn tập.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cach-hoc" className="bg-canvas py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="max-w-[650px]">
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.052em]">
              Một vòng học hoàn chỉnh.
            </h2>
            <p className="mt-5 max-w-[540px] text-[17px] leading-7 text-muted">
              Mỗi từ đi qua nhiều lần gợi nhớ thay vì chỉ xuất hiện một lần trong danh sách.
            </p>
          </div>

          <ol className="mt-14 grid border-y border-line md:grid-cols-5">
            {learningFlow.map((step) => (
              <li
                key={step}
                className="flex min-h-24 items-center border-b border-line py-5 md:min-h-36 md:border-r md:border-b-0 md:px-5 md:last:border-r-0"
              >
                <span className="text-[18px] font-medium tracking-[-0.25px]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

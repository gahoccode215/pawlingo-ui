"use client";

import { useState } from "react";

type DemoState = "question" | "answer" | "review" | "remembered";

export default function VocabularyDemo() {
  const [state, setState] = useState<DemoState>("question");
  const isAnswered = state !== "question";

  return (
    <section id="hoc-thu" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-7 lg:px-10">
        <div className="landing-reveal mb-12 max-w-[720px]">
          <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-cobalt">Học thử ngay tại đây</p>
          <h2 className="landing-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            Đừng đọc đáp án trước.
          </h2>
          <p className="landing-copy mt-5 max-w-[560px] text-[18px] leading-8 text-muted">
            Tự gọi lại nghĩa giúp trí nhớ làm việc mạnh hơn việc đọc lặp lại.
          </p>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-line bg-surface-raised md:grid md:grid-cols-[1.08fr_0.92fr]">
          <div className="flex min-h-[500px] flex-col justify-between border-b border-line p-6 sm:p-9 md:border-r md:border-b-0 lg:p-12">
            <div className="flex items-center justify-between text-[14px] text-muted">
              <span>B1 · adjective</span>
              <span>/rɪˈlaɪəbəl/</span>
            </div>
            <div className="py-14">
              <p className="text-[clamp(3.8rem,9vw,7.8rem)] font-semibold leading-none tracking-[-0.075em]">
                reliable
              </p>
              <p className="mt-8 max-w-[590px] text-[clamp(1.35rem,2.5vw,2rem)] leading-[1.4] tracking-[-0.025em]">
                She is a reliable teammate who always finishes her work.
              </p>
            </div>
            <p className="max-w-[440px] text-[15px] leading-6 text-muted">
              Dựa vào câu ví dụ, hãy đoán nghĩa trước khi kiểm tra.
            </p>
          </div>

          <div className="flex min-h-[500px] flex-col justify-between p-6 sm:p-9 lg:p-12">
            <div aria-live="polite">
              <p className="text-[15px] font-medium text-muted">Bạn nhớ từ này có nghĩa gì?</p>
              {!isAnswered ? (
                <p className="landing-copy mt-6 text-[clamp(1.8rem,4vw,3.3rem)] font-medium leading-[1.08] tracking-[-0.045em]">
                  Dừng một nhịp. Nghĩ câu trả lời của riêng bạn.
                </p>
              ) : (
                <div className="mt-6">
                  <p className="text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.06em] text-cobalt">
                    đáng tin cậy
                  </p>
                  <p className="landing-copy mt-5 max-w-[440px] text-[16px] leading-7 text-muted">
                    Dùng cho người hoặc vật có thể được tin tưởng vì luôn hoạt động ổn định và đúng như mong đợi.
                  </p>
                </div>
              )}

              {state === "review" && (
                <p className="mt-7 rounded-[18px] bg-cobalt-soft p-4 font-medium text-ink">
                  Từ này sẽ được ưu tiên trong buổi ôn tiếp theo.
                </p>
              )}
              {state === "remembered" && (
                <p className="mt-7 rounded-[18px] bg-cobalt-soft p-4 font-medium text-ink">
                  Đã ghi nhận. Từ này sẽ quay lại theo lịch ôn.
                </p>
              )}
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              {state === "question" && (
                <button type="button" className="button button-primary whitespace-nowrap" onClick={() => setState("answer")}>
                  Kiểm tra nghĩa
                </button>
              )}
              {state === "answer" && (
                <>
                  <button type="button" className="button button-ghost whitespace-nowrap" onClick={() => setState("review")}>
                    Cần ôn lại
                  </button>
                  <button type="button" className="button button-primary whitespace-nowrap" onClick={() => setState("remembered")}>
                    Đã nhớ
                  </button>
                </>
              )}
              {(state === "review" || state === "remembered") && (
                <button type="button" className="button button-dark whitespace-nowrap" onClick={() => setState("question")}>
                  Làm lại
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

type DemoState = "question" | "answer" | "review" | "remembered";

export default function VocabularyDemo() {
  const [state, setState] = useState<DemoState>("question");
  const isAnswered = state !== "question";

  function resetDemo() {
    setState("question");
  }

  return (
    <section id="hoc-thu" className="bg-canvas py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-[660px]">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.052em]">
            Học thử một từ.
          </h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-7 text-muted">
            Tự trả lời trước khi xem nghĩa giúp bạn luyện khả năng gợi nhớ chủ động.
          </p>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-[16px] border border-line bg-surface md:grid-cols-[0.72fr_1.28fr]">
          <div className="border-b border-line p-6 md:border-r md:border-b-0 md:p-8">
            <p className="text-[14px] text-muted">B1 / Tính từ</p>
            <p className="mt-8 text-[clamp(3rem,7vw,5.6rem)] font-semibold leading-none tracking-[-0.055em]">
              reliable
            </p>
            <p className="mt-4 text-[18px] text-muted">/rɪˈlaɪəbəl/</p>
            <p className="mt-10 max-w-[340px] text-[20px] leading-8">
              She is a reliable teammate who always finishes her work.
            </p>
          </div>

          <div className="flex min-h-[420px] flex-col justify-between p-6 md:p-8 lg:p-10">
            <div aria-live="polite">
              <p className="text-[14px] font-medium text-muted">Bạn nhớ từ này có nghĩa gì?</p>
              {!isAnswered ? (
                <p className="mt-5 max-w-[480px] text-[26px] font-medium leading-9 tracking-[-0.5px]">
                  Nghĩ câu trả lời của bạn, sau đó kiểm tra nghĩa và ví dụ.
                </p>
              ) : (
                <div className="mt-5">
                  <p className="text-[36px] font-semibold tracking-[-1px]">đáng tin cậy</p>
                  <p className="mt-4 max-w-[500px] leading-7 text-muted">
                    Dùng để mô tả người hoặc vật có thể được tin tưởng vì hoạt động ổn định và đúng như mong đợi.
                  </p>
                </div>
              )}

              {state === "review" && (
                <p className="mt-7 border-l-2 border-cobalt pl-4 font-medium">Từ này sẽ được ưu tiên trong lần ôn tiếp theo.</p>
              )}
              {state === "remembered" && (
                <p className="mt-7 border-l-2 border-cobalt pl-4 font-medium">Đã ghi nhận. Từ này sẽ quay lại theo lịch ôn.</p>
              )}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
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
                <button type="button" className="button button-dark whitespace-nowrap" onClick={resetDemo}>
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

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Server-side error tracking (Sentry, etc.) hooks in here later — for
    // now this at least surfaces the digest for cross-referencing server logs.
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-12 text-center">
      <div className="max-w-sm">
        <div className="text-6xl mb-4 select-none">🐕‍🦺</div>
        <p className="text-sm font-bold text-coral-600 uppercase tracking-wide">Có lỗi xảy ra</p>
        <h1 className="font-display font-extrabold text-3xl mt-2">Đã có gì đó không ổn</h1>
        <p className="mt-3 text-ink/60">
          Vui lòng thử lại — nếu vẫn lỗi, hãy quay lại sau ít phút.
        </p>
        <Button type="button" variant="pop" onClick={reset} className="h-auto mt-6 px-6 py-3">
          Thử lại
        </Button>
      </div>
    </div>
  );
}

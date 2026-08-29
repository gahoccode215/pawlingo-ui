import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-12 text-center">
      <div className="max-w-sm">
        <div className="text-6xl mb-4 select-none">🐾</div>
        <p className="text-sm font-bold text-coral-600 uppercase tracking-wide">Lỗi 404</p>
        <h1 className="font-display font-extrabold text-3xl mt-2">Không tìm thấy trang</h1>
        <p className="mt-3 text-ink/60">
          Trang bạn tìm không tồn tại, hoặc đã bị di chuyển đi nơi khác.
        </p>
        <Button asChild variant="pop" className="h-auto mt-6 px-6 py-3">
          <Link href="/">Về trang chủ 🐾</Link>
        </Button>
      </div>
    </div>
  );
}

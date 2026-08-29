import { Mail } from "lucide-react";

const PRODUCT_LINKS = [
  { href: "#why", label: "Vì sao PawLingo" },
  { href: "#features", label: "Tính năng" },
  { href: "#for-you", label: "Dành cho bạn" },
];

const SUPPORT_LINKS = [
  { href: "mailto:hello@pawlingo.app", label: "Liên hệ" },
  { href: "#", label: "Chính sách bảo mật" },
  { href: "#", label: "Điều khoản dịch vụ" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cream text-ink/60 border-t border-ink/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {/* Brand */}
          <div className="col-span-2">
            <a
              href="#top"
              className="flex items-center gap-2 font-display font-bold text-lg text-ink"
            >
              <span className="text-2xl">🐾</span> PawLingo
            </a>
            <p className="mt-3 text-sm leading-relaxed max-w-xs">
              Học tiếng Anh, nuôi lớn một thú cưng mà sự trưởng thành phản ánh đúng tiến
              bộ thật của bạn — không phải ví tiền.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <a
                href="#"
                aria-label="PawLingo trên X"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-ink/5 hover:bg-ink/10 hover:text-ink transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="PawLingo trên Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-ink/5 hover:bg-ink/10 hover:text-ink transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="mailto:hello@pawlingo.app"
                aria-label="Gửi email cho PawLingo"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-ink/5 hover:bg-ink/10 hover:text-ink transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="font-display font-semibold text-ink text-sm mb-4">Sản phẩm</p>
            <ul className="space-y-2.5 text-sm">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-ink transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="font-display font-semibold text-ink text-sm mb-4">Hỗ trợ</p>
            <ul className="space-y-2.5 text-sm">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-ink transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink/40">
          <p>&copy; {year} PawLingo. Giữ toàn quyền.</p>
          <p>Bản dựng thử nghiệm · Chỉ là concept giao diện, chưa phải sản phẩm chính thức</p>
        </div>
      </div>
    </footer>
  );
}

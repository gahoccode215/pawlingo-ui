const footerLinks = [
  { href: "#tu-vung", label: "Từ vựng" },
  { href: "#cach-hoc", label: "Cách học" },
  { href: "#he-sinh-thai", label: "Định hướng" },
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-[22px] font-semibold tracking-[-0.7px]">PawLingo</p>
          <p className="mt-2 max-w-[420px] text-[14px] leading-6 text-muted">
            Công cụ học tiếng Anh có cấu trúc dành cho người Việt.
          </p>
        </div>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
          <nav aria-label="Điều hướng chân trang" className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-[14px] text-muted transition-colors hover:text-ink">
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-[14px] text-muted">© 2026 PawLingo</p>
        </div>
      </div>
    </footer>
  );
}

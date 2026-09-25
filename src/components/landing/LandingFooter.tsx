const footerLinks = [
  { href: "#cach-hoc", label: "Phương pháp" },
  { href: "#lo-trinh", label: "Lộ trình" },
  { href: "#he-sinh-thai", label: "Kỹ năng" },
];

export default function LandingFooter() {
  return (
    <footer className="bg-canvas">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-10 sm:px-7 md:grid-cols-[1fr_auto] md:items-end lg:px-10">
        <div>
          <p className="text-[22px] font-semibold tracking-[-0.7px]">PawLingo</p>
          <p className="mt-2 max-w-[420px] text-[14px] leading-6 text-muted">
            Học tiếng Anh có lộ trình, dành cho người Việt.
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

import Link from "next/link";

const navItems = [
  { href: "#tu-vung", label: "Từ vựng" },
  { href: "#cach-hoc", label: "Cách học" },
  { href: "#lo-trinh", label: "Lộ trình" },
];

export default function LandingHeader() {
  return (
    <header className="relative z-20 h-[72px] border-b border-line/70 bg-canvas">
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="shrink-0 text-[24px] font-semibold tracking-[-0.9px] outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
        >
          PawLingo
        </a>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link href="/login" className="button button-dark whitespace-nowrap">
            Đăng nhập
        </Link>
      </div>
    </header>
  );
}

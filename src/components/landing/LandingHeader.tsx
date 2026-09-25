import Link from "next/link";

const navItems = [
  { href: "#cach-hoc", label: "Phương pháp" },
  { href: "#lo-trinh", label: "Lộ trình" },
  { href: "#hoc-thu", label: "Học thử" },
];

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-20 h-[68px] border-b border-line/80 bg-canvas/90 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-7 lg:px-10">
        <a
          href="#top"
          className="shrink-0 text-[22px] font-semibold tracking-[-0.9px] outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
        >
          PawLingo
        </a>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-7 lg:flex">
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

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="px-2 py-3 text-[14px] font-medium text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt sm:px-3"
          >
            Đăng nhập
          </Link>
          <a href="#hoc-thu" className="button button-primary whitespace-nowrap">
            Học thử
          </a>
        </div>
      </div>
    </header>
  );
}

const PRODUCT_LINKS = [
  { href: "#why", label: "Why PawLingo" },
  { href: "#features", label: "Features" },
  { href: "#for-you", label: "For You" },
  { href: "#waitlist", label: "Join Waitlist" },
];

const SUPPORT_LINKS = [
  { href: "mailto:hello@pawlingo.app", label: "Contact" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {/* Brand */}
          <div className="col-span-2">
            <a
              href="#top"
              className="flex items-center gap-2 font-display font-bold text-lg text-white"
            >
              <span className="text-2xl">🐾</span> PawLingo
            </a>
            <p className="mt-3 text-sm leading-relaxed max-w-xs">
              Learn English, raise a pet whose growth reflects your real progress — not
              your wallet.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <a
                href="#"
                aria-label="PawLingo on X"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="PawLingo on Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
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
                aria-label="Email PawLingo"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="font-display font-semibold text-white text-sm mb-4">Product</p>
            <ul className="space-y-2.5 text-sm">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="font-display font-semibold text-white text-sm mb-4">Support</p>
            <ul className="space-y-2.5 text-sm">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>&copy; {year} PawLingo. All rights reserved.</p>
          <p>Prototype build · UI concept only, not a live product</p>
        </div>
      </div>
    </footer>
  );
}

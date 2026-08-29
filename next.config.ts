import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent the site from being embedded in a foreign <iframe> (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Stop the browser from MIME-sniffing away from the declared Content-Type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Don't leak the full referring URL (which can include query params) to
  // third-party destinations — only the origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features this app never uses.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

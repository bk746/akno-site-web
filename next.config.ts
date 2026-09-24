import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const immutableCache = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 100],
  },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: immutableCache },
          ...securityHeaders,
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: immutableCache },
          ...securityHeaders,
        ],
      },
      {
        source: "/_next/static/media/:path*",
        headers: [
          { key: "Cache-Control", value: immutableCache },
          ...securityHeaders,
        ],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

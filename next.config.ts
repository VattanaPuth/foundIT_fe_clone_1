import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/chat/:path*",
        destination: "http://localhost:8085/chat/:path*",
      },
    ];
  },
};

export default nextConfig;

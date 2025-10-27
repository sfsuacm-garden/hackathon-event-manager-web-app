import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // eslint-disable-next-line require-await
  async rewrites() {
    return [
      {
        source: "/trpc/:path",
        destination: `http://127.0.0.1:${process.env.PORT}/trpc/:path*`
      }
    ]
  }
};

export default nextConfig;

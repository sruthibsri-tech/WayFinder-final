import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a minimal self-contained server (.next/standalone/server.js)
  // for a small production Docker image.
  output: "standalone",
  // Hide the on-screen Next.js dev indicator (bottom-left logo).
  devIndicators: false,
};

export default nextConfig;

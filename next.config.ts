import type { NextConfig } from "next";

const nextConfig = {
  output: "export",
  distDir: "dist",
  typescript: {
    ignoreBuildErrors: true,
  },
} satisfies NextConfig;

export default nextConfig;

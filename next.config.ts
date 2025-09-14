import type { NextConfig } from "next";

const nextConfig = {
  typedRoutes: true,
  output: "export",
  distDir: "dist",
  typescript: {
    ignoreBuildErrors: true,
  },
} satisfies NextConfig;

export default nextConfig;

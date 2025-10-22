import type { NextConfig } from "next";

const nextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  output: "export",
  distDir: "dist",
  typescript: {
    ignoreBuildErrors: true,
  },
} satisfies NextConfig;

export default nextConfig;

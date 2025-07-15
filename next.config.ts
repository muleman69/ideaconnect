import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily allow ESLint warnings for deployment, but keep TypeScript strict
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Production optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot'],
  },
  // Enable better performance
  poweredByHeader: false,
  compress: true,
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;

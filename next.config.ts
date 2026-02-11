import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // permite servidor baixar imagens externas
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
};

export default nextConfig;
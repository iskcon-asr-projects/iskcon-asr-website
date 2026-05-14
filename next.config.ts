import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  output: "export",

  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "teotvyqgrbmivctfmval.supabase.co",
      },
    ],
  },
};

export default nextConfig;
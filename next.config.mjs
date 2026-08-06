/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    COMPANY_NAME: "iNAYATechLab Inc.",
    COMPANY_START_DATE: "2026-08-01",
  },
  eslint: {
    dirs: ["app", "components", "lib", "config"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Step 282: Unused JS Bundle Size Reduction
  experimental: {
    optimizePackageImports: ["lucide-react", "@prisma/client"],
  },
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{member}}",
    },
  },
  // Step 284: Image & Asset Loading Speed Tune
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Step 283: Caching Layer (Redis) - Headers for ISR
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;

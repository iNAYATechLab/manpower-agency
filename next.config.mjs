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
};

export default nextConfig;

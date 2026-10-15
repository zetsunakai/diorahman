import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/karya/booking-work-order",
        destination: "/karya/integrasi-ceisa",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

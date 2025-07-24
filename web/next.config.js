/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  images: {
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "aupeferaibudquqmgdne.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/MillionLiveImageBucket/**",
      },
    ],
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV == "development",
});

module.exports = withPWA({
  // next.js config
  ...nextConfig,
});

// const withBundleAnalyzer = require("@next/bundle-analyzer")();

// module.exports =
//   process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;

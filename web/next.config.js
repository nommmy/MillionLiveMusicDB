/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  images: {
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

module.exports = nextConfig;

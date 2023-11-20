/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn-icons-png.flaticon.com",
      },
    ],
  },
};

module.exports = nextConfig;

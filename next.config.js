/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my--blog.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;

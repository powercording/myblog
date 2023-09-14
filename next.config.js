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
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_S3_ENDPOINT: process.env.NEXT_PUBLIC_S3_ENDPOINT,
    NEXT_PUBLIC_S3_BUCKET: process.env.NEXT_PUBLIC_S3_BUCKET,
    NEXT_PUBLIC_S3_SECRET_KEY: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
    NEXT_PUBLIC_S3_KEY: process.env.NEXT_PUBLIC_S3_KEY,
  },
};

module.exports = nextConfig;

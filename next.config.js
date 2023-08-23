const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: [
      'sejulbook.s3.ap-northeast-2.amazonaws.com',
      'search1.kakaocdn.net',
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);

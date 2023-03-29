/** @type {import('next').NextConfig} */
const nextConfig = {
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
  async rewrites() {
    return [
      {
        source: '/api/books/title',
        destination: `https://dapi.kakao.com/v3/search/book?target=people`,
      },
    ];
  },
};

module.exports = nextConfig;

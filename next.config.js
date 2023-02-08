/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ['img1.daumcdn.net', 'search1.kakaocdn.net'],
  },
  async rewrites() {
    return [
      {
        source: '/api/books/title',
        destination: `https://dapi.kakao.com/v3/search/book?target=title`,
      },
    ];
  },
};

module.exports = nextConfig;

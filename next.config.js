/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ['img1.daumcdn.net', 'search1.kakaocdn.net'], // 이곳에 에러에서 hostname 다음 따옴표에 오는 링크를 적으면 된다.
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

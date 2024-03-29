import Head from 'next/head';
import { APP_NAME } from '@/constants';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const defaultSEO = {
  description:
    '의미있는 책을 담는 공간, 부담없이 책을 기록하는 공간, 당신에게 그런 공간이 되기를.',
  url: 'https://www.sejulbook.com',
  image: 'https://sejulbook.s3.ap-northeast-2.amazonaws.com/logo-icon.svg',
};

const SEO = ({ title, description, url, image }: SEOProps) => {
  const pageTitle = (title ? `${title} − ` : '') + APP_NAME;

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />

      <title>{pageTitle}</title>
      <meta
        name="description"
        content={description || defaultSEO.description}
      />
      <meta
        name="keywords"
        content="독후감, 책 요약, 책 기록, 책 리뷰, 책 후기, 세줄요약, 세줄독후감, 짧은 독후감, 독서 기록 사이트, 독후감 모음"
      />

      <meta property="og:title" content={title} />
      <meta
        name="og:description"
        content={description || defaultSEO.description}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={url ? `${defaultSEO.url}${url}` : defaultSEO.url}
      />
      <meta property="og:image" content={image || defaultSEO.image} />
      <meta property="og:site_name" content="세 줄 독후감" />
      <meta property="og:locale" content="ko_kr" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} data-rh="true" />
      <meta
        name="twitter:description"
        content={description || defaultSEO.description}
      />
      <meta name="twitter:site" content={`@${defaultSEO.url} 세 줄 독후감`} />
      <meta name="twitter:image" content={image || defaultSEO.image} />

      <link
        rel="canonical"
        href={url ? `${defaultSEO.url}${url.split('?')[0]}` : defaultSEO.url}
      />

      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;

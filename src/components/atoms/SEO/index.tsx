import Head from 'next/head';
import { APP_NAME } from '@/constants';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const defaultSEO = {
  description: '세 줄로 마음을 정리해요.',
  url: 'https://sejulbook.vercel.app',
  image: 'https://sejulbook.s3.ap-northeast-2.amazonaws.com/logo-icon.svg',
};

const SEO = ({ title, description, url, image }: SEOProps) => {
  const pageTitle = (title ? `${title} − ` : '') + APP_NAME;

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>{pageTitle}</title>
      <meta
        name="description"
        content={description || defaultSEO.description}
      />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={url ? `${defaultSEO.url}${url}` : defaultSEO.url}
      />
      <meta property="og:image" content={image || defaultSEO.image} />
      <meta property="og:site_name" content="세 줄 독후감" />
      <meta property="og:locale" content="ko_kr" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="original" data-rh="true" />
      <meta
        name="twitter:description"
        content={description || defaultSEO.description}
      />
      <meta name="twitter:site" content={`@${defaultSEO.url} 세 줄 독후감`} />
      <meta name="twitter:image" content={image || defaultSEO.image} />

      <link
        rel="canonical"
        href={url ? `${defaultSEO.url}${url.split('?')[0]}` : url}
      />
    </Head>
  );
};

export default SEO;

import Head from 'next/head';
import { APP_NAME } from '@/constants';

const DocumentTitle = ({ title }: { title?: string }) => (
  <Head>
    <title>{(title ? `${title} − ` : '') + APP_NAME}</title>
  </Head>
);

export default DocumentTitle;

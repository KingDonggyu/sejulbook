import { Html, Head, Main, NextScript } from 'next/document';
import { MODAL_ELEMENT_ID } from '@/constants';

const Document = () => (
  <Html lang="en">
    <Head />
    <body>
      <Main />
      <div id={MODAL_ELEMENT_ID} />
      <NextScript />
    </body>
  </Html>
);

export default Document;

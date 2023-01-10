import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import globalStyle from '../styles/global';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyle} />
      <Component {...pageProps} />
    </>
  );
}

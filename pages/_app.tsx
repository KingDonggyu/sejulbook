import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyle from '@/styles/global';
import theme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

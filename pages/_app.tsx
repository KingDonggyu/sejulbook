import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyle from '@/styles/global';
import theme from '@/styles/theme';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyle} />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;

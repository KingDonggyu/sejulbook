import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import globalStyle from '@/styles/global';
import { ScreenModeProvider } from '@/contexts/screenModeContext';

const App = ({ Component, pageProps }: AppProps) => (
  <ScreenModeProvider>
    <Global styles={globalStyle} />
    <Component {...pageProps} />
  </ScreenModeProvider>
);

export default App;

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Global } from '@emotion/react';
import globalStyle from '@/styles/global';
import { ScreenModeProvider } from '@/contexts/screenModeContext';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <ScreenModeProvider>
    <Global styles={globalStyle} />
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </ScreenModeProvider>
);

export default App;

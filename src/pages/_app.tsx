import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Global } from '@emotion/react';
import globalStyle from '@/styles/global';
import { ScreenModeProvider } from '@/contexts/screenModeContext';
import Layout from '@/components/organisms/Layout';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <ScreenModeProvider>
    <Global styles={globalStyle} />
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  </ScreenModeProvider>
);

export default App;

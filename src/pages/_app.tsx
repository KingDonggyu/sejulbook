import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Global } from '@emotion/react';
import globalStyle from '@/styles/global';
import { LayoutProvider } from '@/contexts/layoutContext';
import { ScreenModeProvider } from '@/contexts/screenModeContext';
import { NewbookProvider } from '@/contexts/newbookContext';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <ScreenModeProvider>
    <Global styles={globalStyle} />
    <SessionProvider session={session}>
      <LayoutProvider>
        <NewbookProvider>
          <Component {...pageProps} />
        </NewbookProvider>
      </LayoutProvider>
    </SessionProvider>
  </ScreenModeProvider>
);

export default App;

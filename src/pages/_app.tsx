import { useState } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Global } from '@emotion/react';
import globalStyle from '@/styles/global';
import { LayoutProvider } from '@/contexts/layoutContext';
import { ScreenModeProvider } from '@/contexts/screenModeContext';
import { NewbookProvider } from '@/contexts/newbookContext';
import defaultOptions from '@/services/queries/defaultOptions';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions }));

  return (
    <ScreenModeProvider>
      <Global styles={globalStyle} />
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <LayoutProvider>
              <NewbookProvider>
                <Component {...pageProps} />
              </NewbookProvider>
            </LayoutProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </ScreenModeProvider>
  );
};

export default App;

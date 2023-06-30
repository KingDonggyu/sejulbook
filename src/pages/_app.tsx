import { useState } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Global } from '@emotion/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import globalStyle from '@/styles/global';
import { LayoutProvider } from '@/contexts/layoutContext';
import { ScreenModeProvider } from '@/contexts/screenModeContext';
import defaultOptions from '@/lib/react-query/defaultOptions';
import useLoading from '@/hooks/useLoading';
import FullScreenLoading from '@/components/atoms/FullScreenLoading';
import GA from '@/components/atoms/GA';
import ErrorTemplate from '@/components/templates/Error';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions }));
  const { isLoading } = useLoading();

  return (
    <ScreenModeProvider>
      <Global styles={globalStyle} />
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <LayoutProvider>
              {!process.env.NEXT_PUBLIC_IS_LOCAL && <GA />}
              {pageProps.notFound ? (
                <ErrorTemplate
                  title={pageProps.title}
                  errorMessage={pageProps.errorMessage}
                />
              ) : (
                <Component {...pageProps} />
              )}
              {isLoading && <FullScreenLoading />}
            </LayoutProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </ScreenModeProvider>
  );
};

export default App;

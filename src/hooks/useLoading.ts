import { useEffect, useState } from 'react';
import { Router } from 'next/router';

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setIsLoading(true);
    };

    const endLoading = () => {
      setIsLoading(false);
    };

    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', endLoading);
    Router.events.on('routeChangeError', endLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', endLoading);
      Router.events.off('routeChangeError', endLoading);
    };
  }, []);

  return { isLoading, setIsLoading };
};

export default useLoading;

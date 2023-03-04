import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useUnload = (callback: () => void) => {
  const router = useRouter();

  useEffect(() => {
    const handleCloseTab = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      callback();
    };

    router.events.on('routeChangeStart', callback);
    window.addEventListener('beforeunload', handleCloseTab);

    return () => {
      router.events.off('routeChangeStart', callback);
      window.removeEventListener('beforeunload', handleCloseTab);
    };
  }, [callback, router.events]);
};

export default useUnload;

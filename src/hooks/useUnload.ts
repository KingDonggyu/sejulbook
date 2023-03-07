import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

const useUnload = (handleUnload: () => void) => {
  const router = useRouter();

  const handleBeforeUnload = useCallback(() => {
    handleUnload();
  }, [handleUnload]);

  useEffect(() => {
    router.events.on('routeChangeStart', handleBeforeUnload);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      router.events.off('routeChangeStart', handleBeforeUnload);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleUnload, handleBeforeUnload, router]);
};

export default useUnload;

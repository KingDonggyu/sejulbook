import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

const useUnload = (handleUnload: () => void) => {
  const router = useRouter();

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const handleBeforeRouteChange = useCallback(() => {
    const warningText =
      '이전 페이지로 이동하시겠습니까?\n변경사항이 저장되지 않을 수 있습니다.';
    // eslint-disable-next-line no-alert
    if (window.confirm(warningText)) {
      handleUnload();
      return;
    }
    if (router.asPath !== window.location.pathname) {
      window.history.pushState('', '', router.asPath);
    }
    router.events.emit('routeChangeError');
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw 'route change aborted.';
  }, [handleUnload, router]);

  useEffect(() => {
    router.events.on('routeChangeStart', handleBeforeRouteChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      router.events.off('routeChangeStart', handleBeforeRouteChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [handleUnload, handleBeforeRouteChange, router]);
};

export default useUnload;

import { useCallback, useEffect, useRef } from 'react';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import useUnload from './useUnload';

const useS3GarbageCollection = () => {
  const serviceWorkerController = useRef<ServiceWorker | null>();
  const { imageKeySet, emptyImageKeySet } = s3ImageURLStore();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(new URL('../lib/serviceWorker.ts', import.meta.url))
        .then((registration) => {
          serviceWorkerController.current = registration.active;
        });
    }
  }, []);

  const handleWork = useCallback(() => {
    if (!imageKeySet.size) {
      return;
    }
    serviceWorkerController.current?.postMessage(Array.from(imageKeySet));
    emptyImageKeySet();
  }, [emptyImageKeySet, imageKeySet]);

  useUnload(handleWork);
};

export default useS3GarbageCollection;

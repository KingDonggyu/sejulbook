import { useCallback, useEffect, useRef } from 'react';
import s3ImagesStore from '@/stores/s3ImagesStore';
import useUnload from './useUnload';

const useS3GarbageCollection = () => {
  const serviceWorkerController = useRef<ServiceWorker | null>();
  const { imageSet } = s3ImagesStore();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(new URL('../services/serviceWorker.ts', import.meta.url))
        .then((registration) => {
          serviceWorkerController.current = registration.active;
        });
    }
  }, []);

  const handleWork = useCallback(() => {
    if (!imageSet.size) {
      return;
    }
    const imageKeys = Array.from(imageSet).map((url) => url.split('/').at(-1));
    serviceWorkerController.current?.postMessage(imageKeys);
  }, [imageSet]);

  useUnload(handleWork);
};

export default useS3GarbageCollection;

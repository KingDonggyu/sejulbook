import { useCallback, useEffect, useRef } from 'react';
import s3ImagesStore from '@/stores/s3ImagesStore';
import useUnload from './useUnload';

const useS3GarbageCollection = () => {
  const workerRef = useRef<Worker>();
  const { imageSet } = s3ImagesStore();

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../services/worker.ts', import.meta.url),
    );
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleWork = useCallback(() => {
    if (!imageSet.size) {
      return;
    }

    const imageKeys = Array.from(imageSet).map((url) => url.split('/').at(-1));
    workerRef.current?.postMessage(imageKeys);
  }, [imageSet]);

  useUnload(handleWork);
};

export default useS3GarbageCollection;

import { useCallback } from 'react';
import { DeleteObjectsCommand } from '@aws-sdk/client-s3';
import s3ImagesStore from '@/stores/s3ImagesStore';
import s3Client from '@/lib/S3Client';
import useUnload from './useUnload';

const useS3GarbageCollection = () => {
  const { imageSet } = s3ImagesStore();

  const handleDeleteGarbage = useCallback(async () => {
    if (!imageSet.size) {
      return;
    }
    const command = new DeleteObjectsCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Delete: {
        Objects: Array.from(imageSet).map((url) => ({
          Key: url.split('/').at(-1),
        })),
      },
    });

    await s3Client.send(command);
  }, [imageSet]);

  useUnload(handleDeleteGarbage);
};

export default useS3GarbageCollection;

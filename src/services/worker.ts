import { DeleteObjectsCommand } from '@aws-sdk/client-s3';
import s3Client from '@/lib/S3Client';

const handleDeleteGarbage = async (imageKeys: string[]) => {
  const command = new DeleteObjectsCommand({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Delete: {
      Objects: imageKeys.map((key) => ({ Key: key })),
    },
  });

  await s3Client.send(command);
};

// eslint-disable-next-line no-restricted-globals
addEventListener('message', (event: MessageEvent<string[]>) => {
  handleDeleteGarbage(event.data);
});

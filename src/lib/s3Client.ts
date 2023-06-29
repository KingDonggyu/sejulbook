import { bookReviewError } from '@/constants/message';
import { BadRequestException } from '@/server/exceptions';
import { S3Client, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import axios from 'axios';
import { v1 } from 'uuid';

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export const createS3Object = async (blob: Blob) => {
  try {
    const { type } = blob;
    const presignedPost = await createPresignedPost(s3Client, {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: `${v1().replace(/-/g, '')}.${type.split('/')[1]}`,
      Fields: { acl: 'public-read', 'Content-Type': type },
      Expires: 600,
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
      ],
    });

    const { url, fields } = presignedPost;
    const formData = new FormData();

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('file', new File([blob], blob.name));

    await axios.post(url, formData);
    return `${url}${fields.key}`;
  } catch {
    throw new BadRequestException(bookReviewError.WRONG_FILE_FORMAT);
  }
};

export const deleteS3Objects = async (imageKeys: string[]) => {
  const command = new DeleteObjectsCommand({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Delete: {
      Objects: imageKeys.map((key) => ({ Key: key })),
    },
  });

  await s3Client.send(command);
};

export default s3Client;

import type { NextApiRequest, NextApiResponse } from 'next';
import { v1 } from 'uuid';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { MethodNotAllowedException } from '@/server/exceptions';
import errorHandler from '@/server/middlewares/errorHandler';
import HttpMethods from '@/constants/httpMethods';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { type: string };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
    return;
  }

  const { type } = req.query;

  const s3Client = new S3Client({
    credentials: {
      accessKeyId: process.env.SEJULBOOK_AWS_ACCESS_KEY,
      secretAccessKey: process.env.SEJULBOOK_AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  });

  const presignedPost = await createPresignedPost(s3Client, {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: `${v1().replace(/-/g, '')}.${type.split('/')[1]}`,
    Fields: { acl: 'public-read', 'Content-Type': type },
    Expires: 600,
    Conditions: [
      ['content-length-range', 0, 10485760], // up to 10 MB
    ],
  });

  res.status(200).json(presignedPost);
};

export default errorHandler(handler);

import type { NextApiRequest, NextApiResponse } from 'next';
import { DeleteObjectsCommand, S3Client } from '@aws-sdk/client-s3';
import { MethodNotAllowedException } from '@/server/exceptions';
import errorHandler from '@/server/middlewares/errorHandler';
import HttpMethods from '@/constants/httpMethods';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  body: string;
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.POST) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
    return;
  }

  const { imageKeys } = JSON.parse(req.body) as { imageKeys: string[] };

  const s3Client = new S3Client({
    credentials: {
      accessKeyId: process.env.SEJULBOOK_AWS_ACCESS_KEY,
      secretAccessKey: process.env.SEJULBOOK_AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  });

  const command = new DeleteObjectsCommand({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Delete: {
      Objects: imageKeys.map((key) => ({ Key: key })),
    },
  });

  await s3Client.send(command);
  res.status(200).end();
};

export default errorHandler(handler);

import type { NextApiRequest, NextApiResponse } from 'next';
import { v1 } from 'uuid';
import { createPresignedPost, PresignedPost } from '@aws-sdk/s3-presigned-post';
import s3Client from '@/lib/S3Client';
import { HttpSuccess, HttpFailed } from '@/types/http';
import { bookReviewError } from '@/constants/message';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fileName, fileType } = req.query;

  if (typeof fileName !== 'string' || typeof fileType !== 'string') {
    const response: HttpFailed = {
      error: true,
      code: 400,
      message: bookReviewError.WRONG_FILE_FORMAT,
    };
    res.status(response.code).json(response);
    return;
  }

  const presignedPost = await createPresignedPost(s3Client, {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: `${v1().replace(/-/g, '')}.${fileType.split('/')[1]}`,
    Fields: {
      acl: 'public-read',
      'Content-Type': fileType,
    },
    Expires: 600, // seconds
    Conditions: [
      ['content-length-range', 0, 10485760], // up to 10 MB
    ],
  });

  const response: HttpSuccess<PresignedPost> = {
    error: false,
    data: presignedPost,
  };

  res.status(200).json(response);
};

export default handler;

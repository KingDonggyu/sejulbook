import type { NextApiRequest, NextApiResponse } from 'next';
import BookReviewService from '@/server/services/bookReview/bookReview.service';
import { MethodNotAllowedException } from '@/server/exceptions';
import HttpMethods from '@/constants/httpMethods';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    throw new MethodNotAllowedException();
  }

  const data = await new BookReviewService().findTenLatest();
  res.status(200).json(data);
};

export default handler;

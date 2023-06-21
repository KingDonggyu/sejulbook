import type { NextApiRequest, NextApiResponse } from 'next';
import BookReviewService from '@/server/services/bookReview/bookReview.service';
import { MethodNotAllowedException } from '@/server/exceptions';
import HttpMethods from '@/constants/httpMethods';

interface ExtenedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { query: string; cursor: string };
}

const handler = async (req: ExtenedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    throw new MethodNotAllowedException();
  }

  const data = await new BookReviewService().findPagesByCategory({
    category: req.query.query,
    targetId: +req.query.cursor,
  });

  res.status(200).json(data);
};

export default handler;

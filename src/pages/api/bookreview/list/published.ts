import type { NextApiRequest, NextApiResponse } from 'next';
import BookReviewService from '@/server/services/bookReview/bookReview.service';
import { MethodNotAllowedException } from '@/server/exceptions';
import errorHandler from '@/server/middlewares/errorHandler';
import HttpMethods from '@/constants/httpMethods';

interface ExtenedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { userId: string };
}

const handler = async (req: ExtenedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
  }

  const userId = +req.query.userId;
  const data = await new BookReviewService().findAllByUser(userId);
  res.status(200).json(data);
};

export default errorHandler(handler);

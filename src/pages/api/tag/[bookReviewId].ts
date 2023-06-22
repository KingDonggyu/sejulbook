import type { NextApiRequest, NextApiResponse } from 'next';
import TagService from '@/server/services/tag/tag.service';
import { MethodNotAllowedException } from '@/server/exceptions';
import errorHandler from '@/server/middlewares/errorHandler';
import HttpMethods from '@/constants/httpMethods';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { bookReviewId: string };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.GET) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
  }

  const bookReviewId = +req.query.bookReviewId;
  const data = await new TagService().findAllByBookReview(bookReviewId);

  res.status(200).json(data);
};

export default errorHandler(handler);

import type { NextApiRequest, NextApiResponse } from 'next';
import BookReviewService from '@/server/services/bookReview.service';
import { MethodNotAllowedException } from '@/server/exceptions';
import HttpMethods from '@/constants/httpMethods';
import authentication from '@/server/middlewares/authentication';
import errorHandler from '@/server/middlewares/errorHandler';

interface ExtendedNextApiRequest extends NextApiRequest {
  method: HttpMethods.POST;
  body: {
    userId: string;
    bookname: string;
    authors: string;
    publication: Date;
    publisher: string;
    rating: string;
    sejul: string;
    content: string;
    originThumbnail: string;
    thumbnail?: string;
    categoryId?: string;
    tags: string[];
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.POST) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
  }

  const { userId, rating, categoryId } = req.body;

  await authentication(req, res, +userId);

  const bookReviewId = await new BookReviewService().createDraftSaved({
    ...req.body,
    userId: +userId,
    rating: +rating,
    categoryId: categoryId ? +categoryId : undefined,
  });

  res.status(200).json({ bookReviewId });
};

export default errorHandler(handler);

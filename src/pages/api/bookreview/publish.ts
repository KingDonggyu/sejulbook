import type { NextApiRequest, NextApiResponse } from 'next';
import { BookReviewService } from '@/server/services';
import { MethodNotAllowedException } from '@/server/exceptions';
import authentication from '@/server/middlewares/authentication';
import errorHandler from '@/server/middlewares/errorHandler';
import HttpMethods from '@/constants/httpMethods';

interface ExtendedNextApiRequest extends NextApiRequest {
  method: HttpMethods.POST;
  body: {
    id?: string;
    bookname: string;
    authors: string;
    publication: string;
    publisher: string;
    thumbnail: string;
    rating: string;
    sejul: string;
    content: string;
    userId: string;
    categoryId: string;
    originThumbnail: string;
    tags: string[];
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== HttpMethods.POST) {
    const error = new MethodNotAllowedException();
    res.status(error.code).send(error);
  }

  const { id, userId, rating, categoryId } = req.body;

  await authentication(req, res, +userId);

  const bookReviewId = await new BookReviewService().createPublished({
    ...req.body,
    id: id ? +id : undefined,
    userId: +userId,
    rating: +rating,
    categoryId: +categoryId,
  });

  res.status(200).json({ bookReviewId });
};

export default errorHandler(handler);

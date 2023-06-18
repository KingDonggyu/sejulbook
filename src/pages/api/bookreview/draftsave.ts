import type { NextApiRequest, NextApiResponse } from 'next';
import BookReviewService from 'server/services/bookReview/bookReview.service';
import { MethodNotAllowedException } from 'server/exceptions';
import HttpMethods from '@/constants/httpMethods';
import checkAuth from '@/services/middlewares/checkAuth';

interface ExtendedNextApiRequest extends NextApiRequest {
  method: HttpMethods.POST;
  body: {
    userId: string;
    bookname: string;
    authors: string;
    publication: Date | null;
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
    throw new MethodNotAllowedException();
  }

  const { userId, rating, categoryId } = req.body;

  await checkAuth(req, res, +userId);

  const bookReviewId = await new BookReviewService().createDraftSaved({
    ...req.body,
    userId: +userId,
    rating: +rating,
    categoryId: categoryId ? +categoryId : undefined,
  });

  res.status(200).json({ bookReviewId });
};

export default handler;

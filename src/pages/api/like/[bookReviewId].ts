import type { NextApiRequest, NextApiResponse } from 'next';
import { LikeService } from '@/server/services';
import authentication from '@/server/middlewares/authentication';
import HttpMethods from '@/constants/httpMethods';
import { MethodNotAllowedException } from '@/server/exceptions';
import errorHandler from '@/server/middlewares/errorHandler';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: {
    likerId: string;
    bookReviewId: string;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const likeService = new LikeService();
  const bookReviewId = Number(req.query.bookReviewId);
  const likerId = Number(req.query.likerId);

  if (req.method === HttpMethods.GET) {
    const data = await likeService.has({ bookReviewId, likerId });
    res.status(200).json(data);
    return;
  }

  await authentication(req, res, likerId);

  if (req.method === HttpMethods.POST) {
    await likeService.create({ bookReviewId, likerId });
    res.status(200).end();
    return;
  }

  if (req.method === HttpMethods.DELETE) {
    await likeService.delete({ bookReviewId, likerId });
    res.status(200).end();
    return;
  }

  const error = new MethodNotAllowedException();
  res.status(error.code).send(error);
};

export default errorHandler(handler);

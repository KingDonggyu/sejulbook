import type { NextApiRequest, NextApiResponse } from 'next';
import LikeService from 'server/services/like/like.service';
import checkAuth from '@/services/middlewares/checkAuth';
import HttpMethods from '@/constants/httpMethods';
import { MethodNotAllowedException } from 'server/exceptions';

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

  await checkAuth(req, res, likerId);

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

  throw new MethodNotAllowedException();
};

export default handler;

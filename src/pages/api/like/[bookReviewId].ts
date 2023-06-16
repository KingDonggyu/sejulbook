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

  switch (req.method) {
    case HttpMethods.GET: {
      const isLike = await likeService.has({ bookReviewId, likerId });
      res.status(200).json(isLike);
      break;
    }
    case HttpMethods.DELETE:
      await checkAuth(req, res, likerId);
      await likeService.delete({ bookReviewId, likerId });
      break;
    case HttpMethods.POST:
      await checkAuth(req, res, likerId);
      await likeService.create({ bookReviewId, likerId });
      break;
    default:
      throw new MethodNotAllowedException();
  }

  res.status(200).end();
};

export default handler;

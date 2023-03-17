import type { NextApiRequest, NextApiResponse } from 'next';
import likeService from 'server/features/like/like.service';
import checkAuth from '@/services/middlewares/checkAuth';
import { LikeRequest } from '@/types/features/like';

interface NextGetApiRequest extends Omit<NextApiRequest, 'query'> {
  query: LikeRequest;
  method: 'GET' | 'DELETE';
}

interface NextPostApiRequest extends NextApiRequest {
  body: LikeRequest;
  method: 'POST';
}

type ExtendedNextApiRequest = NextGetApiRequest | NextPostApiRequest;

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  let result;
  const userId = req.method === 'POST' ? req.body.userId : req.query.userId;
  const bookReviewId =
    req.method === 'POST' ? req.body.bookReviewId : req.query.bookReviewId;

  switch (req.method) {
    case 'POST':
      if (!userId) {
        return;
      }
      if (!(await checkAuth(req, res, userId))) {
        return;
      }
      result = await likeService.like({ likerId: userId, bookReviewId });
      break;

    case 'DELETE':
      if (!userId) {
        return;
      }
      if (!(await checkAuth(req, res, userId))) {
        return;
      }
      result = await likeService.unlike({ likerId: userId, bookReviewId });
      break;

    default:
      result = await likeService.getLikeStatus({
        likerId: userId,
        bookReviewId,
      });
  }

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;

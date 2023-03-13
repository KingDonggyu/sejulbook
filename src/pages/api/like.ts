import type { NextApiRequest, NextApiResponse } from 'next';
import likeService from 'server/features/like/like.service';
import checkAuth from '@/services/middlewares/checkAuth';
import { BookReviewId } from '@/types/features/bookReview';
import { UserId } from '@/types/features/user';

interface ExtendedNextGetApiRequest extends Omit<NextApiRequest, 'query'> {
  query: {
    userId: UserId;
    bookReviewId: BookReviewId;
  };
}

interface ExtendedNextPostApiRequest extends NextApiRequest {
  body: {
    userId: UserId;
    bookReviewId: BookReviewId;
  };
}

const handler = async (
  req: ExtendedNextGetApiRequest | ExtendedNextPostApiRequest,
  res: NextApiResponse,
) => {
  let result;
  const userId = req.query.userId || req.body.userId;
  const bookReviewId = req.query.bookReviewId || req.body.bookReviewId;

  if (req.method === 'POST') {
    if (!(await checkAuth(req, res))) {
      return;
    }
    result = await likeService.like({ likerId: userId, bookReviewId });
  } else if (req.method === 'DELETE') {
    if (!(await checkAuth(req, res))) {
      return;
    }
    result = await likeService.unlike({ likerId: userId, bookReviewId });
  } else {
    result = await likeService.getLikeStatus({ likerId: userId, bookReviewId });
  }

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;

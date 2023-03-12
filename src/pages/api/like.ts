import type { NextApiRequest, NextApiResponse } from 'next';
import likeService from 'server/features/like/like.service';
import checkAuth from '@/services/middlewares/checkAuth';
import { BookReviewId } from '@/types/features/bookReview';
import { UserId } from '@/types/features/user';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: {
    userId: UserId;
    bookReviewId: BookReviewId;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const { userId, bookReviewId } = req.query;

  if (!(await checkAuth(req, res))) {
    return;
  }

  let result;

  if (req.method === 'DELETE') {
    result = await likeService.unlike({ likerId: userId });
  } else if (req.method === 'POST') {
    result = await likeService.like({ likerId: userId, bookReviewId });
  } else {
    result = await likeService.checkIsLike({ likerId: userId, bookReviewId });
  }

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;

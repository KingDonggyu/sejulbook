import type { NextApiRequest, NextApiResponse } from 'next';
import { FollowingBookReviewRequest } from '@/types/features/bookReview';
import bookReviewService from 'server/features/bookReview/bookReview.service';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: FollowingBookReviewRequest;
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const { userId, pageParam = null } = req.query;

  const result = await bookReviewService.getPagingFollowingBookReviewList({
    userId,
    maxFollowId: pageParam,
  });

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;

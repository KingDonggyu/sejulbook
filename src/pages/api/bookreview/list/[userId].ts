import type { NextApiRequest, NextApiResponse } from 'next';
import bookReviewService from 'server/features/bookReview/bookReview.service';
import { UserId } from '@/types/features/user';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: {
    userId: UserId;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  const result = await bookReviewService.getBookReviewList({
    userId: Number(userId),
  });

  if (!result.error) {
    res.status(200).json(result);
    return;
  }

  res.status(result.code).json(result);
};

export default handler;

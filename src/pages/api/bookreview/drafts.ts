import type { NextApiRequest, NextApiResponse } from 'next';
import bookReviewService from 'server/features/bookReview/bookReview.service';
import { UserId } from '@/types/features/user';

interface ExtendedNextApiRequest extends Omit<NextApiRequest, 'query'> {
  query: { userId: UserId };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const bookReviewListresult = await bookReviewService.getDraftSavedList({
    userId: req.query.userId,
  });

  if (!bookReviewListresult.error) {
    res.status(200).json(bookReviewListresult);
    return;
  }

  res.status(bookReviewListresult.code).json(bookReviewListresult);
};

export default handler;
